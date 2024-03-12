'use client'
import CartLineImage from './cart-line-image'
import CartLineQuantity from './cart-line-quantity'
import { ICartLine, IUpdateQuantityPayload } from '@/types/cart'
import { IProduct } from '@/types/product'
interface ICartLineItemProps {
  cartLine: ICartLine
  product: IProduct
  onQuantityChange: (body: IUpdateQuantityPayload) => {}
  isUpdating: boolean
}
export default function CartLineItem({
  cartLine,
  product,
  onQuantityChange,
  isUpdating
}: ICartLineItemProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.Price)

  return (
    <li className="border-b-2 my-5 pb-5">
      <p>Line Item Id: {cartLine.ItemId}</p>
      <p>Quantity: {cartLine.Quantity}</p>
      <p>Product Record Id: {product.RecordId}</p>
      <CartLineImage src={product.PrimaryImageUrl} />
      <p>{product.Name}</p>
      <p>{formattedPrice}</p>
      <CartLineQuantity
        cartLine={cartLine}
        onQuantityChange={onQuantityChange}
        isUpdating={isUpdating}
      />
    </li>
  )
}

// TODO: rename to cart-line
