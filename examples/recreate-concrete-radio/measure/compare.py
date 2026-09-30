#!/usr/bin/env python3
"""Run the inventory's measurements on the reference and on a build screenshot; print deltas.
Usage: compare.py BUILD_PNG   (reference fixed: ../../references/ref-a-concrete-radio.png)"""
import json, subprocess, sys, pathlib
HERE = pathlib.Path(__file__).parent
ROOT = HERE.parents[2]
S = ROOT / 'skill/brutalist/scripts'
REF = ROOT / 'examples/references/ref-a-concrete-radio.png'
INK, CON, SIG = '#121212', '#d8d5cc', '#ff3b1f'
CHECKS = [  # name, crop, color, tol
    ('headline CONCRETE (right letters)', '600,380,290,300', INK, 40),
    ('headline CONCRETE width', '0,430,890,150', INK, 40),
    ('headline RADIO lower', '0,700,890,141', INK, 40),
    ('kicker', '20,60,500,30', INK, 40),
    ('badge circle', '680,60,200,200', SIG, 60),
    ('badge text', '720,110,120,100', INK, 40),
    ('marquee text', '0,0,1440,44', CON, 40),
    ('schedule header', '903,44,537,45', INK, 40),
    ('row1 time', '915,95,100,140', INK, 40),
    ('row1 name', '1030,95,400,140', INK, 40),
    ('row3 name', '1030,395,400,140', CON, 40),
    ('row3 dot', '1030,395,400,140', SIG, 60),
    ('footer left', '0,847,1180,53', INK, 40),
    ('footer call', '1195,850,140,45', INK, 40),
    ('footer donate', '1350,850,85,45', INK, 40),
]
def box(img, crop, color, tol):
    r = json.loads(subprocess.check_output(['python3', str(S / 'ink_bbox.py'), str(img), '--crop', crop, '--color', color, '--tol', str(tol)]))
    return r.get('bbox_px')
build = sys.argv[1]
print(f'{"element":34} {"reference x,y,w,h":22} {"build x,y,w,h":22} delta')
for name, crop, color, tol in CHECKS:
    a, b = box(REF, crop, color, tol), box(build, crop, color, tol)
    d = [bb - aa for aa, bb in zip(a, b)] if a and b else None
    print(f'{name:34} {str(a):22} {str(b):22} {d}')
for label, args in (('rules full', []), ('rules schedule', ['--crop', '903,44,537,797', '--min-run', '0.9']), ('rules footer', ['--crop', '0,844,1440,56', '--min-run', '0.9'])):
    out = []
    for img in (REF, build):
        r = json.loads(subprocess.check_output(['python3', str(S / 'find_rules.py'), str(img), *args]))
        out.append(([(x['from_px'], x['thickness_px']) for x in r['vertical']], [(x['from_px'], x['thickness_px']) for x in r['horizontal']]))
    print(f'{label:16} ref V{out[0][0]} H{out[0][1]}\n{"":16} bld V{out[1][0]} H{out[1][1]}')

# marquee rhythm: horizontal runs of light text ink and red dot centers in the top band
import numpy as np
from PIL import Image
def marquee(img):
    px = np.asarray(Image.open(img).convert('RGB')).astype(float)[0:44]
    near = lambda c, t: np.sqrt(((px - np.array(c)) ** 2).sum(-1)) <= t
    xs = np.nonzero(near((216, 213, 204), 40)[12:34].any(axis=0))[0]
    runs = [(int(g[0]), int(g[-1])) for g in np.split(xs, np.nonzero(np.diff(xs) > 20)[0] + 1)]
    xs = np.nonzero(near((255, 59, 31), 60).any(axis=0))[0]
    dots = [round(float(g.mean()), 1) for g in np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1)]
    return runs, dots
for label, img in (('ref', REF), ('bld', build)):
    runs, dots = marquee(img)
    print(f'marquee {label} runs {runs}\n            dots {dots}')
