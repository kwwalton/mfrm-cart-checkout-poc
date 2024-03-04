import CartLineImage from "@/components/cart/cart-line-image"
import CartLineQuantitySsr from "./cart-line-quantity-ssr"
export default function CartLineItem({ cartLine, product }) {
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.Price)

  return (
    <li className="border-b-2 my-5 pb-5">
      <p>Line Item Id: {cartLine.ItemId}</p>
      <p>Quantity: {cartLine.Quantity}</p>
      <p>Product Record Id: {product.RecordId}</p>
      <CartLineImage src={product.PrimaryImageUrl} />
      <p>{product.Name}</p>
      <p>{formattedPrice}</p>
      <CartLineQuantitySsr cartLine={cartLine} />
    </li>
  )
}

// TODO: rename to cart-line
