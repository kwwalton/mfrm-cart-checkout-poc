import { getBedhubClient } from '@/lib/bedhub-client'
import { lazyInit } from '@/utils/lazy-init'
import { GetCartOnlyDocument } from '@/gql/queries/getCartOnly.bedhub.generated'
import { GetCartDeliveryDocument } from '@/gql/queries/getCartDelivery.bedhub.generated'
import { Cart, CartItem } from '@/gql/__generated__/types'


type DeliveryInfo = {
  variantDelivery?: { end?: string, label?: string, start?: string }
  variantInMarket?: boolean
  variantInStock?: boolean
}

export interface ExtendedCartItem extends Omit<CartItem, 'variantDelivery' | 'variantInMarket' | 'variantInStock'> {
  delivery: () => Promise<DeliveryInfo>
}

export interface ExtendedCart extends Omit<Cart, 'items'> {
  items: ExtendedCartItem[]
}

export async function getAsyncCart(cartId: string, zipCode: string): Promise<ExtendedCart> {
  const client = getBedhubClient()
  console.timeLog('bh', 'start')
  const { data: cartOnly } = await client.query({
    query: GetCartOnlyDocument,
    variables: {
      cartId: cartId,
      zipCode: zipCode
    }
  })
  const cart = cartOnly.cart || {}
  console.timeLog('bh', 'requested')
  const { items = [], ...rest } = cart
  const deliveryCart = lazyInit(async () => {
    console.timeLog('bh', 'init')
    const res = await client.query({
      query: GetCartDeliveryDocument,
      variables: {
        cartId: cartId,
        zipCode: zipCode
      }
    })
    console.timeLog('bh', 'loaded')
    return res
  })
  const deliveryInfo = async (id: string): Promise<DeliveryInfo> => {
    const { data } = await deliveryCart()
    const line = data.cart.items.find(
      (item) => item.id === id
    )
    console.timeLog('bh', 'delivered', id)
    return {
      variantDelivery: line?.variantDelivery || {},
      variantInMarket: line?.variantInMarket || false,
      variantInStock: line?.variantInStock || false
    }
  }
  const extendedItems: ExtendedCartItem[] = items.map((item) => {
    return { ...item, delivery: () => deliveryInfo(item.id) }
  })
  return { ...rest, items: extendedItems }
}
