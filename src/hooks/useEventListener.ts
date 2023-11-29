export function useEventListener(el: Element, ...args: Parameters<Element['addEventListener']>) {
  const enable = () => el.addEventListener(...args)
  enable()
  return { cleaup: () => el.removeEventListener(args[0], args[1]), enable }
}