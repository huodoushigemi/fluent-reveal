function h<K extends keyof HTMLElementTagNameMap>(tag: K, props?: Partial<HTMLElementTagNameMap[K]>) {
  const el = Object.assign(document.createElement(tag), props)
  return el
}

class Card extends HTMLElement {
  constructor() {
    super()

    const root = this.attachShadow({ mode: 'open' })
    root.appendChild(h('slot'))
    root.appendChild(h('slot', { name: 'info' }))
  }

  connectedCallback() {

  }

  disconnectedCallback() {
    
  }
}

customElements.define('wc-card', Card)