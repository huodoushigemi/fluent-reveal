import { useRafFn, useStopwatch } from "."

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
      sv = this.value
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