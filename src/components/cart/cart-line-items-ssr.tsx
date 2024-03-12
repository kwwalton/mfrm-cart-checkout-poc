import CartLineItemSsr from './cart-line-item-ssr'
import { ICartLine } from '@/types/cart'
import { IProduct } from '@/types/product'

interface ICartLineItemsSsrProps {
  cartId: string
  cartLineItems: ICartLine[]
  products: IProduct[]
}

interface ICompositeData {
  cartLine: ICartLine
  product: IProduct
}

export default function CartLineItemsSsr({
  cartId,
  cartLineItems,
  products
}: ICartLineItemsSsrProps) {
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
          <CartLineItemSsr
            cartId={cartId}
            cartLine={item.cartLine}
            product={item.product}
            key={item.cartLine.ItemId}
          />
        ))}
    </ul>
  )
}

// TODO: rename to cart-lines
