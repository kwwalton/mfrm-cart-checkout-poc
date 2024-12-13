export function delayed<T>(timeout: number = 20000): [Promise<T>, (r: T) => void, (a: any) => void] {
  let resolve: (r: T) => void
  let reject: (a: any) => void
  const promise = new Promise<T>((res, rej) => {
    const to = setTimeout(() => {
      console.error('Timeout on promise')
      rej('TIMEOUT')
    }, timeout)
    resolve = (r: T) => {
      res(r)
      console.debug('Resolve', JSON.stringify(r).substring(0, 20))
      clearTimeout(to)
    }
    reject = (a: any) => {
      console.debug('Reject', JSON.stringify(a).substring(0, 20))
      rej(a)
      clearTimeout(to)
    }

    //FIXME: Doesn't work
  })

  // @ts-ignore
  return [promise, resolve, reject]
}
