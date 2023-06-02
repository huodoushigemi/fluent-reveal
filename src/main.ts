import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import './observe.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="xxx">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </div>
    <div href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </div>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

document.querySelector('#xxx').className = 'fluent-reveal'