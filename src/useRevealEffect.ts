import { useMouse, useMousePressed, useTransition } from './hooks'
import { remove } from './util'
import { TinyColor } from '@ctrl/tinycolor'

import { darkProps, defProps, lightProps, prefixCls, RevealEffectProps } from './interface'
import './style.css'

const queueMicro = (fn: () => void) => queueMicrotask ? queueMicrotask(fn) : Promise.resolve().then(fn)
const computed = <T>(fn: () => T) => ({ get value() { return fn() } })
const until = <T extends Record<string, any>>(arr: (T | undefined)[], k: keyof T) => arr.find(e => e && k in e)?.[k]

// 边缘检测
function knock(px: number, py: number, rect: DOMRect, threshold = 0) {
  const x = px - rect.x
  const y = py - rect.y
  return x >= -threshold && x <= rect.width + threshold && y >= -threshold && y <= rect.height + threshold
}

// 鼠标位置
let px = -999, py = -999
useMouse((x, y) => {
  px = x
  py = y
  updateAll()
})

function updateAll() {
  list.forEach(e => e.update())
}

const list = <UseRevealEffect[]>[]

// =====================================================================================

export function setDefaultProps(props: RevealEffectProps) {
  Object.assign(defProps, props)
  updateAll()
}

// =====================================================================================

export type UseRevealEffect = ReturnType<typeof useRevealEffect>

export function useRevealEffect(el: HTMLElement, props = defProps) {
  const ins = { el, update, mount, unmount }

  // 按下
  const pressed = useMousePressed(el, async (val) => {
    !ain.looping && ain.reset()
    if (val) {
      ain.duration = 1000
      // ain.source = 1
      // ain.source = ain.looping ? 0 : 1
      ain.source = 0
    } else {
      ain.duration = 1000
      ain.source = 1
    }
  })

  // 点击效果 动画
  const ain = useTransition(0, {
    duration: 2000,
    // transition: [0, 0, 0.5, 0],
    onTick: (v, r) => (update(), console.log(r))
  })
  const gradient1 = [0, 25, 75]
  const gradient2 = [0, 75, 125]
  const gradient = computed(() => gradient2.map((e, i) => gradient1[i] + (e - gradient1[i]) * ain.value))

  let knockP = { x: 0, y: 0 }
  let knockBorder = false
  let showRG = false

  function update($props?: RevealEffectProps) {
    const $px = px, $py = py
    const rect = el.getBoundingClientRect()

    const colorModeProps = lightProps
    let _props = $props ? (props = { ...defProps, ...$props }) : props
    
    const bc = until([props, colorModeProps], 'borderColor')
    const bgc = until([props, colorModeProps], 'bgColor')

    // border
    if (_props.borderWidth && knock($px, $py, rect, _props.borderGradientSize)) {
      const x = $px - rect.x
      const y = $py - rect.y

      queueMicro(() => el.style.setProperty(`--xBorderImage`, `radial-gradient(${_props.borderGradientSize}px at ${x}px ${y}px, ${bc}, transparent) 1`))
      queueMicro(() => el.style.setProperty(`--xBorderWidth`, `${_props.borderWidth}px`))
      knockBorder = true
    } else if (knockBorder) {
      queueMicro(() => removeBorder())
      knockBorder = false
    }

    // background
    const knockBlock = knock($px, $py, rect)

    if ((knockBlock || ain.looping || pressed.value) && bgc) {
      const x = knockP.x - rect.x
      const y = knockP.y - rect.y

      // bgc
      if (knockBlock) {
        knockP = { x: $px, y: $py }
        queueMicro(() => el.style.setProperty(`--xRadialGradient`, `radial-gradient(${_props.bgGradientSize}px at ${x}px ${y}px, ${bgc}, transparent 100%)`))
      } else {
        queueMicro(() => el.style.removeProperty(`--xRadialGradient`))
      }

      // splash
      if (ain.looping && _props.clickEffect) {
        const low = 0.1
        const high = 1
        const tcolor = new TinyColor(bgc)
        const color = tcolor.setAlpha(tcolor.getAlpha() * (low + (high - low) * (1 - ain.value))).toHex8String()
        const splash = `radial-gradient(${_props.bgGradientSize}px at ${x}px ${y}px, transparent ${gradient.value[0]}%, ${color} ${gradient.value[1]}%, transparent ${gradient.value[2]}%)`
        queueMicro(() => el.style.setProperty(`--xSplash`, splash))
      } else {
        queueMicro(() => el.style.removeProperty(`--xSplash`))
      }

      showRG = true
    } else if (showRG) {
      queueMicro(() => removeBg())
      showRG = false
    }
  }

  function removeBg() {
    ;['xRadialGradient', 'xSplash'].forEach(e => {
      el.style.removeProperty(`--${e}`)
    })
  }
  function removeBorder() {
    ;['xBorderImage', 'xBorderWidth'].forEach(e => {
      el.style.removeProperty(`--${e}`)
    })
  }

  function mount() {
    list.includes(ins) || list.push(ins)
    el.classList.add(prefixCls)
  }
  function unmount() {
    removeBg()
    removeBorder()
    remove(list, ins)
    el.classList.remove(prefixCls)
  }

  mount()

  return ins
}