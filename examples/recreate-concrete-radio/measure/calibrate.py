#!/usr/bin/env python3
"""Type identification by calibration: compare the width/cap-height ratio of each candidate
font (rendered at 100 px in calibration.png by calibrate.html) with the reference's.
Run from the repository root after:
  node skill/brutalist/scripts/shots.mjs M M/calibrate.html '2400|1920|0|calibration'"""
import json, subprocess
M = 'examples/recreate-concrete-radio/measure'; S = 'skill/brutalist/scripts'
rows = [('Anton', 'CONCRETE'), ('Bebas Neue', 'CONCRETE'), ('League Gothic', 'CONCRETE'), ('Oswald', 'CONCRETE'),
        ('Anton', 'TAPE HISS HOUR'), ('Bebas Neue', 'TAPE HISS HOUR'), ('League Gothic', 'TAPE HISS HOUR'), ('Oswald', 'TAPE HISS HOUR'),
        ('Space Mono', '20:00'), ('IBM Plex Mono', '20:00'), ('JetBrains Mono', '20:00'), ('Courier Prime', '20:00')]
# reference ratios from bbox-headline-concrete-width, bbox-row1-name, bbox-row1-time
target = {'CONCRETE': 831 / 204, 'TAPE HISS HOUR': 149 / 22, '20:00': 40 / 10}
out = []
for i, (font, text) in enumerate(rows):
    r = json.loads(subprocess.check_output(['python3', f'{S}/ink_bbox.py', f'{M}/calibration.png',
                                            '--crop', f'0,{i * 160},2400,160', '--color', '#000000', '--tol', '40']))
    x, y, w, h = r['bbox_px']
    out.append({'font': font, 'text': text, 'width_px': w, 'cap_px': h, 'ratio': round(w / h, 3),
                'reference_ratio': round(target[text], 3), 'error_pct': round(100 * (w / h / target[text] - 1), 1),
                'cap_per_em': round(h / 100, 3)})
json.dump(out, open(f'{M}/calibration.json', 'w'), indent=2)
for o in out:
    print(f"{o['font']:15} {o['text']:15} ratio {o['ratio']:6} ref {o['reference_ratio']:6} err {o['error_pct']:6}%  cap/em {o['cap_per_em']}")
