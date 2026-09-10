export const HOME_SECTION_SNAP_MS = 900;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function animateScrollTop(
  el: HTMLElement,
  top: number,
  duration = HOME_SECTION_SNAP_MS,
) {
  const from = el.scrollTop;
  const delta = top - from;
  if (Math.abs(delta) < 1) return Promise.resolve();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollTop = top;
    return Promise.resolve();
  }

  const previousSnap = el.style.scrollSnapType;
  el.style.scrollSnapType = "none";
  const start = performance.now();

  return new Promise<void>((resolve) => {
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.scrollTop = from + delta * easeInOutCubic(t);
      if (t < 1) {
        requestAnimationFrame(tick);
        return;
      }
      el.scrollTop = top;
      el.style.scrollSnapType = previousSnap;
      resolve();
    };
    requestAnimationFrame(tick);
  });
}
