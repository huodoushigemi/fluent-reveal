export const prefixCls = `fluent-reveal`

export const lightProps = {
  borderColor: 'rgba(200, 200, 200, .4)',
  bgColor: 'rgba(200, 200, 200, .2)'
}

export const darkProps = {
  borderColor: 'rgba(100, 100, 100, .4)',
  bgColor: 'rgba(100, 100, 100, .2)'
}

export const defProps = {
  ...darkProps,
  borderWidth: 1,
  borderGradientSize: 100,
  bgGradientSize: 130,
  clickEffect: true,
  disabled: false
}

export type RevealEffectProps = Partial<typeof defProps>