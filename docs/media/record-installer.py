"""Record docs/media/installer.gif from a real run of install.mjs in a pseudo-terminal.

Run from the repository root:  python3 docs/media/record-installer.py
It installs into a temporary HOME (deleted afterwards), so no real path appears.
Needs Python 3 with Pillow, Node, and a monospace font: set FONT_REGULAR and FONT_BOLD
to .ttf paths if the JetBrains Mono defaults below are not installed.
Optional arguments: a JSON list of [seconds, hex key] pairs, the tail in seconds, the output path.
"""
import pty,os,sys,struct,fcntl,termios,time,select,re,shutil,tempfile,json
from PIL import Image,ImageDraw,ImageFont
S=os.path.dirname(os.path.abspath(__file__)); REPO=os.getcwd()
COLS,ROWS=76,23
home=tempfile.mkdtemp(); os.makedirs(home+'/.claude'); os.makedirs(home+'/.codex')
pid,fd=pty.fork()
if pid==0:
    os.chdir(home)
    os.execvpe('node',['node',REPO+'/install.mjs'],{**os.environ,'HOME':home,'TERM':'xterm-256color'})
fcntl.ioctl(fd,termios.TIOCSWINSZ,struct.pack('HHHH',ROWS,COLS,0,0))
t0=time.time(); chunks=[]
def pump(until):
    while time.time()-t0<until:
        r,_,_=select.select([fd],[],[],0.02)
        if r:
            try: d=os.read(fd,65536)
            except OSError: return
            if not d: return
            chunks.append((time.time()-t0,d))
# scope: down, up, enter (everywhere); targets: down, down, space (Antigravity), enter
DEFAULT=[[2.6,'1b5b42'],[3.2,'1b5b41'],[3.9,'0d'],[4.8,'1b5b42'],[5.3,'1b5b42'],[5.9,'20'],[6.8,'0d']]
keys=json.loads(sys.argv[1]) if len(sys.argv)>1 else DEFAULT
sched=[(t,bytes.fromhex(k)) for t,k in keys]
for t,k in sched:
    pump(t); os.write(fd,k)
pump(sched[-1][0]+(float(sys.argv[2]) if len(sys.argv)>2 else 4))
shutil.rmtree(home,ignore_errors=True)
# --- emulator
BG=(10,10,10); FG=(233,231,218); RED=(255,59,31)
class T:
    def __init__(s):
        s.g=[[(' ',FG,BG,0) for _ in range(COLS)] for _ in range(ROWS)]; s.r=0; s.c=0
        s.fg=FG; s.bg=BG; s.b=0; s.dim=0; s.inv=0
    def put(s,ch):
        if s.c>=COLS: s.nl(); s.c=0
        f,b=(s.bg,s.fg) if s.inv else (s.fg,s.bg)
        if s.dim: f=tuple(int(x*.55+y*.45) for x,y in zip(f,b))
        s.g[s.r][s.c]=(ch,f,b,s.b); s.c+=1
    def nl(s):
        s.r+=1
        if s.r>=ROWS: s.g.pop(0); s.g.append([(' ',FG,BG,0)]*COLS); s.r=ROWS-1
    def feed(s,t):
        i=0
        while i<len(t):
            c=t[i]
            if c=='\x1b':
                m=re.match(r'\x1b\[([0-9;?]*)([A-Za-z])',t[i:])
                if m:
                    p,f=m.group(1),m.group(2); i+=len(m.group(0))
                    if f=='m':
                        ps=[int(x) for x in p.split(';') if x] or [0]; k=0
                        while k<len(ps):
                            v=ps[k]
                            if v==0: s.fg,s.bg,s.b,s.dim,s.inv=FG,BG,0,0,0
                            elif v==1: s.b=1
                            elif v==2: s.dim=1
                            elif v==22: s.b=0; s.dim=0
                            elif v==7: s.inv=1
                            elif v==27: s.inv=0
                            elif v==39: s.fg=FG
                            elif v==38 and ps[k+1]==2: s.fg=tuple(ps[k+2:k+5]); k+=4
                            k+=1
                    elif f=='A': s.r=max(0,s.r-int(p or 1))
                    elif f=='J':
                        for x in range(s.c,COLS): s.g[s.r][x]=(' ',FG,BG,0)
                        for y in range(s.r+1,ROWS): s.g[y]=[(' ',FG,BG,0)]*COLS
                    elif f=='K':
                        for x in range(s.c,COLS): s.g[s.r][x]=(' ',FG,BG,0)
                    continue
                i+=1; continue
            if c=='\r': s.c=0
            elif c=='\n': s.nl(); s.c=0
            else: s.put(c)
            i+=1
FR=ImageFont.truetype(os.environ.get('FONT_REGULAR','/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Regular.ttf'),15)
FB=ImageFont.truetype(os.environ.get('FONT_BOLD','/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Bold.ttf'),15)
cw=round(FR.getlength('M')); ch_=22; PX,PY=22,18
W,H=PX*2+cw*COLS,PY*2+ch_*ROWS
def render(t):
    im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im)
    for y,row in enumerate(t.g):
        for x,(c,f,b,bo) in enumerate(row):
            X,Y=PX+x*cw,PY+y*ch_
            if b!=BG: d.rectangle([X,Y,X+cw-1,Y+ch_-1],fill=b)
            if c!=' ':
                if c in '█▀▄':
                    top=Y; bot=Y+ch_; mid=(top+bot)//2
                    box={'█':(top,bot),'▀':(top,mid),'▄':(mid,bot)}[c]
                    d.rectangle([X,box[0],X+cw-1,box[1]-1+(1 if c!='▀' else 0)],fill=f)
                elif c=='░': d.rectangle([X+1,Y+8,X+cw-2,Y+ch_-8],fill=tuple(int(a*.35+b_*.65) for a,b_ in zip(f,BG)))
                else: d.text((X,Y+1),c,font=FB if bo else FR,fill=f)
    return im
# frames at 20 fps
t=T(); frames=[]; durs=[]; k=0; end=chunks[-1][0]+2.5
step=0.06; now=0
while now<=end:
    while k<len(chunks) and chunks[k][0]<=now: t.feed(chunks[k][1].decode('utf-8','replace')); k+=1
    frames.append(render(t)); now+=step
# drop consecutive duplicates, merging durations
out=[];dur=[]
for f in frames:
    if out and f.tobytes()==out[-1].tobytes(): dur[-1]+=step
    else: out.append(f); dur.append(step)
dur[-1]=3.0
out[0].save(sys.argv[3] if len(sys.argv)>3 else os.path.join(REPO,'docs/media/installer.gif'),save_all=True,append_images=out[1:],duration=[int(x*1000) for x in dur],loop=0,optimize=True)
print(len(out),'frames',W,H)
