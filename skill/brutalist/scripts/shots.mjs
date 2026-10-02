// Headless screenshots for verify and recreate §5. Node >= 22 (built-in WebSocket, fetch).
//
// Usage:
//   CHROME=/path/to/chrome node shots.mjs OUT_DIR PAGE 'W|H|WHERE|NAME[|JS]' ...
//
// Each step: viewport width and height (CSS px, DPR 1); WHERE = a CSS selector to scroll
// into view, a scrollY number, or empty; NAME = the PNG file name (with or without .png); JS = optional code run
// before the screenshot (a returned value, or a resolved promise, is printed as JSON).
// PAGE is a file path (with an optional query string) or an http(s):// or file:// URL, so a
// dev server works. The page reloads whenever the viewport size changes.
// Env: CHROME_ARGS='--no-sandbox' (extra browser flags; needed as root or in containers);
// REDUCED_MOTION=1 emulates prefers-reduced-motion; NO_JS=1 disables JavaScript
// (JS steps then do nothing). Prints horizontal overflow per step and console errors.
// Fails (exit 1) when the page does not load (network error, HTTP status >= 400, missing
// file), when a WHERE selector matches nothing, or when a JS step throws.
// Mobile emulation widens the layout viewport to fit content that is too wide, which hides
// the overflow from scrollWidth; the script warns when the viewport is not the width asked.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

if (typeof WebSocket === 'undefined') { console.error('shots.mjs needs Node >= 22 (built-in WebSocket)'); process.exit(2); }
const CHROME = process.env.CHROME || 'chromium';
const [OUT, pageArg, ...steps] = process.argv.slice(2);
if (!OUT || !pageArg) { console.error('usage: shots.mjs OUT_DIR PAGE STEP...'); process.exit(2); }
let PAGE = pageArg;
if (!/^(https?|file):\/\//i.test(pageArg)) {
  const [pagePath, query = ''] = pageArg.split(/\?(.*)/s);
  if (!existsSync(pagePath)) { console.error('no such file:', pagePath); process.exit(1); }
  PAGE = 'file://' + resolve(pagePath) + (query ? '?' + query : '');
}
mkdirSync(OUT, { recursive: true });

// a private profile and a free port, so parallel runs never share a browser; closed on any exit
const PROFILE = mkdtempSync(join(tmpdir(), 'shots-'));
const EXTRA = (process.env.CHROME_ARGS || '').split(/\s+/).filter(Boolean);
const chrome = spawn(CHROME, [...EXTRA, '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${PROFILE}`,
  '--no-first-run', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const gone = new Promise(r => chrome.once('exit', r));
const close = async () => {                     // wait for the browser to quit, then remove its profile
  try { chrome.kill(); } catch {}
  await Promise.race([gone, new Promise(r => setTimeout(r, 3000))]);
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
};
process.on('exit', () => { try { chrome.kill(); } catch {} });   // last resort: never leave it running
const fail = async msg => { console.error('FAILED:', msg); await close(); process.exit(1); };
process.on('uncaughtException', e => fail(e.message));
process.on('unhandledRejection', e => fail(e?.message || String(e)));
chrome.on('error', e => fail(`could not start the browser (${e.message}); set CHROME`));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets = [], PORT;
for (let k = 0; k < 50 && !targets.length; k++) {
  try {
    PORT ??= readFileSync(join(PROFILE, 'DevToolsActivePort'), 'utf8').split('\n')[0];
    targets = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).filter(t => t.type === 'page');
  } catch { /* browser still starting */ }
  if (!targets.length) await sleep(200);
}
if (!targets.length) await fail('could not reach the browser; set CHROME (and CHROME_ARGS="--no-sandbox" when running as root or in a container)');

const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let id = 0;
const pending = new Map();
const logs = [];
let docStatus;                                  // HTTP status of the last document loaded
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Network.responseReceived' && m.params.type === 'Document') docStatus = m.params.response.status;
  if (m.method === 'Runtime.exceptionThrown') logs.push('EXCEPTION ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) logs.push('CONSOLE ' + m.params.args.map(a => a.value).join(' '));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') logs.push('LOG ' + m.params.entry.text);
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => {
  const r = (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result;
  if (r?.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r?.result?.value;
};
const shot = async name => {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  const file = `${OUT}/${name.replace(/\.png$/i, '')}.png`;
  writeFileSync(file, Buffer.from(r.result.data, 'base64'));
  console.log('saved', file);
};

await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable'); await send('Network.enable'); await send('Page.bringToFront');
if (process.env.REDUCED_MOTION) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
if (process.env.NO_JS) await send('Emulation.setScriptExecutionDisabled', { value: true });

let size = '';
for (const step of steps) {
  const [w, h, where, name, ...js] = step.split('|');
  if (size !== w + 'x' + h) {
    await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 700 });
    docStatus = undefined;
    const nav = (await send('Page.navigate', { url: PAGE })).result;
    if (nav?.errorText) await fail(`${PAGE} did not load: ${nav.errorText}`);
    await sleep(1500);
    if (docStatus >= 400) await fail(`${PAGE} answered HTTP ${docStatus}`);
    console.log('loaded', await ev('location.href'));
    await ev('document.fonts.ready.then(() => 1)');
    size = w + 'x' + h;
  }
  if (where) await ev(isNaN(+where)
    ? `(() => { const e = document.querySelector(${JSON.stringify(where)}); if (!e) throw new Error('selector matches nothing: ' + ${JSON.stringify(where)}); e.scrollIntoView({block: "start"}); })()`
    : `window.scrollTo(0, ${where})`);
  const out = js.length ? await ev(js.join('|')).catch(e => fail(`JS step in ${name} threw: ${e.message}`)) : undefined;
  await sleep(1200);
  const vw = await ev('innerWidth');
  console.log(name, 'overflowX', await ev('document.documentElement.scrollWidth - innerWidth') ?? 'n/a',
    vw !== undefined && vw !== +w ? `WARNING layout viewport is ${vw}px, not ${w}px: content is wider than the screen` : '');
  if (out !== undefined) console.log(name, 'js', JSON.stringify(out));
  await shot(name);
}
console.log('console errors:', logs.length ? logs : 'none');
ws.close();
await close();
