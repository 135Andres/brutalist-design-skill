#!/usr/bin/env python3
"""Derived measurements not covered by the skill's scripts: badge text rotation (principal
axis of its ink pixels) and marquee rhythm (red dot centers, text runs, cut at the edge).
Run from the repository root; prints what measure/derived.txt holds."""
import numpy as np
from PIL import Image
px = np.asarray(Image.open('examples/references/ref-a-concrete-radio.png').convert('RGB')).astype(float)
def near(p, c, t): return np.sqrt(((p - np.array(c)) ** 2).sum(-1)) <= t
crop = px[110:210, 720:840]; m = near(crop, (18, 18, 18), 40); ys, xs = np.nonzero(m)
X = np.stack([xs - xs.mean(), ys - ys.mean()]); w, v = np.linalg.eigh(np.cov(X)); ax = v[:, np.argmax(w)]
ang = np.degrees(np.arctan2(ax[1], ax[0])); ang = ang - 180 if ang > 90 else (ang + 180 if ang < -90 else ang)
print(f'LIVE principal-axis angle: {ang:.1f} deg (negative = counter-clockwise), ink pixels {m.sum()}')
band = px[0:44]; r = near(band, (255, 59, 31), 60).any(axis=0)
xs = np.nonzero(r)[0]; groups = np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1)
centers = [round(float(g.mean()), 1) for g in groups]; print('marquee red dot centers x:', centers)
print('gaps between dots:', [round(b - a, 1) for a, b in zip(centers, centers[1:])])
t = near(band[12:34], (216, 213, 204), 40).any(axis=0); xs = np.nonzero(t)[0]
g = np.split(xs, np.nonzero(np.diff(xs) > 20)[0] + 1); print('marquee text runs (x0,x1):', [(int(a[0]), int(a[-1])) for a in g])
print('text ink touching right edge:', bool(near(band[12:34, 1437:1440], (216, 213, 204), 40).any()))
