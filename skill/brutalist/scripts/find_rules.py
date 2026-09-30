#!/usr/bin/env python3
"""Find long straight rules (borders, dividers, solid bands) in a flat screenshot.

The `measured` grid step of recreate. Usage:

  find_rules.py IMAGE [--crop x,y,w,h] [--min-run 0.6] [--threshold 60]

A column (or row) inside the crop counts as rule when at least MIN_RUN of its pixels are
darker than THRESHOLD (0-255 luminance). Adjacent rule lines merge into one rule with its
thickness; a thick result is a solid band, not a line. Positions are given in image px and
as fractions of the full image width/height, which hold at any DPR.
Only meaningful on flat-screenshot regions. Requires Pillow and numpy.
"""
import argparse
import json

import numpy as np
from PIL import Image


def runs(mask):
    out, start = [], None
    for i, v in enumerate(mask):
        if v and start is None:
            start = i
        if not v and start is not None:
            out.append((start, i - 1))
            start = None
    if start is not None:
        out.append((start, len(mask) - 1))
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('image')
    ap.add_argument('--crop', metavar='x,y,w,h')
    ap.add_argument('--min-run', type=float, default=0.6)
    ap.add_argument('--threshold', type=int, default=60)
    a = ap.parse_args()
    g = np.asarray(Image.open(a.image).convert('L')).astype(int)
    H, W = g.shape
    x0, y0, w, h = [int(v) for v in a.crop.split(',')] if a.crop else (0, 0, W, H)
    dark = g[y0:y0 + h, x0:x0 + w] < a.threshold
    res = {'image': a.image, 'size': [W, H], 'crop': [x0, y0, w, h],
           'method': f'share of pixels darker than {a.threshold} >= {a.min_run} along the line',
           'vertical': [], 'horizontal': []}
    for axis, key, off, full in ((0, 'vertical', x0, W), (1, 'horizontal', y0, H)):
        share = dark.mean(axis=axis)
        for s, e in runs(share >= a.min_run):
            res[key].append({'from_px': off + s, 'to_px': off + e, 'thickness_px': e - s + 1,
                             'center_fraction': round((off + (s + e) / 2) / full, 4)})
    print(json.dumps(res, indent=2))


if __name__ == '__main__':
    main()
