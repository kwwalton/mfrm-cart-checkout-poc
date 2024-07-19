import { getBedhubClient } from '@/lib/bedhub-client'
import { QuickCartDocument } from '@/gql/queries/getQuickCart.bedhub.generated'
import { Cart, CartItem } from '@/gql/__generated__/types'


export async function getQuickCart(cartId: string, zipCode: string): Promise<DelayedCart> {
  console.time('getQuickCart')
  const client = getBedhubClient()
  const watch = client.watchQuery({
    query: QuickCartDocument,
    variables: {
      cartId: cartId,
      zipCode: zipCode
    }
  })
  const [delayItems, completeItems] = delayed<DelayedCartItem[]>()
  const [delayDelivery, completeDelivery] = delayed<DelayDelivery[]>()
  const result = new Promise<DelayedCart>((resolve, reject) => {
    let itemsLoaded = false
    let deliveryLoaded = false
    watch.subscribe((val) => {
      console.log('iterate', val)
      const { data } = val
      if (data.cart) {
        console.timeLog('getQuickCart', 'Cart', data.cart.items?.length)
        const delayedCart: DelayedCart = { ...data.cart, items: delayItems }
        resolve(delayedCart)
        if (data.cart.items) {
          if (!itemsLoaded) {
            itemsLoaded = true
            const itemsWithDelivery: DelayedCartItem[] = data.cart.items.map((item, i) => {
              return {
                ...item,
                variantDelivery: delayDelivery.then(d => {
                  console.log('delivery item', d)
                  return d[i]?.variantDelivery || null
                }),
                variantInMarket: delayDelivery.then(d => d[i]?.variantInMarket || false),
                variantInStock: delayDelivery.then(d => d[i]?.variantInStock || false)
              }
            })
            completeItems(itemsWithDelivery)
          }
          //Eliminate undefined, to make sure the data is complete
          if (!data.cart.items.some(i => [i.variantInMarket, i.variantInStock, i.variantDelivery].includes(undefined))) {
            if (!deliveryLoaded) {
              deliveryLoaded = true
              const deliveryItems: DelayDelivery[] = data.cart.items.map(i => {
                return {
                  variantInMarket: i.variantInMarket!,
                  variantInStock: i.variantInStock!,
                  variantDelivery: i.variantDelivery!
                }
              })
              console.log('delivery item - done', deliveryItems)
              completeDelivery(deliveryItems)
            } else {
              console.log('delivery item - loaded', data.cart.items.map(i => i.variantInMarket))
            }
          } else {
            console.log('delivery item - miss', data.cart.items.map(i => i.variantInMarket))
          }
        }
      } else {
        console.log('Cart - Empty iteration', data.cart)
      }
    })

  })

  return result
}

type Promisable<T> = {
  readonly [P in keyof T]: Promise<T[P]>;
};

type Prms<T> = {
  readonly [P in keyof T]: T extends undefined ? Promise<T[P]> : T[P];
};
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type RecursivePrms<T> = {
  [P in keyof T]?:
  T[P] extends undefined ? Promise<T[P]> :
    T[P] extends (infer U)[] ? RecursivePrms<U>[] :
      T[P] extends object ? RecursivePrms<T[P]> :
        Prms<T[P]>;
};

interface DelayedCart extends Omit<Cart, 'items'> {
  items: Promise<DelayedCartItem[]>
}

interface DelayDelivery extends Pick<CartItem, 'variantDelivery' | 'variantInMarket' | 'variantInStock'> {
}

interface PromisableDelivery extends Promisable<DelayDelivery> {
}

interface DelayedCartItem extends PromisableDelivery, Omit<CartItem, 'variantDelivery' | 'variantInMarket' | 'variantInStock'> {
}


function delayed<T>(timeout: number = 1000): [Promise<T>, (r: T) => void, (a: any) => void] {
  let resolve: (r: T) => void
  let reject: (a: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej

    //FIXME: Doesn't work
    setTimeout(() => {
      console.error('Timeout on promise')
      rej('TIMEOUT')
    }, timeout)
  })


  // @ts-ignore
  return [promise, resolve, reject]
}
