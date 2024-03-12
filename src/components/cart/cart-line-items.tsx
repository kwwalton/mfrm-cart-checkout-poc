'use client'
import CartLineItem from './cart-line-item'
import { ICartLine, IUpdateQuantityPayload } from '@/types/cart'
import { IProduct } from '@/types/product'

interface ICartLineItemsProps {
  cartLineItems: ICartLine[]
  products: IProduct[]
  onQuantityChange: (body: IUpdateQuantityPayload) => {}
  isUpdating: boolean
}

interface ICompositeData {
  cartLine: ICartLine
  product: IProduct
}

export default function CartLineItems({
  cartLineItems,
  products,
  onQuantityChange,
  isUpdating
}: ICartLineItemsProps) {
  // We need cart and products info on each line item
  // might also need product attributes...
  const compositeData = cartLineItems.reduce((acc: ICompositeData[], cur) => {
    const productInfo = products.filter((p) => p.RecordId === cur.ProductId)
    acc.push({ cartLine: cur, product: productInfo[0] })
    return acc
  }, [])

  return (
    <ul>
      {compositeData?.length &&
        compositeData.map((item) => (
          <CartLineItem
            key={item.cartLine.ItemId}
            cartLine={item.cartLine}
            product={item.product}
            onQuantityChange={onQuantityChange}
            isUpdating={isUpdating}
          />
        ))}
    </ul>
  )
}

// TODO: rename to cart-lines
