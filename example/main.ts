import * as FluentReveal from '../src'

const app = document.querySelector('#app')

function Item(src: string, name: string) {
  return h('div', { className: 'item' }, [
    h('img', { src }),
    h('span', { className: 'name' }, name)
  ])
}

function h<K extends keyof HTMLElementTagNameMap, P extends Partial<HTMLElementTagNameMap[K]>>(tag: K, props?: P, children?: any[] | string) {
  const el = Object.assign(document.createElement(tag), props)
  if (Array.isArray(children)) el.replaceChildren(...children)
  if (typeof children == 'string') el.textContent = children
  return el
}

const modules = import.meta.glob('./assets/*', { eager: true })
console.log(modules);

for (const key in modules) {
  app?.append(Item(modules[key].default, key.replace(/(.*\/)*(.+?)\..+$/, '$2').replace('Microsoft-', '')))
}

FluentReveal
  .useObserver({ selector: '.item', borderWidth: 2, borderGradientSize: 60, borderColor: 'rgba(200, 200, 200, .4)', bgColor: 'rgba(200, 200, 200, .2)' })
  .observe()