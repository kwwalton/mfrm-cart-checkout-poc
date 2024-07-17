import { cookies } from 'next/headers'
import Stepper from '@/components/stepper'
import { getAsyncCart } from '@/services/bh/cart/get-async-cart'
import LineItems from '@/app/cart-ssr-bh/line-items'
import Summary from '@/app/cart-ssr-bh/summary'

interface Props<SlugType = string> {
  params: { slug: SlugType }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CartPageSsr({ searchParams }: Props) {
  console.timeEnd('bh');
  const cookieStore = cookies()
  const cartId =
    cookieStore.get('mfrm_poc_cart_t1_id')?.value ||
    '79dd3d1d-8236-4a36-8451-bd7c67d40d72'
  try {
    console.time('bh')
    const cart = await getAsyncCart(cartId, '06095')
    if (!cart?.items?.length) {
      return <>Empty cart id:{cartId}</>
    }
    console.timeLog('bh', 'render')
    return <div>
      <div className="header grid grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="header__head col-span-4 lg:col-span-3">
          <h1 className="text-lg font-bold">Shopping Cart</h1>
          <p>Cart Id: {searchParams?.id}</p>
          <p>Cart Id from server: {cart.id ?? `Loading...`}</p>
        </div>
        <div className="header__stepper col-span-4 lg:col-span-1">
          <Stepper />
        </div>
      </div>
      <div className="body grid grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="body__cart-items col-span-4 lg:col-span-3">
          <LineItems
            cartId={cartId}
            cartLineItems={cart.items}
          />
        </div>
        <div className="body__order-summary col-span-4 lg:col-span-1">
          <Summary cart={cart} />
        </div>
      </div>
    </div>
  } catch( e ) {
    return <>Error: {e}</>
  }finally {
    console.timeLog('bh', 'finaly')
  }
}
