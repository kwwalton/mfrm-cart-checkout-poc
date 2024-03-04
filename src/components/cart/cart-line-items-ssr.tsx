import CartLineItemSsr from './cart-line-item-ssr'

export default function CartLineItemsSsr({ cartLineItems, products }) {
  // We need cart and products info on each line item
  // might also need product attributes...
  const compositeData = cartLineItems.reduce((acc, cur) => {
    const productInfo = products.filter((p) => p.RecordId === cur.ProductId)
    acc.push({ cartLine: cur, product: productInfo[0] })
    return acc
  }, [])

  return (
    <ul>
      {compositeData?.length &&
        compositeData.map((item) => (
          <CartLineItemSsr
            cartLine={item.cartLine}
            product={item.product}
            key={item.cartLine.itemId}
          />
        ))}
    </ul>
  )
}

// TODO: rename to cart-lines
