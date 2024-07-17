import CartLineItemSsr from './line-item'

import { Suspense } from 'react'
import { ExtendedCartItem } from '@/services/bh/cart/get-async-cart'

interface IProps {
  cartId: string
  cartLineItems: ExtendedCartItem[]
}



export default function LineItems({
  cartId,
  cartLineItems
}: Readonly<IProps>) {

  return (
    <ul>
      {cartLineItems.map((item) => (
        <Suspense
          fallback={<li className="border-b-2 my-5 pb-5"><p /></li>}
          key={item.id}
        >
          <CartLineItemSsr cartId={cartId} cartLine={item} />
        </Suspense>
      ))}
    </ul>
  )
}

// TODO: rename to cart-lines
