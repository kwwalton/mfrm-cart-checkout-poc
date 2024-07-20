import { getBedhubClient } from '@/lib/bedhub-client'
import { QuickCartDocument } from '@/gql/queries/getQuickCart.bedhub.generated'
import { Cart, CartItem } from '@/gql/__generated__/types'
import { delayed } from '@/utils/delayed'


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
  const [delayCart, completeCart] = delayed<DelayedCart>()
  const [delayItems, completeItems] = delayed<DelayedCartItem[]>()
  const [delayDelivery, completeDelivery] = delayed<DelayDelivery[]>()
  watch.subscribe((val) => {
    const { data } = val
    if (data.cart) {
      console.timeLog('getQuickCart', '-')
      const delayedCart: DelayedCart = { ...data.cart, items: delayItems }
      console.timeLog('getQuickCart', 'Cart', data.cart.count)
      completeCart(delayedCart)
      //If Items are delivered resolved them
      if (data.cart.items) {
        const itemsWithDelivery: DelayedCartItem[] = data.cart.items.map((item, i) => {
          return {
            ...item,
            variantDelivery: delayDelivery.then(d => d[i]?.variantDelivery || null),
            variantInMarket: delayDelivery.then(d => d[i]?.variantInMarket || false),
            variantInStock: delayDelivery.then(d => d[i]?.variantInStock || false)
          }
        })
        console.timeLog('getQuickCart', 'Item', data.cart.items?.length)
        completeItems(itemsWithDelivery)
        //Eliminate undefined, to make sure the data is complete - ItemDelivery fragment
        if (!data.cart.items.some(i => [i.variantInMarket, i.variantInStock, i.variantDelivery].includes(undefined))) {
          const deliveryItems: DelayDelivery[] = data.cart.items.map(i => {
            return {
              variantInMarket: i.variantInMarket!,
              variantInStock: i.variantInStock!,
              variantDelivery: i.variantDelivery!
            }
          })
          console.timeLog('getQuickCart', 'Delivery', data.cart.items?.length)
          completeDelivery(deliveryItems)
        }
      }
    }
  })
  return delayCart
}

type Promisable<T> = {
  readonly [P in keyof T]: Promise<T[P]>;
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
