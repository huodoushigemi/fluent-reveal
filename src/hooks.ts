export function useMouse(cb: (x: number, y: number) => void) {
  window?.addEventListener('mousemove', (e) => {
    cb(e.clientX, e.clientY)
  }, { passive: true })
}

export function useMousePressed(el: HTMLElement, onChange: (pressed: boolean) => void) {
  const pressed = { value: false }
  el.addEventListener('mousedown', () => onChange(pressed.value = true), { passive: true })
  el.addEventListener('mouseup', () => onChange(pressed.value = false), { passive: true })
  el.addEventListener('mouseleave', () => pressed.value && onChange(pressed.value = false), { passive: true })
  return pressed
}

export function useTransition(source: number, props: { duration: number, onTick?: (v: number, r: number) => void, onStarted?: () => void, onFinished?: () => void }) {
  const initial = source
  const sw = useStopwatch()
  const raf = useRafFn(() => {
    const r = ain.r
    ain.value = sv + (ev - sv) * r
    props.onTick?.(ain.value, r)
    if (r == 1) {
      pause()
      props.onFinished?.()
    }
  })
  const resume = () => { raf.resume(); sw.resume() }
  const pause = () => { raf.pause(); sw.pause() }
  // ========================================================================================
  let sv = 0, ev = 0, d = props.duration
  const ain = {
    value: source,
    get source() { return source },
    set source(val: number) {
      if (val == this.source) return
      sv = ain.value
      ev = source = val
      sw.reset()
      resume()
      props.onStarted?.()
    },
    get duration() { return d },
    set duration($d) { sw.value = this.r * (d = $d) },
    get tick() { return sw.value },
    set tick(i) { sw.value = i },
    get looping() { return raf.looping },
    get r() { const t = sw.value; return Math.min(1, t / Math.max(t, this.duration)) },
    resume,
    pause,
    start() {

    },
    reset() {
      ain.value = source = initial
      pause()
      sw.reset()
      props.onTick?.(ain.value, 0)
    }
  }
  return ain
}

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

export function useStopwatch() {
  let val = 0, lt = 0, looping = false
  const stopwatch = {
    get value() { return looping ? (val += -lt + (lt = +new Date)) : val },
    set value(v) { val = v },
    get looping() { return looping },
    resume() { stopwatch.value; lt = +new Date; looping = true },
    pause() { stopwatch.value; looping = false },
    reset() { looping = false; val = 0 }
  }
  return stopwatch
}