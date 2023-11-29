export function useRafFn(cb: () => void) {
  let rafId = 0, looping = false
  const loop = () => (rafId = requestAnimationFrame(() => { raf.looping && (cb(), loop()) }))
  const raf = {
    resume() { looping || loop(); looping = true },
    pause() { looping = false; cancelAnimationFrame(rafId); rafId = 0 },
    get looping() { return looping }
  }
  return raf
}