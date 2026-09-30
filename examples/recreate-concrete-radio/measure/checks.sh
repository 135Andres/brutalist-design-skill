#!/usr/bin/env bash
# Accessibility and motion checks of the final build, exactly as run for the report.
# Run from the repository root with CHROME set. Output: screenshots in screens/, results on stdout.
set -euo pipefail
S=skill/brutalist/scripts; B=examples/recreate-concrete-radio
CLIP='(()=>{const out=[];document.querySelectorAll("h1,p,td,a,button,h2,.badge").forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>innerWidth+1||r.left<-1))out.push(e.tagName+":"+e.textContent.trim().slice(0,20))});return {innerWidth,clipped:out,h1:getComputedStyle(document.querySelector("h1")).fontSize}})()'
node $S/shots.mjs $B/screens $B/build/index.html "390|844|0|mobile-390|$CLIP" "390|844|table|mobile-390-schedule" "320|700|0|reflow-320|$CLIP" "640|800|0|zoom200-640|$CLIP"
node $S/shots.mjs $B/screens $B/build/index.html \
  '1440|900|0|motion|new Promise(r=>{const t=document.querySelector(".track");const x=()=>new DOMMatrix(getComputedStyle(t).transform).m41;const a=x();setTimeout(()=>{const b=x();document.getElementById("air").click();setTimeout(()=>{const c=x();setTimeout(()=>r({px_per_s:Math.round(a-b),paused_drift_px:+(c-x()).toFixed(2),pressed:document.querySelector(".pause").getAttribute("aria-pressed")}),1000)},200)},1000)})'
node $S/shots.mjs $B/screens $B/build/index.html \
  '1440|900|0|focus-pause|new Promise(r=>{const b=document.querySelector(".pause");b.focus({focusVisible:true});r({active:document.activeElement.className,visible:getComputedStyle(b).opacity})})' \
  '1440|900|0|focus-donate|new Promise(r=>{const d=document.querySelector(".donate");d.focus({focusVisible:true});r({active:document.activeElement.className,outline:getComputedStyle(d).outlineStyle+" "+getComputedStyle(d).outlineWidth,focusable:[...document.querySelectorAll("a,button,[tabindex]")].map(e=>e.textContent.trim())})})'
node $S/shots.mjs "${TMPDIR:-/tmp}" $B/build/index.html \
  '1440|900|0|axe-scratch|new Promise(r=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";s.onload=()=>axe.run({runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]}}).then(x=>r({violations:x.violations.map(v=>v.id+" ("+v.impact+"): "+v.nodes.length),passes:x.passes.length,incomplete:x.incomplete.map(v=>v.id)}));s.onerror=()=>r("axe could not load");document.head.append(s)})'
REDUCED_MOTION=1 node $S/shots.mjs $B/screens $B/build/index.html '1440|900|0|reduced-motion|({animations:document.getAnimations().length,transform:getComputedStyle(document.querySelector(".track")).transform})'
NO_JS=1 node $S/shots.mjs $B/screens $B/build/index.html '1440|900|0|no-js'
