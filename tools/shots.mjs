import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const CHROME = process.env.CHROME || 'chromium';
// Capturas genéricas. Uso: node shots.mjs <carpeta> <página> [js-por-paso ...]  (cada paso: 'ancho|alto|selector-o-scrollY|nombre[|js]'; navegador: env CHROME)
import { resolve } from 'node:path';
const PAGE = 'file://' + resolve(process.argv[3]);
const OUT = process.argv[2];
const chrome = spawn(CHROME, ['--headless=new','--remote-debugging-port=9333','--no-first-run','--hide-scrollbars','about:blank'], {stdio:'ignore'});
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let k=0;k<50;k++){ try{ targets = await (await fetch('http://127.0.0.1:9333/json')).json(); if(targets.length) break;}catch{} await sleep(200); }
const page = targets.find(t => t.type==='page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id=0; const pend = new Map(); const logs=[];
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  if (m.method==='Runtime.exceptionThrown') logs.push('EXC '+m.params.exceptionDetails.text+' '+(m.params.exceptionDetails.exception?.description||''));
  if (m.method==='Runtime.consoleAPICalled' && ['error','warning'].includes(m.params.type)) logs.push('CONSOLE '+m.params.args.map(a=>a.value).join(' '));
  if (m.method==='Log.entryAdded' && m.params.entry.level==='error') logs.push('LOG '+m.params.entry.text); };
const send = (method, params={}) => new Promise(r => { const i=++id; pend.set(i, r); ws.send(JSON.stringify({id:i, method, params})); });
const ev = async expr => (await send('Runtime.evaluate', {expression:expr, awaitPromise:true, returnByValue:true})).result?.result?.value;
const shot = async name => { const r = await send('Page.captureScreenshot', {format:'png'}); writeFileSync(`${OUT}/${name}.png`, Buffer.from(r.result.data,'base64')); };
await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
await send('Page.bringToFront');
const steps = process.argv.slice(4);
let last = '';
for (const st of steps) {
  const [w,h,where,name,...js] = st.split('|');
  if (last !== w+'x'+h) { await send('Emulation.setDeviceMetricsOverride', {width:+w, height:+h, deviceScaleFactor:1, mobile:+w<700}); await send('Page.navigate', {url:PAGE}); await sleep(1500); await ev('document.fonts.ready.then(()=>1)'); last = w+'x'+h; }
  if (where) await ev(isNaN(+where) ? `document.querySelector(${JSON.stringify(where)}).scrollIntoView({block:"start"})` : `window.scrollTo(0,${where})`);
  if (js.length) await ev(js.join('|'));
  await sleep(1200);
  console.log(name, 'overflowX', await ev('document.documentElement.scrollWidth - innerWidth'));
  await shot(name);
}
console.log('LOGS:', logs.length ? logs : 'none');
ws.close(); chrome.kill();
