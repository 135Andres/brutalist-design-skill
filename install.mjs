#!/usr/bin/env node
// brutalist — installer for the agent skill in skill/brutalist/.
//
//   npx github:135Andres/brutalist-design-skill            interactive
//   npx github:135Andres/brutalist-design-skill --yes      detected tools, global scope, no questions
//
// Options: --tools=claude,codex,…  --scope=global|project  --dry-run  --uninstall  --no-anim  --list  --help
// No dependencies. Animation is skipped when output is not a terminal, in CI, with --no-anim,
// or with NO_MOTION set; colour is skipped with NO_COLOR.
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const SRC = join(dirname(fileURLToPath(import.meta.url)), 'skill', 'brutalist');
const HOME = resolve(homedir());
const CWD = process.cwd();
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
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
  { id: 'copilot',  name: 'GitHub Copilot', project: '.github/skills',   mark: [null, '.github'] },
  { id: 'opencode', name: 'OpenCode',       project: '.opencode/skills', mark: [null, '.opencode'] },
  { id: 'hermes',   name: 'Hermes Agent',   global: join(HERMES, 'skills'), mark: [HERMES, null] },
];
const where = (t, scope) => scope === 'global' ? t.global : t.project && resolve(CWD, t.project);
const detected = (t, scope) => { const m = t.mark[scope === 'global' ? 0 : 1]; return !!m && existsSync(scope === 'global' ? m : resolve(CWD, m)); };
const pretty = p => p.startsWith(HOME) ? '~' + p.slice(HOME.length) : relative(CWD, p) || '.';

// ── the word, in blocks ──────────────────────────────────────────────────
const GLYPHS = {
  B: ['████ ', '█   █', '████ ', '█   █', '████ '], R: ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
  U: ['█   █', '█   █', '█   █', '█   █', ' ███ '], T: ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
  A: [' ███ ', '█   █', '█████', '█   █', '█   █'], L: ['█    ', '█    ', '█    ', '█    ', '█████'],
  I: ['███', ' █ ', ' █ ', ' █ ', '███'],             S: [' ████', '█    ', ' ███ ', '    █', '████ '],
};
const WORD = 'BRUTALIST';
const COMMANDS = ' RECREATE ● MOTION ● INSPIRE ● EDIT ● VERIFY ● CRITIQUE ●';

async function intro() {
  const rows = [0, 1, 2, 3, 4].map(() => '');
  hideCursor();
  w('\n');
  // letters slam in one at a time
  for (const ch of WORD) {
    rows.forEach((_, r) => { rows[r] += GLYPHS[ch][r] + ' '; });
    if (ANIM) { w(rows.map(r => '  ' + bold(r)).join('\n') + '\n'); await sleep(45); up(5); }
  }
  w(rows.map(r => '  ' + bold(r)).join('\n') + '\n');
  const width = rows[0].length;
  // a signal-red bar draws under the word
  for (let i = 1; i <= width; i += ANIM ? 3 : width) {
    w('\r  ' + red('▀'.repeat(Math.min(i, width)))); await sleep(12);
  }
  w('\n');
  // the command ticker runs for a moment, then settles
  const tape = COMMANDS.repeat(4);
  for (let f = 0; f < (ANIM ? 36 : 1); f++) {
    w('\r  ' + inv(tape.slice(f, f + width))); await sleep(38);
  }
  w('\r  ' + inv(tape.slice(0, width)) + '\n');
  w(`  ${dim('an agent skill for brutalist web design · skill/brutalist → your tools')}\n\n`);
}

// ── a keyboard list: ↑↓ move, space toggle, enter confirm ────────────────
function choose({ title, items, multi }) {
  return new Promise(done => {
    let at = 0, lines = 0;
    const draw = () => {
      up(lines);
      const help = multi ? '↑↓ move · space toggle · a all · enter confirm' : '↑↓ move · enter choose';
      const body = [`  ${inv(' ' + title + ' ')}  ${dim(help)}`, ''];
      items.forEach((it, i) => {
        const box = multi ? (it.on ? red('■') : '□') : (i === at ? red('●') : '○');
        const room = Math.max(8, COLS() - 26 - (it.note ? it.note.length + 2 : 0));
        let line = ` ${box} ${it.label.padEnd(16)} ${dim(clip(it.hint || '', room))}`;
        if (it.note) line += '  ' + red(it.note);
        body.push(i === at ? '  ' + inv(line + ' ') : '  ' + line);
      });
      body.push('');
      w(body.join('\n') + '\n');
      lines = body.length;
    };
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    const onKey = (_, k) => {
      if (k.ctrl && k.name === 'c') { process.stdin.setRawMode(false); showCursor(); w('\n'); process.exit(130); }
      if (k.name === 'up') at = (at + items.length - 1) % items.length;
      else if (k.name === 'down' || k.name === 'tab') at = (at + 1) % items.length;
      else if (multi && k.name === 'space') items[at].on = !items[at].on;
      else if (multi && k.name === 'a') { const all = items.every(i => i.on); items.forEach(i => { i.on = !all; }); }
      else if (k.name === 'return') {
        process.stdin.off('keypress', onKey); process.stdin.setRawMode(false); process.stdin.pause();
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
async function install(tool, scope, dry) {
  const base = where(tool, scope), dest = join(base, 'brutalist');
  const existed = existsSync(dest);
  const label = `  ${tool.name.padEnd(15)} ${clip(pretty(dest), Math.max(12, COLS() - 36)).padEnd(Math.min(34, Math.max(12, COLS() - 36)))}`;
  const all = files(SRC), n = all.length, W = 16;
  if (ANIM) for (let i = 0; i <= n; i++) {
    const f = Math.round(W * i / n);
    w('\r' + label + ' ' + red('█'.repeat(f)) + dim('░'.repeat(W - f)));
    await sleep(22);
  }
  if (!dry) {
    mkdirSync(base, { recursive: true });
    if (existed) rmSync(dest, { recursive: true, force: true });
    cpSync(SRC, dest, { recursive: true });
  }
  w('\r' + label + ' ' + (dry ? dim('DRY RUN') : inv(existed ? ' UPDATED ' : ' DONE ')) + (TTY ? '\x1b[K' : '') + '\n');
}
async function uninstall(tool, scope, dry) {
  const dest = join(where(tool, scope), 'brutalist');
  const label = `  ${tool.name.padEnd(15)} ${pretty(dest).padEnd(34)}`;
  if (!existsSync(dest)) return w(label + ' ' + dim('not installed') + '\n');
  if (!dry) rmSync(dest, { recursive: true, force: true });
  w(label + ' ' + (dry ? dim('DRY RUN') : inv(' REMOVED ')) + '\n');
}

// ── main ─────────────────────────────────────────────────────────────────
async function main() {
  if (args.help) {
    w(`brutalist — install the agent skill\n\n  npx github:135Andres/brutalist-design-skill [options]\n
  --tools=${TOOLS.map(t => t.id).join(',')}
  --scope=global|project   global: your home folder · project: the current folder
  --yes                    no questions: detected tools (or --tools), global scope unless --scope
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
  await intro();
  const interactive = TTY && !args.yes;
  let scope = args.scope;
  if (!scope && interactive) {
    scope = (await choose({ title: 'WHERE', items: [
      { label: 'Everywhere', hint: 'your home folder: every project', value: 'global' },
      { label: 'This project', hint: CWD.startsWith(HOME) ? '~' + CWD.slice(HOME.length) : CWD, value: 'project' },
    ] })).value;
    up(5);
  }
  scope = scope === 'project' ? 'project' : 'global';
  const want = typeof args.tools === 'string' ? args.tools.split(',') : null;
  const avail = TOOLS.filter(t => where(t, scope));
  let picked;
  if (interactive && !want) {
    const items = avail.map(t => ({ tool: t, label: t.name, hint: pretty(where(t, scope)), note: detected(t, scope) ? 'detected' : '', on: detected(t, scope) }));
    if (!items.some(i => i.on)) items[0].on = true;
    picked = (await choose({ title: args.uninstall ? 'REMOVE FROM' : 'INSTALL INTO', items, multi: true })).map(i => i.tool);
    up(items.length + 3);
  } else {
    picked = want ? avail.filter(t => want.includes(t.id)) : avail.filter(t => detected(t, scope));
    if (!picked.length) picked = avail.filter(t => t.id === 'claude');
  }
  if (!picked.length) { w('  nothing selected. nothing changed.\n'); return; }
  w(`  ${inv(args.uninstall ? ' REMOVING ' : ' INSTALLING ')} ${dim(scope === 'global' ? 'everywhere' : 'in ' + CWD)}${args['dry-run'] ? dim(' · dry run') : ''}\n\n`);
  for (const t of picked) await (args.uninstall ? uninstall : install)(t, scope, !!args['dry-run']);
  if (args.uninstall) { w('\n'); return; }
  w(`\n  ${red('■')} ${bold('Ready.')} Restart your tool, then try:\n\n`);
  w(`    ${inv(' /brutalist recreate path/to/screenshot.png ')}\n`);
  w(`    ${dim('or just ask: "rebuild this image as a page", "inspire me with these"')}\n\n`);
  w(`  ${dim('docs  https://github.com/135Andres/brutalist-design-skill')}\n\n`);
}

main().catch(e => { showCursor(); console.error(e.message); process.exit(1); });
