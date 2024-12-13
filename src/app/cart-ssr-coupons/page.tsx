import { cookies } from 'next/headers'
import OrderSummaryCartSsr from '@/components/order-summary-cart-ssr'
import CartLineItemsSsr from '@/components/cart/cart-line-items-ssr'
import Stepper from '@/components/stepper'
import { getAsyncCart } from '@/services/csu/cart/get-async-cart'

// TODO: put shared/duplicated methods into a separate file and import
// a copy is also in cart-line-item-ssr because builds do not work with exports that do not match a next page type

// a copy is also in cart-line-item-ssr because builds do not work with exports that do not match a next page type
interface NextPageProps<SlugType = string> {
  params: { slug: SlugType }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CartPageSsr({ searchParams }: NextPageProps) {
  const cookieStore = cookies()
  const cartId =
    cookieStore.get('mfrm_poc_cart_t1_id')?.value ||
    '79dd3d1d-8236-4a36-8451-bd7c67d40d72'
  //const { cart, products } = await cartWithProduct(cartId)
  const cart = await getAsyncCart(cartId,  '06095')
  const returnValue = <div>
  <div className="header grid grid-cols-4 lg:grid-cols-4 gap-4">
    <div className="header__head col-span-4 lg:col-span-3">
      <h1 className="text-lg font-bold">Shopping Cart</h1>
      <p>Cart Id: {searchParams?.id}</p>
      <p>Cart Id from server: {cart?.Id ?? `Loading...`}</p>
    </div>
    <div className="header__stepper col-span-4 lg:col-span-1">
      <Stepper />
    </div>
  </div>
  <div className="body grid grid-cols-4 lg:grid-cols-4 gap-4">
    <div className="body__cart-items col-span-4 lg:col-span-3">
        <CartLineItemsSsr
          cartId={cartId}
          cartLineItems={cart.CartLines}
        />
    </div>
    <div className="body__order-summary col-span-4 lg:col-span-1">
      {cart && <OrderSummaryCartSsr cart={cart} />}
    </div>
  </div>
</div>
  return returnValue
}
