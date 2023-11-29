export function useMouse(cb: (x: number, y: number) => void) {
  window?.addEventListener('mousemove', (e) => {
    cb(e.clientX, e.clientY)
  }, { passive: true })
}