export function remove<T>(arr: T[], e: T) {
  const i = arr.indexOf(e)
  ~i && arr.splice(i, 1)
}