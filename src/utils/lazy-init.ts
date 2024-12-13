export function lazyInit<T>(fn: () => T): () => T {
  let prom: T | undefined = undefined
  return () => prom = (prom || fn())

}
