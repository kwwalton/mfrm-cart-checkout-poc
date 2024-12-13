import { IProduct } from '@/types/product'
import CartLineImage from '@/components/cart/cart-line-image'

interface ICartLineProducSsrProps {
  product?: Promise<IProduct>
}

// TODO: rename to cart-line
export async function CartLineProductSsr({
 product
}: Readonly<ICartLineProducSsrProps>) {
  const p = await product
  const root = 'https://images-us-prod.cms.commerce.dynamics.com/cms/api/czjhmjzmzc/imageFileData/search?fileName=/'
  const imgUrl = p ? `${root}${(p.PrimaryImageUrl)}` : ''
  return <>
    <CartLineImage src={p?.PrimaryImageUrl || ''} />
    <p>{p?.Name || ''}</p>
  </>
}
