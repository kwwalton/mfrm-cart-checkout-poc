import CartLineQuantitySsr from './cart-line-quantity-ssr'
import CartLineDelivery from './cart-line-delivery'
import { Suspense } from 'react'
import { ICartItemLine } from '@/services/csu/cart/get-async-cart'
import { CartLineProductSsr } from '@/components/cart/cart-line-product-ssr'


interface ICartLineItemSsrProps {
  cartId: string
  cartLine: ICartItemLine
}


export default async function CartLineItemSsr({
  cartId,
  cartLine
}: Readonly<ICartLineItemSsrProps>) {
  const formattedPrice =  cartLine ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cartLine.Price) : ""

  const product  = cartLine.product
  const shipping = cartLine.shipping
  const res = cartLine.delivery;
  return (
    <li className="border-b-2 my-5 pb-5">
      <p>Line Item Id: {cartLine.ItemId}</p>
      <p>Quantity: {cartLine.Quantity}</p>
      <p>Product Record Id: {cartLine.ProductId}</p>
      <Suspense fallback={<CartLineProductSsr />}>
        <CartLineProductSsr product={product} />
      </Suspense>
      <Suspense fallback={<p>....</p>}>
        <p>Shipping: {shipping}</p>
      </Suspense>
      <p>{formattedPrice}</p>
      <Suspense fallback={<CartLineDelivery />}>
        <CartLineDelivery
          deliveryInfo={res}
        />
      </Suspense>
      <CartLineQuantitySsr cartId={cartId} cartLine={cartLine} />
    </li>
  )
}
