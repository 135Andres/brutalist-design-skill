#!/usr/bin/env python3
"""Bounding box of the pixels close to a color, inside a crop.

Measures what a region's ink occupies: cap height of a headline, size of a badge, height
of a text line. Usage:

  ink_bbox.py IMAGE --crop x,y,w,h --color '#121212' [--tol 40] [--rows]

Prints JSON with the box in image px and as fractions of the image, and the pixel count.
--rows also lists the vertical runs of rows that contain ink (one run per text line,
when lines do not touch), which gives line heights and gaps.
Antialiased edges are counted only within the tolerance: say so in the inventory.
Requires Pillow and numpy.
"""
import argparse
import json

import numpy as np
from PIL import Image


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('image')
    ap.add_argument('--crop', required=True, metavar='x,y,w,h')
    ap.add_argument('--color', required=True, metavar='#rrggbb')
    ap.add_argument('--tol', type=float, default=40, help='max euclidean RGB distance')
    ap.add_argument('--rows', action='store_true')
    a = ap.parse_args()
    px = np.asarray(Image.open(a.image).convert('RGB')).astype(float)
    H, W, _ = px.shape
    x0, y0, w, h = [int(v) for v in a.crop.split(',')]
    target = np.array([int(a.color.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4)], dtype=float)
    patch = px[y0:y0 + h, x0:x0 + w]
    mask = np.sqrt(((patch - target) ** 2).sum(-1)) <= a.tol
    res = {'image': a.image, 'crop': [x0, y0, w, h], 'color': a.color, 'tol': a.tol,
           'pixels': int(mask.sum()), 'method': f'pixels within RGB distance {a.tol} of {a.color}'}
    if mask.any():
        ys, xs = np.nonzero(mask)
        bx, by = x0 + int(xs.min()), y0 + int(ys.min())
        bw, bh = int(xs.max() - xs.min() + 1), int(ys.max() - ys.min() + 1)
        res['bbox_px'] = [bx, by, bw, bh]
        res['bbox_fraction'] = [round(bx / W, 4), round(by / H, 4), round(bw / W, 4), round(bh / H, 4)]
        if a.rows:
            on = mask.any(axis=1)
            runs, start = [], None
            for i, v in enumerate(list(on) + [False]):
                if v and start is None:
                    start = i
                if not v and start is not None:
                    runs.append({'from_px': y0 + start, 'to_px': y0 + i - 1, 'height_px': i - start})
                    start = None
            res['row_runs'] = runs
    print(json.dumps(res, indent=2))


if __name__ == '__main__':
    main()
