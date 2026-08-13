import assert from "node:assert/strict";
import test from "node:test";

import {
  coverageIndex,
  interpolate,
  sceneReveal,
} from "../components/story/sceneTransforms";

const TOTAL = 4; // Research, Projects, Leadership, Values

function opacityAt(index: number, progress: number): number {
  const { input, opacity } = sceneReveal(index, TOTAL);
  return interpolate(input, opacity, progress);
}

function yAt(index: number, progress: number): number {
  const { input, y } = sceneReveal(index, TOTAL);
  return interpolate(input, y, progress);
}

function sweep(step = 0.001): number[] {
  const points: number[] = [];
  for (let p = 0; p <= 1 + 1e-9; p += step) points.push(Math.min(1, p));
  return points;
}

test("reveal inputs stay within [0,1] and strictly increase", () => {
  // framer's accelerated animation path rejects out-of-range / non-monotonic
  // keyframe offsets (that bug once blanked the whole story).
  for (let i = 0; i < TOTAL; i += 1) {
    const { input } = sceneReveal(i, TOTAL);
    for (let k = 0; k < input.length; k += 1) {
      assert.ok(input[k] >= 0 && input[k] <= 1, `scene ${i} input[${k}] in range`);
      if (k > 0) {
        assert.ok(input[k] > input[k - 1], `scene ${i} input strictly increases at ${k}`);
      }
    }
  }
});

test("at most one scene is ever visible — never two at once (no see-through)", () => {
  // The reported bug was two scenes overlapping translucently. With sequenced
  // reveals only one scene is on screen at any scroll position, so a previous
  // scene can never be seen behind the current one.
  for (const p of sweep()) {
    const visible = Array.from({ length: TOTAL }, (_, i) => opacityAt(i, p)).filter(
      (o) => o > 0.01,
    );
    assert.ok(
      visible.length <= 1,
      `two scenes visible at progress ${p.toFixed(3)}: [${visible.map((v) => v.toFixed(2))}]`,
    );
  }
});

test("each scene spins in to full at its centre", () => {
  for (let i = 0; i < TOTAL; i += 1) {
    const center = (i + 0.5) / TOTAL;
    assert.equal(opacityAt(i, center), 1, `scene ${i} should be fully shown at its centre`);
  }
});

test("scenes spin in from nothing; the last scene holds to the end", () => {
  assert.equal(opacityAt(0, 0), 0, "first scene spins in rather than popping in");
  assert.equal(opacityAt(TOTAL - 1, 1), 1, "last scene stays put as the pin ends");
  // Every non-final scene spins fully out by the end of its segment.
  for (let i = 0; i < TOTAL - 1; i += 1) {
    const segEnd = (i + 1) / TOTAL;
    assert.equal(opacityAt(i, segEnd), 0, `scene ${i} should be gone by its segment end`);
  }
});

test("scenes rotate in from above and exit downward as you scroll past", () => {
  // The pinwheel-on-its-side feel: content arrives from above (negative y) and,
  // for every non-final scene, leaves downward (positive y) rather than drifting
  // up. Motion is monotonic downward through the scene's life.
  for (let i = 0; i < TOTAL; i += 1) {
    const segStart = i / TOTAL;
    assert.ok(yAt(i, segStart) < 0, `scene ${i} should enter from above`);
    if (i < TOTAL - 1) {
      const segEnd = (i + 1) / TOTAL;
      assert.ok(yAt(i, segEnd) > 0, `scene ${i} should exit downward`);
    }
  }
});

test("coverage index is correct, in range, and never moves backwards", () => {
  for (let i = 0; i < TOTAL; i += 1) {
    const center = (i + 0.5) / TOTAL;
    assert.equal(coverageIndex(center, TOTAL), i, `scene ${i} owns its centre`);
  }
  let prev = 0;
  for (const p of sweep()) {
    const c = coverageIndex(p, TOTAL);
    assert.ok(c >= 0 && c <= TOTAL - 1, `coverage out of range at ${p.toFixed(3)}`);
    assert.ok(c >= prev, `coverage moved backwards at progress ${p.toFixed(3)}`);
    prev = c;
  }
});
