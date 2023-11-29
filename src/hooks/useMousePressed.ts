import { useEventListener } from "."

export function useMousePressed(el: Element, onChange: (pressed: boolean) => void) {
  const ev1 = useEventListener(el, 'mousedown', () => onChange(pressed.value = true), { passive: true })
  const ev2 = useEventListener(el, 'mouseup', () => onChange(pressed.value = false), { passive: true })
  const ev3 = useEventListener(el, 'mouseleave', () => pressed.value && onChange(pressed.value = false), { passive: true })
  const disable = () => (ev1.cleaup(), ev2.cleaup(), ev3.cleaup())
  const enable = () => (ev1.enable(), ev2.enable(), ev3.enable())
  const pressed = { value: false, disable, enable }
  return pressed
}