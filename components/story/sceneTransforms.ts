/**
 * Pure math for the pinned story transition. Kept framework-free so it can be
 * unit-tested: `StorySceneLayer` feeds these keyframes straight into framer's
 * `useTransform`, and `interpolate` mirrors framer's clamped linear mapping.
 *
 * Each scene's content spins in (scale + rise + tilt + fade), holds, then spins
 * out — but the scenes are SEQUENCED: a scene reaches opacity 0 before the next
 * rises above 0, so only one scene is ever visible at a time. Over one shared
 * opaque background that means no previous scene can ever show through the
 * current one (the reported see-through), while every scene still animates in.
 */

export interface SceneReveal {
  /** Scroll-progress stops (within [0,1], strictly increasing). */
  input: number[];
  opacity: number[];
  scale: number[];
  y: number[];
  rotateX: number[];
}

/**
 * Reveal keyframes for a scene across the overall [0,1] scroll. The scene owns
 * the segment [index/total, (index+1)/total]: it spins in over the first slice,
 * holds through the middle, and spins out over the last slice (the final scene
 * holds instead of spinning out, so it stays put as the pin ends). Inputs stay
 * inside [0,1] and strictly increase, which framer's accelerated path requires.
 */
export function sceneReveal(index: number, total: number): SceneReveal {
  const segment = 1 / total;
  const enter = segment * 0.18;
  const exit = segment * 0.18;
  const segStart = index * segment;
  const segEnd = (index + 1) * segment;
  const isLast = index === total - 1;

  // Reads like facing a pinwheel turning on its side: a scene rotates in from
  // above (tilted, lifted), faces you flat at the centre, then — as you scroll
  // past it — keeps rotating the same way, dropping DOWN and tilting away. The
  // final scene holds instead of rotating out.
  return {
    input: [segStart, segStart + enter, segEnd - exit, segEnd],
    opacity: [0, 1, 1, isLast ? 1 : 0],
    scale: [0.9, 1, 1, isLast ? 1 : 0.9],
    y: [-60, 0, 0, isLast ? 0 : 60],
    rotateX: [14, 0, 0, isLast ? 0 : -14],
  };
}

/**
 * The scene that currently owns the screen — used to keep only the visible
 * scene interactive (others are inert underneath).
 */
export function coverageIndex(progress: number, total: number): number {
  return Math.min(total - 1, Math.max(0, Math.floor(progress * total + 1e-9)));
}

/**
 * Clamped piecewise-linear interpolation, matching framer-motion's default
 * `useTransform` behaviour (values outside the input range clamp to the ends).
 */
export function interpolate(input: number[], output: number[], t: number): number {
  const last = input.length - 1;
  if (t <= input[0]) return output[0];
  if (t >= input[last]) return output[last];

  for (let i = 1; i <= last; i += 1) {
    if (t <= input[i]) {
      const span = input[i] - input[i - 1];
      const fraction = span === 0 ? 0 : (t - input[i - 1]) / span;
      return output[i - 1] + fraction * (output[i] - output[i - 1]);
    }
  }

  return output[last];
}
