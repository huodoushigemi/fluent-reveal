import { prefixCls } from "./interface"
import { UseRevealEffect, useRevealEffect } from "./useRevealEffect"

const map = new WeakMap<HTMLElement, UseRevealEffect>()

function aaa(el: HTMLElement) {
  if (el.classList.contains(prefixCls)) {
    !map.has(el) && map.set(el, useRevealEffect(el))
  } else {
    if (map.has(el)) {
      map.get(el)!.unmount()
      map.delete(el)
    }
  }
}

document.querySelectorAll('.' + prefixCls).forEach(e => {
  aaa(e as HTMLElement)
})

new MutationObserver((arr) => {
  arr.forEach(e => {
    aaa(e.target as HTMLElement)
  })
}).observe(document.body, { subtree: true, attributeFilter: ['class'] })
