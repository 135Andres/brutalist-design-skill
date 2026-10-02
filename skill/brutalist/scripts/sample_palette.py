#!/usr/bin/env python3
"""Measure colors from a reference image, and the contrast between them.

The `measured` palette step of recreate. Usage:

  sample_palette.py IMAGE --region NAME=x,y,w,h [--region ...]    median of flat patches
                          [--contrast NAME:NAME ...]               WCAG contrast of two regions
  sample_palette.py IMAGE --clusters N                              dominant colors, whole image

Prints JSON. Each region: hex, pixel count, box, method, mean absolute deviation (a high
value means the patch was not flat — choose another). Copy these caveats into the
inventory: antialiasing, color profile, compression, gradients.
Requires Pillow and numpy.
"""
import argparse
import json
import sys

import numpy as np
from PIL import Image


def hexify(rgb):
    return '#' + ''.join(f'{int(round(c)):02x}' for c in rgb)


def luminance(rgb):
    c = np.asarray(rgb, dtype=float) / 255
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)   # same result as 0.03928 for 8-bit values
    return float(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2])


def contrast(a, b):
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def region_median(px, name, box):
    x, y, w, h = box
    patch = px[y:y + h, x:x + w].reshape(-1, 3).astype(float)
    med = np.median(patch, axis=0)
    dev = float(np.abs(patch - med).max(axis=1).mean())
    return {'name': name, 'hex': hexify(med), 'rgb': [int(round(v)) for v in med],
            'pixels': int(len(patch)), 'box': [x, y, w, h],
            'method': 'median of flat patch', 'mean_abs_deviation': round(dev, 2)}


def clusters(px, n, seed=0):
    data = px.reshape(-1, 3).astype(float)
    rng = np.random.default_rng(seed)
    sample = data[rng.choice(len(data), min(len(data), 60000), replace=False)]
    cent = sample[rng.choice(len(sample), n, replace=False)]
    for _ in range(30):
        lab = np.argmin(((sample[:, None] - cent[None]) ** 2).sum(-1), axis=1)
        new = np.array([sample[lab == k].mean(0) if (lab == k).any() else cent[k] for k in range(n)])
        if np.allclose(new, cent):
            break
        cent = new
    # label in blocks so a large screenshot does not hold every distance in memory at once
    lab = np.concatenate([np.argmin(((data[i:i + 200000, None] - cent[None]) ** 2).sum(-1), axis=1)
                          for i in range(0, len(data), 200000)])
    out = [{'hex': hexify(cent[k]), 'pixels': int((lab == k).sum()),
            'share': round(float((lab == k).mean()), 4), 'method': f'k-means, k={n}, seed={seed}'}
           for k in range(n)]
    return sorted(out, key=lambda d: -d['pixels'])


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('image')
    ap.add_argument('--region', action='append', default=[], metavar='NAME=x,y,w,h')
    ap.add_argument('--contrast', action='append', default=[], metavar='NAME:NAME')
    ap.add_argument('--clusters', type=int)
    a = ap.parse_args()
    if not a.region and not a.clusters:
        sys.exit('give --region and/or --clusters')
    img = Image.open(a.image).convert('RGB')
    px = np.asarray(img)
    res = {'image': a.image, 'size': list(img.size), 'regions': [], 'contrast': [], 'clusters': []}
    for r in a.region:
        name, box = r.split('=', 1)
        x, y, w, h = [int(v) for v in box.split(',')]
        if w <= 0 or h <= 0 or x < 0 or y < 0 or x + w > img.width or y + h > img.height:
            sys.exit(f'region {name}={box} is not inside the {img.width}x{img.height} image')
        res['regions'].append(region_median(px, name, [x, y, w, h]))
    named = {r['name']: r['rgb'] for r in res['regions']}
    for pair in a.contrast:
        p, q = pair.split(':')
        if p not in named or q not in named:
            sys.exit(f'--contrast {pair}: name each side with a --region first')
        ratio = contrast(named[p], named[q])
        res['contrast'].append({'pair': [p, q], 'ratio': round(ratio, 2),
                                'AA_normal_4.5': ratio >= 4.5, 'AA_large_3': ratio >= 3})
    if a.clusters:
        res['clusters'] = clusters(px, a.clusters)
    json.dump(res, sys.stdout, indent=2)
    print()


if __name__ == '__main__':
    main()
