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