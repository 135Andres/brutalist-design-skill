#!/usr/bin/env node
// brutalist — installer for the agent skill in skill/brutalist/.
//
//   npx brutalist-design-skill            interactive
//   npx brutalist-design-skill --yes      detected tools, global scope, no questions
//
// Options: --tools=claude,codex,…  --scope=global|project  --dry-run  --uninstall  --no-anim  --list  --help
// No dependencies. Animation is skipped when output is not a terminal, in CI, with --no-anim,
// or with NO_MOTION set; colour is skipped with NO_COLOR.
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync, lstatSync, readlinkSync, renameSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const SRC = join(dirname(fileURLToPath(import.meta.url)), 'skill', 'brutalist');
const HOME = resolve(homedir());
const CWD = process.cwd();
// options: --key, --key=value, or --key value for the two that take a value; anything else stops
const FLAGS = ['yes', 'dry-run', 'uninstall', 'list', 'help', 'no-anim'], VALUED = ['tools', 'scope'];
const args = {};
for (let i = 2, argv = process.argv; i < argv.length; i++) {
  const a = argv[i] === '-h' ? '--help' : argv[i];
  const m = /^--([a-z-]+)(?:=(.*))?$/s.exec(a);
  if (m && FLAGS.includes(m[1]) && m[2] === undefined) args[m[1]] = true;
  else if (m && VALUED.includes(m[1])) {
    const v = m[2] ?? (argv[i + 1] && !argv[i + 1].startsWith('-') ? argv[++i] : '');
    if (!v.trim()) { console.error(`--${m[1]} needs a value, e.g. --${m[1]}=${m[1] === 'scope' ? 'global' : 'claude,codex'}`); process.exit(2); }
    args[m[1]] = v;
  } else { console.error(`unknown option: ${a}  (see --help)`); process.exit(2); }
}
const out = process.stdout;
const TTY = out.isTTY && process.stdin.isTTY;
const ANIM = TTY && !args['no-anim'] && !process.env.CI && !process.env.NO_MOTION;
const COLOR = out.isTTY && !process.env.NO_COLOR;

// ── paint ────────────────────────────────────────────────────────────────
const esc = c => (COLOR ? `\x1b[${c}m` : '');
const red = s => esc('38;2;255;59;31') + s + esc(39);
const inv = s => esc(7) + s + esc(27);
const dim = s => esc(2) + s + esc(22);
const bold = s => esc(1) + s + esc(22);
const w = s => out.write(s);
const sleep = ms => new Promise(r => setTimeout(r, ANIM ? ms : 0));
const hideCursor = () => TTY && w('\x1b[?25l');
const showCursor = () => TTY && w('\x1b[?25h');
const up = n => n > 0 && w(`\x1b[${n}A\x1b[0J`);
const rows = s => Math.max(1, Math.ceil(s.replace(/\x1b\[[0-9;]*m/g, '').length / (out.columns || 80)));   // terminal rows a line takes
const COLS = () => (out.columns || 80) - 1;
const clip = (s, n) => s.length > n ? '…' + s.slice(s.length - n + 1) : s;   // keep the end of long paths
process.on('exit', showCursor);
process.on('SIGINT', () => { showCursor(); w('\n'); process.exit(130); });

// ── targets: each tool's skills folder (global and/or project) ───────────
const HERMES = process.env.HERMES_HOME || join(HOME, '.hermes');
const TOOLS = [
  { id: 'claude',   name: 'Claude Code',    global: join(HOME, '.claude', 'skills'), project: '.claude/skills',   mark: [join(HOME, '.claude'), '.claude'] },
  { id: 'codex',    name: 'Codex CLI',      global: join(HOME, '.agents', 'skills'), project: '.agents/skills',   mark: [join(HOME, '.codex'), '.agents'] },
  { id: 'cursor',   name: 'Cursor',         project: '.cursor/skills',   mark: [null, '.cursor'] },
  { id: 'gemini',   name: 'Gemini CLI',     project: '.gemini/skills',   mark: [null, '.gemini'] },
  { id: 'copilot',  name: 'GitHub Copilot', project: '.github/skills',   mark: [null, ['.github/skills', '.github/copilot-instructions.md']] },
  { id: 'opencode', name: 'OpenCode',       global: join(HOME, '.config', 'opencode', 'skills'), project: '.opencode/skills', mark: [join(HOME, '.config', 'opencode'), '.opencode'] },
  { id: 'hermes',   name: 'Hermes Agent',   global: join(HERMES, 'skills'), mark: [HERMES, null] },
];
const where = (t, scope) => scope === 'global' ? t.global : t.project && resolve(CWD, t.project);
const detected = (t, scope) => [t.mark[scope === 'global' ? 0 : 1]].flat().some(m => !!m && existsSync(scope === 'global' ? m : resolve(CWD, m)));
const pretty = p => p === HOME || p.startsWith(HOME + sep) ? '~' + p.slice(HOME.length) : relative(CWD, p) || '.';

// ── the word, in half blocks ─────────────────────────────────────────────
const GLYPHS = {
  B: ['█▄▄', '█▄█'], R: ['█▀█', '█▀▄'], U: ['█ █', '█▄█'], T: ['▀█▀', ' █ '],
  A: ['▄▀█', '█▀█'], L: ['█  ', '█▄▄'], I: ['█', '█'],     S: ['█▀▀', '▄▄█'],
};
const WORD = 'BRUTALIST';
const COMMANDS = ['recreate', 'motion', 'inspire', 'edit', 'verify', 'critique'];
const STEPS = 3;
let logRows = 1;
const log = (n, key, val) => { const l = `  ${dim(`[${n}/${STEPS}]`)} ${key.padEnd(8)} ${val}`; logRows = rows(l); w(l + '\n'); };
const glue = ws => ws.reduce((a, x) => (x === '·' && a.length ? (a[a.length - 1] += ' ·') : a.push(x), a), []);   // '·' never starts a line
const wrap = (words, sep, max) => words.reduce((ls, x) => {   // greedy line fill, never cut a word
  const last = ls[ls.length - 1];
  if (last !== undefined && last.length + sep.length + x.length <= max) ls[ls.length - 1] = last + sep + x; else ls.push(x);
  return ls;
}, []);

async function intro() {
  const rows = ['', ''];
  const wide = [...WORD].reduce((n, ch) => n + GLYPHS[ch][0].length + 1, 0) - 1;
  hideCursor();
  w('\n');
  if (COLS() < wide + 4) w(`  ${bold(WORD)}\n`);
  else {
    // letters slam in one at a time
    for (const ch of WORD) {
      rows.forEach((_, r) => { rows[r] += (rows[r] ? ' ' : '') + GLYPHS[ch][r]; });
      if (ANIM) { w(rows.map(r => '  ' + bold(r)).join('\n') + '\n'); await sleep(45); up(2); }
    }
    w(rows.map(r => '  ' + bold(r)).join('\n') + '\n');
  }
  w('\n' + wrap(COMMANDS, ' · ', Math.max(20, COLS() - 4)).map(l => `  ${l}\n`).join(''));
  w(wrap(glue('an agent skill for brutalist web design · skill/brutalist → your tools'.split(' ')), ' ', Math.max(20, COLS() - 4)).map(l => `  ${dim(l)}\n`).join('') + '\n');
}

// ── a keyboard list: ↑↓ move, space toggle, enter confirm ────────────────
const BACK = Symbol('back');
function choose({ step, title, items, multi, back, start = 0 }) {
  return new Promise(done => {
    let at = start, lines = 0;
    const draw = () => {
      up(lines);
      const help = (multi ? '↑↓ move · space toggle · a all · enter confirm' : '↑↓ move · enter choose') + (back ? ' · ← back' : '');
      const head = `  [${step}/${STEPS}] ${title}  `;  // the help wraps under itself, so a redraw never miscounts lines
      const helps = wrap(help.split(' · '), ' · ', Math.max(12, COLS() - head.length - 1));
      const body = [`  ${dim(`[${step}/${STEPS}]`)} ${bold(title)}  ${dim(helps[0])}`, ...helps.slice(1).map(l => ' '.repeat(head.length) + dim(l)), ''];
      items.forEach((it, i) => {
        const box = multi ? (it.on ? red('■') : '□') + ' ' : '';
        const narrow = COLS() < 50;                 // on narrow terminals the path goes, so no line wraps
        const room = Math.max(8, COLS() - 26 - (it.note ? it.note.length + 2 : 0));
        const label = it.label.padEnd(narrow ? 13 : 16);
        let line = `  ${i === at ? red('▸') : ' '} ${box}${i === at ? bold(label) : label}${narrow ? '' : ' ' + dim(clip(it.hint || '', room))}`;
        if (it.note) line += '  ' + red(it.note);
        body.push(line);
      });
      body.push('');
      w(body.join('\n') + '\n');
      lines = body.reduce((n, l) => n + (l ? rows(l) : 1), 0);
    };
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    const onKey = (_, k) => {
      if (k.ctrl && k.name === 'c') { process.stdin.setRawMode(false); showCursor(); w('\n'); process.exit(130); }
      if (back && k.name === 'left') {
        process.stdin.off('keypress', onKey); process.stdin.setRawMode(false); process.stdin.pause();
        up(lines);
        return done(BACK);
      }
      if (k.name === 'up') at = (at + items.length - 1) % items.length;
      else if (k.name === 'down' || k.name === 'tab') at = (at + 1) % items.length;
      else if (multi && k.name === 'space') items[at].on = !items[at].on;
      else if (multi && k.name === 'a') { const all = items.every(i => i.on); items.forEach(i => { i.on = !all; }); }
      else if (k.name === 'return') {
        process.stdin.off('keypress', onKey); process.stdin.setRawMode(false); process.stdin.pause();
        up(lines);                                  // the list collapses; the caller logs the result
        return done(multi ? items.filter(i => i.on) : items[at]);
      }
      draw();
    };
    process.stdin.on('keypress', onKey);
    draw();
  });
}

// ── copy with a progress bar ─────────────────────────────────────────────
function files(dir) {
  return readdirSync(dir).flatMap(n => { const p = join(dir, n); return statSync(p).isDirectory() ? files(p) : [p]; });
}
const rel = (d, p) => relative(d, p);
function sameTree(a, b) {                     // true when b holds exactly a's files, byte for byte
  try {
    const fa = files(a).map(p => rel(a, p)).sort(), fb = files(b).map(p => rel(b, p)).sort();
    return fa.length === fb.length && fa.every((p, i) => p === fb[i] && readFileSync(join(a, p)).equals(readFileSync(join(b, p))));
  } catch { return false; }
}
const isLink = p => { try { return lstatSync(p).isSymbolicLink(); } catch { return false; } };
const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const backupOf = (tool, scope, dest) => {     // a copy that differs from this version is kept outside every skills folder
  const b = join(HOME, '.brutalist-skill', 'backups', `${tool.id}-${scope}-${stamp()}`);
  mkdirSync(dirname(b), { recursive: true }); cpSync(dest, b, { recursive: true, dereference: true });
  return b;
};
async function install(tool, scope, dry) {
  const base = where(tool, scope), dest = join(base, 'brutalist');
  if (isLink(dest)) return w(`        ${tool.name.padEnd(15)} ${pretty(dest)} ${dim('is a link to ' + readlinkSync(dest) + '; left as it is')}\n`);
  const existed = existsSync(dest);
  // an installed copy that differs from this version (edited, or older) is kept, outside the
  // skills folder so no tool loads it as a second skill
  let backup = null;
  const differs = existed && !sameTree(SRC, dest);
  const label = `        ${tool.name.padEnd(15)} ${clip(pretty(dest), Math.max(12, COLS() - 42)).padEnd(Math.min(34, Math.max(12, COLS() - 42)))}`;
  const all = files(SRC), n = all.length, W = 16;
  if (ANIM) for (let i = 0; i <= n; i++) {
    const f = Math.round(W * i / n);
    w('\r' + label + ' ' + red('█'.repeat(f)) + dim('░'.repeat(W - f)));
    await sleep(22);
  }
  if (!dry) {
    mkdirSync(base, { recursive: true });
    if (differs) backup = backupOf(tool, scope, dest);
    // copy beside it first, then swap: a failed copy leaves the old skill untouched
    const fresh = join(base, `.brutalist-new-${process.pid}`), old = join(base, `.brutalist-old-${process.pid}`);
    try { cpSync(SRC, fresh, { recursive: true }); } catch (e) { rmSync(fresh, { recursive: true, force: true }); throw e; }
    if (existed) renameSync(dest, old);
    renameSync(fresh, dest);
    if (existed) rmSync(old, { recursive: true, force: true });
  }
  w('\r' + label + ' ' + (dry ? dim('DRY RUN') : inv(existed ? ' UPDATED ' : ' OK ')) + (TTY ? '\x1b[K' : '') + '\n');
  if (differs) w(`        ${' '.repeat(15)} ${dim(dry ? 'would keep your previous copy (it differs from this version)' : 'kept your previous copy in ' + pretty(backup))}\n`);
}
async function uninstall(tool, scope, dry) {
  const dest = join(where(tool, scope), 'brutalist');
  const label = `        ${tool.name.padEnd(15)} ${pretty(dest).padEnd(34)}`;
  if (isLink(dest)) return w(label + ' ' + dim('is a link to ' + readlinkSync(dest) + '; left as it is') + '\n');
  if (!existsSync(dest)) return w(label + ' ' + dim('not installed') + '\n');
  const differs = !sameTree(SRC, dest);          // edited (or another version): keep it before removing
  const backup = differs && !dry ? backupOf(tool, scope, dest) : null;
  if (!dry) rmSync(dest, { recursive: true, force: true });
  w(label + ' ' + (dry ? dim('DRY RUN') : inv(' REMOVED ')) + '\n');
  if (differs) w(`        ${' '.repeat(15)} ${dim(dry ? 'would keep your copy first (it differs from this version)' : 'kept your copy in ' + pretty(backup))}\n`);
}

// ── main ─────────────────────────────────────────────────────────────────
async function main() {
  if (args.help) {
    w(`brutalist — install the agent skill\n\n  npx brutalist-design-skill [options]\n
  --tools=${TOOLS.map(t => t.id).join(',')}
  --scope=global|project   global: your home folder · project: the current folder
  --yes                    no questions: detected tools (or --tools; Claude Code if none is
                           detected), global scope unless --scope. Also the behaviour when
                           not run in a terminal
  --dry-run                show what would happen, change nothing
  --uninstall              remove the skill instead
  --list                   show every tool, its folders and whether it was detected
  --no-anim                no animation (also: not a terminal, CI, NO_MOTION)\n`);
    return;
  }
  if (!existsSync(join(SRC, 'SKILL.md'))) { console.error('skill/brutalist/SKILL.md not found next to the installer'); process.exit(1); }
  if (args.list) {
    for (const t of TOOLS) for (const s of ['global', 'project']) {
      const p = where(t, s); if (!p) continue;
      w(`${t.name.padEnd(15)} ${s.padEnd(8)} ${pretty(p).padEnd(34)} ${detected(t, s) ? 'detected' : ''}\n`);
    }
    return;
  }
  const wantIds = typeof args.tools === 'string' ? args.tools.split(',').map(x => x.trim()).filter(Boolean) : [];
  const bad = wantIds.filter(id => !TOOLS.some(t => t.id === id));
  if (bad.length) { console.error(`unknown tool: ${bad.join(', ')} — use ${TOOLS.map(t => t.id).join(', ')}`); process.exit(2); }
  if (args.scope && !['global', 'project'].includes(args.scope)) { console.error('--scope must be global or project'); process.exit(2); }
  await intro();
  const interactive = TTY && !args.yes;
  const want = typeof args.tools === 'string' ? args.tools.split(',').map(s => s.trim()).filter(Boolean) : null;
  const askScope = !args.scope && interactive;
  const noFolder = s => (want || []).filter(id => !where(TOOLS.find(t => t.id === id), s));
  if (args.scope && noFolder(args.scope).length) { console.error(`no ${args.scope} skills folder for: ${noFolder(args.scope).join(', ')}; try --scope=${args.scope === 'global' ? 'project' : 'global'}`); process.exit(2); }
  let scope, avail, picked, scopeAt = 0;
  for (;;) {                                    // ← on the second list returns to the first
    scope = args.scope;
    if (askScope) {
      const scopes = [
        { label: 'Everywhere', hint: 'your home folder: every project', value: 'global' },
        { label: 'This project', hint: CWD.startsWith(HOME) ? '~' + CWD.slice(HOME.length) : CWD, value: 'project' },
      ];
      scope = (await choose({ step: 1, title: 'scope', items: scopes, start: scopeAt })).value;
      scopeAt = scopes.findIndex(x => x.value === scope);   // ← comes back to the same choice
    }
    scope = scope === 'project' ? 'project' : 'global';
    log(1, 'scope', scope === 'global' ? 'everywhere (~)' : 'this project ' + dim(clip(pretty(CWD), Math.max(8, COLS() - 31))));
    avail = TOOLS.filter(t => where(t, scope));
    if (interactive && !want) {
      const items = avail.map(t => ({ tool: t, label: t.name, hint: pretty(where(t, scope)), note: detected(t, scope) ? 'detected' : '', on: detected(t, scope) }));
      if (!items.some(i => i.on)) items[0].on = true;
      const got = await choose({ step: 2, title: args.uninstall ? 'remove from' : 'targets', items, multi: true, back: askScope });
      if (got === BACK) { up(logRows); continue; }    // erase the scope line and ask again
      picked = got.map(i => i.tool);
    }
    break;
  }
  if (!picked) {
    picked = want ? avail.filter(t => want.includes(t.id)) : avail.filter(t => detected(t, scope));
    if (want && noFolder(scope).length) { console.error(`no ${scope} skills folder for: ${noFolder(scope).join(', ')}; try --scope=${scope === 'global' ? 'project' : 'global'}`); process.exit(2); }
    if (!picked.length) picked = avail.filter(t => t.id === 'claude');
  }
  if (!picked.length) { w('  nothing selected. nothing changed.\n\n'); return; }
  log(2, 'targets', picked.map(t => t.name).join(' · '));
  log(3, args.uninstall ? 'remove' : 'copy', args['dry-run'] ? dim('dry run, nothing changes') : '');
  for (const t of picked) await (args.uninstall ? uninstall : install)(t, scope, !!args['dry-run']);
  if (args.uninstall) { w('\n'); return; }
  if (args['dry-run']) { w(`\n  ${red('■')} ${bold('Dry run.')} Nothing changed.\n\n`); return; }
  w(`\n  ${red('■')} ${bold('Ready.')} Restart your tool, then ask in your own words:\n\n`);
  w(`    ${inv(' "rebuild this image as a page" ')}  ${dim('or "inspire me with these"')}\n`);
  const named = [picked.some(t => t.id === 'claude') && '/brutalist in Claude Code', picked.some(t => t.id === 'codex') && '$brutalist in Codex'].filter(Boolean);
  if (named.length) w(`    ${dim('to name the skill: ' + named.join(' · '))}\n`);
  w('\n');
  w(`  ${dim('docs  https://github.com/135Andres/brutalist-design-skill')}\n\n`);
}

main().catch(e => { showCursor(); console.error(e.message); process.exit(1); });
