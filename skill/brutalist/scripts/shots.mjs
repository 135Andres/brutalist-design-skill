// Headless screenshots for verify and recreate §5. Node >= 22 (built-in WebSocket, fetch).
//
// Usage:
//   CHROME=/path/to/chrome node shots.mjs OUT_DIR PAGE 'W|H|WHERE|NAME[|JS]' ...
//
// Each step: viewport width and height (CSS px, DPR 1); WHERE = a CSS selector to scroll
// into view, a scrollY number, or empty; NAME = the PNG file name; JS = optional code run
// before the screenshot (a returned value, or a resolved promise, is printed as JSON).
// The page reloads whenever the viewport size changes. PAGE may carry a query string.
// Env: REDUCED_MOTION=1 emulates prefers-reduced-motion; NO_JS=1 disables JavaScript
// (JS steps then do nothing). Prints horizontal overflow per step and console errors.
// Mobile emulation widens the layout viewport to fit content that is too wide, which hides
// the overflow from scrollWidth; the script warns when the viewport is not the width asked.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = process.env.CHROME || 'chromium';
const [OUT, pageArg, ...steps] = process.argv.slice(2);
if (!OUT || !pageArg) { console.error('usage: shots.mjs OUT_DIR PAGE STEP...'); process.exit(2); }
const [pagePath, query = ''] = pageArg.split(/\?(.*)/s);
const PAGE = 'file://' + resolve(pagePath) + (query ? '?' + query : '');
const PORT = 9333;

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run',
  '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets = [];
for (let k = 0; k < 50 && !targets.length; k++) {
  try { targets = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).filter(t => t.type === 'page'); }
  catch { /* browser still starting */ }
  if (!targets.length) await sleep(200);
}
if (!targets.length) { console.error('could not reach the browser; set CHROME'); chrome.kill(); process.exit(1); }

const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let id = 0;
const pending = new Map();
const logs = [];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') logs.push('EXCEPTION ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) logs.push('CONSOLE ' + m.params.args.map(a => a.value).join(' '));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') logs.push('LOG ' + m.params.entry.text);
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;
const shot = async name => {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(r.result.data, 'base64'));
};

await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable'); await send('Page.bringToFront');
if (process.env.REDUCED_MOTION) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
if (process.env.NO_JS) await send('Emulation.setScriptExecutionDisabled', { value: true });

let size = '';
for (const step of steps) {
  const [w, h, where, name, ...js] = step.split('|');
  if (size !== w + 'x' + h) {
    await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 700 });
    await send('Page.navigate', { url: PAGE });
    await sleep(1500);
    await ev('document.fonts.ready.then(() => 1)');
    size = w + 'x' + h;
  }
  if (where) await ev(isNaN(+where) ? `document.querySelector(${JSON.stringify(where)}).scrollIntoView({block: "start"})` : `window.scrollTo(0, ${where})`);
  const out = js.length ? await ev(js.join('|')) : undefined;
  await sleep(1200);
  const vw = await ev('innerWidth');
  console.log(name, 'overflowX', await ev('document.documentElement.scrollWidth - innerWidth') ?? 'n/a',
    vw !== undefined && vw !== +w ? `WARNING layout viewport is ${vw}px, not ${w}px: content is wider than the screen` : '');
  if (out !== undefined) console.log(name, 'js', JSON.stringify(out));
  await shot(name);
}
console.log('console errors:', logs.length ? logs : 'none');
ws.close();
chrome.kill();
