import CartLineItemSsr from './cart-line-item-ssr'
import { ICartLine } from '@/types/cart'
//import { IProduct } from '@/types/product'
import { Suspense } from 'react'
import { ICartItemLine } from '@/services/csu/cart/get-async-cart'

interface ICartLineItemsSsrProps {
  cartId: string
  cartLineItems: ICartItemLine[]
  //products: IProduct[]
}

// interface ICompositeData {
//   cartLine: ICartLine
//   product: IProduct
// }

export default function CartLineItemsSsr({
  cartId,
  cartLineItems
}: Readonly<ICartLineItemsSsrProps>) {
  // We need cart and products info on each line item
  // might also need product attributes...
  // const compositeData = cartLineItems.reduce((acc: ICompositeData[], cur) => {
  //   const productInfo = products.filter((p) => p.RecordId === cur.ProductId)
  //   acc.push({ cartLine: cur, product: productInfo[0] })
  //   return acc
  // }, [])

  return (
    <ul>
      {cartLineItems.map((item) => (
        <Suspense
          fallback={<li className="border-b-2 my-5 pb-5"><p /></li>}
          key={item.LineId}
        >
          <CartLineItemSsr cartId={cartId} cartLine={item} />
        </Suspense>
      ))}
    </ul>
  )
}

// TODO: rename to cart-lines
