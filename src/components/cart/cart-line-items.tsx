'use client'
import CartLineItem from './cart-line-item'

export default function CartLineItems({ cartLineItems, products, onQuantityChange, isUpdating }) {
  // We need cart and products info on each line item
  // might also need product attributes...
  const compositeData = cartLineItems.reduce((acc, cur) => {
    const productInfo = products.filter((p) => p.RecordId === cur.ProductId)
    acc.push({ cartLine: cur, product: productInfo[0] })
    return acc
  }, [])

  console.log('compositeData', compositeData)

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
