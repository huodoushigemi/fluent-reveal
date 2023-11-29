import { ObserveProps, RevealEffectProps, observeProps } from "./interface"
import { UseRevealEffect, useRevealEffect } from "./useRevealEffect"

const map = new WeakMap<Element, UseRevealEffect>()

function unmount(el: Element) {
  if (map.has(el)) {
    map.get(el)!.unmount()
    map.delete(el)
  }
}

function mount(el: Element, props: RevealEffectProps) {
  !map.has(el) && map.set(el, useRevealEffect(el as HTMLElement, props))
}

export function useObserver(opt: ObserveProps) {
  opt =  { ...observeProps, ...opt }
  const root = (typeof opt.root == 'string' ? document.querySelector(opt.root) : opt.root) || document
  const { selector } = opt as Required<ObserveProps>

  let list: Set<Element>

  const obs = new MutationObserver((arr) => {
    const set = new Set(root.querySelectorAll(selector))
    list.forEach(e => !set.has(e) && unmount(e))
    set.forEach(e => !list.has(e) && mount(e, opt))

    list = set
    obs.takeRecords()
  })

  function observe() {
    disconnect()
    list = new Set(root.querySelectorAll(selector))
    list.forEach(e => mount(e, opt))
    obs.observe(root, { subtree: true, attributeFilter: ['class'] })
  }
  
  function disconnect() {
    obs.disconnect()
    list?.forEach(e => unmount(e))
    root.querySelectorAll(selector).forEach(e => unmount(e))
    list = undefined as any
  }

  return {
    observe,
    disconnect
  }
}