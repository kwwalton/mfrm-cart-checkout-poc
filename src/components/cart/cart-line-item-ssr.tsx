import CartLineImage from '@/components/cart/cart-line-image'
import CartLineQuantitySsr from './cart-line-quantity-ssr'
import { ICart, ICartLine } from '@/types/cart'
import { IProduct } from '@/types/product'
import HttpClient from '@/HttpClient'
import CartLineDelivery from './cart-line-delivery'
import { Suspense } from 'react'
import { getProductsById, getCart } from '@/app/cart-ssr/page'

interface ICartLineItemSsrProps {
  cartId: string
  cartLine: ICartLine
}

async function getAttributeValues(productId: number): Promise<any> {
  return await HttpClient(
    `/Commerce/Products(${productId})/GetAttributeValues(channelId=5637154326,catalogId=0)?$top=1000&api-version=7.3`
  )
}

export const getProductAndAttributes = async (
  cart: ICart,
  cartLine: ICartLine
) => {
  const productList = cart.CartLines.reduce((acc: number[], cur) => {
    acc.push(cur.ProductId)
    return acc
  }, [])

  const [products, attributes] = await Promise.all([
    getProductsById(productList),
    getAttributeValues(cartLine.ProductId)
  ])
  const product = products.value.find((x) => x.RecordId === cartLine.ProductId)
  return [product, attributes]
}

export default async function CartLineItemSsr({
  cartId,
  cartLine
}: Readonly<ICartLineItemSsrProps>) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cartLine.Price)

  const cart = await getCart(cartId)
  const [product, attributes] = await getProductAndAttributes(cart, cartLine)

  await new Promise((resolve) =>
    setTimeout(resolve, (Math.random() + 1) * 3000)
  )

  const returnValue = (
    <li className="border-b-2 my-5 pb-5">
      <p>Line Item Id: {cartLine.ItemId}</p>
      <p>Quantity: {cartLine.Quantity}</p>
      <p>Product Record Id: {product?.RecordId}</p>
      <CartLineImage src={product?.PrimaryImageUrl || ''} />
      <p>{product?.Name}</p>
      <p>{formattedPrice}</p>
      <p>Result: {attributes.value[0].Name}</p>
      <Suspense fallback={<p>Yury!!!!!</p>}>
        <CartLineDelivery
          productId={cartLine.ProductId}
          itemId={product?.ItemId || ''}
          quantity={cartLine.Quantity}
          shippingInformation={
            attributes.value.find(
              (x: { [x: string]: string }) =>
                x['Name'] === 'shippingInformation'
            ).TextValue
          }
        />
      </Suspense>
      <CartLineQuantitySsr cartId={cartId} cartLine={cartLine} />
    </li>
  )
  return returnValue
}

// TODO: rename to cart-line
