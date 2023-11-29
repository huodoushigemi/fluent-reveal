export const prefixCls = `fluent-reveal`

export const defProps = {
  borderColor: 'rgba(100, 100, 100, .4)',
  bgColor: 'rgba(100, 100, 100, .2)',
  borderWidth: 1,
  borderGradientSize: 100,
  bgGradientSize: 130,
  clickEffect: true,
  disabled: false
}

export type RevealEffectProps = Partial<typeof defProps>

export const observeProps = {
  /**@default document */
  root: document as ParentNode | string,
  /**@default '.fluent-reveal' */
  selector: '.' + prefixCls,
}

export type ObserveProps = Partial<typeof observeProps> & RevealEffectProps