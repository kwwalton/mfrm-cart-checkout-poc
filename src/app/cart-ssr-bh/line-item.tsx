import { Suspense } from 'react'
import { ExtendedCartItem } from '@/services/bh/cart/get-async-cart'
import CartLineQuantitySsr from '@/components/cart/cart-line-quantity-ssr'
import CartLineDelivery from '@/components/cart/cart-line-delivery'



interface IProps {
  cartId: string
  cartLine: ExtendedCartItem
}


export default async function LineItem({
  cartId,
  cartLine
}: Readonly<IProps>) {
  const formattedPrice =  cartLine ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cartLine.variantPrice) : ""

  const res = cartLine.delivery();
  return (
    <li className="border-b-2 my-5 pb-5">
      <p>Line Item Id: {cartLine.id}</p>
      <p>Quantity: {cartLine.count}</p>
      <p>Product Record Id: {cartLine.variantId}</p>
      <p>
        <img src={cartLine.productImage} height={288} width={320} alt="product image" />
      </p>
      <p>{cartLine.productName}</p>
      <p>Shipping: {cartLine.categoryName}</p>
      <p>{formattedPrice}</p>
      <Suspense fallback={<CartLineDelivery />}>
        <CartLineDelivery
          deliveryInfo={res}
        />
      </Suspense>
      <CartLineQuantitySsr cartId={cartId} cartLine={{ LineId: cartLine.id, Quantity: cartLine.count }} />
    </li>
  )
}
