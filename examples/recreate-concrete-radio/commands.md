# Commands — how every number was produced

Run from the repository root. `S=skill/brutalist/scripts`,
`REF=examples/references/ref-a-concrete-radio.png`, `M=examples/recreate-concrete-radio/measure`.
Screenshots need `CHROME=/path/to/chrome` (any Chromium). Python needs Pillow and numpy.

## 1. Reference (step 2 of recreate — inventory)

```bash
# grid: rules and bands
python3 $S/find_rules.py $REF > $M/rules-full.json
python3 $S/find_rules.py $REF --crop 903,44,537,797 --min-run 0.9 > $M/rules-schedule.json
python3 $S/find_rules.py $REF --crop 0,844,1440,56 --min-run 0.9 > $M/rules-footer.json

# palette and contrast
python3 $S/sample_palette.py $REF \
  --region concrete=100,150,500,200 --region ink=200,1,500,8 --region signal=740,95,20,15 \
  --region ink_row=1250,470,150,60 --region signal_block=1350,846,85,12 \
  --contrast ink:concrete --contrast ink:signal --contrast concrete:ink_row \
  --contrast signal:ink --contrast concrete:signal > examples/recreate-concrete-radio/palette.json
python3 $S/sample_palette.py $REF --clusters 4 > $M/clusters.json

# sizes and positions (one call per element; crops chosen by looking at the image)
python3 $S/ink_bbox.py $REF --crop 600,380,300,300 --color '#121212' --rows > $M/bbox-headline-concrete-right.json
python3 $S/ink_bbox.py $REF --crop 0,430,900,150  --color '#121212'        > $M/bbox-headline-concrete-width.json
python3 $S/ink_bbox.py $REF --crop 0,700,900,141  --color '#121212' --rows > $M/bbox-headline-radio-lower.json
python3 $S/ink_bbox.py $REF --crop 680,60,200,200 --color '#ff3b1f' --tol 60 > $M/bbox-live-badge.json
#   the same call for kicker, badge text, marquee, schedule header, rows 1 and 3 and the
#   footer cells: each measure/bbox-*.json records its own crop, color and tolerance.

# rotation of the badge text and marquee rhythm
python3 $M/derived.py > $M/derived.txt
```

## 2. Type identification by calibration

```bash
node $S/shots.mjs $M $M/calibrate.html '2400|1920|0|calibration'   # candidates at 100 px
python3 $M/calibrate.py                                             # → measure/calibration.json
```

## 3. Build, screenshot, compare (step 5 — at most two adjustment rounds)

```bash
B=examples/recreate-concrete-radio
FREEZE='document.getAnimations().forEach(a=>{a.pause();a.currentTime=0})'
node $S/shots.mjs $B/screens $B/build/index.html "1440|900|0|build|$FREEZE"
python3 $M/compare.py $B/screens/build.png > $M/compare-final.txt

# overlay (reference under build at 50 %, and difference blend)
node $S/shots.mjs $B/screens "$S/overlay.html?ref=../../../$REF&build=../../../$B/screens/build.png&opacity=50" '1440|937|0|overlay'
node $S/shots.mjs $B/screens "$S/overlay.html?ref=../../../$REF&build=../../../$B/screens/build.png&mode=diff" '1440|937|0|overlay-diff'
```

`screens/build-round0.png` and `build-round1.png` are the earlier rounds; their
comparisons are summarized in the report.

## 4. Accessibility and motion checks

```bash
bash $M/checks.sh | tee $M/checks.txt
```

[`measure/checks.sh`](measure/checks.sh) holds every check exactly as run: widths 390 / 320 /
640 (= 1280 at 200 % zoom) with the real `innerWidth` and any clipped element; marquee speed
and pause drift; keyboard focus and focusable order; axe-core 4.10.2 (from cdnjs, tags
wcag2a, wcag2aa, wcag21aa, wcag22aa); reduced motion; no JavaScript. Results:
[`measure/checks.txt`](measure/checks.txt).
