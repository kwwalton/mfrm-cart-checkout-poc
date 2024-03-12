'use client'

import { cookies } from 'next/headers'
import CreateCart from '@/components/create-cart'
import GetCartFromServer from '@/components/get-cart'
import UseExistingCart from '@/components/use-existing-cart'
import { NextRequest } from 'next/server'
import CartLineItems from '@/components/cart/cart-line-items'
import HttpClient from '@/HttpClient'
import { updateQuantity } from '@/lib/actions'
import { useEffect, useState } from 'react'
import OrderSummary from '@/components/order-summary'
import Stepper from '@/components/stepper'
import { ICart, ICartLine, IUpdateQuantityPayload } from '@/types/cart'
import { IProduct, IProducts } from '@/types/product'

function getCookieValueOnClient(cookieName: string) {
  const decodedCookies = decodeURIComponent(document.cookie).split(';')
  let cookieValue = null
  for (let i = 0; i < decodedCookies.length; i++) {
    const keyAndValue = decodedCookies[i].trim().split('=')
    if (keyAndValue[0] === cookieName) {
      cookieValue = keyAndValue[1]
      break
    }
  }
  return cookieValue
}
async function getCartWithHttpClient(): Promise<ICart> {
  const cartId =
    getCookieValueOnClient('mfrm_poc_cart_t1_id') ||
    '79dd3d1d-8236-4a36-8451-bd7c67d40d72'
  return await HttpClient(`/Commerce/Carts('${cartId}')?api-version=7.3`)
}

async function getProductsByIdWithHttpClient(
  productIds: number[]
): Promise<IProducts> {
  const body = {
    channelId: 5637154326,
    productIds: productIds
  }
  return await HttpClient(
    '/Commerce/Products/GetByIds?$top=1000&api-version=7.3',
    'POST',
    body
  )
}

// async function updateQuantityWithHttpClient(cartId, body) {
//   const updatedCart = await HttpClient(
//     `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
//     'POST',
//     body
//   )
//   return updatedCart
// }

// async function getCart() {
//   let cart = {}
//   let myHeaders = new Headers()
//   myHeaders.append('Oun', 'E290017')
//   myHeaders.append('Content', 'application/json')
//   myHeaders.append(
//     'Origin',
//     'https://scu1qudx3s612095292-rs.su.retail.dynamics.com'
//   )

//   let requestOptions = {
//     method: 'GET',
//     headers: myHeaders
//   }

//   try {
//     const response = await fetch(
//       `https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Carts('79dd3d1d-8236-4a36-8451-bd7c67d40d72')`,
//       requestOptions
//     )
//     cart = await response.json()
//   } catch (error) {
//     console.log('Error:', error)
//   }
//   return cart
// }

// async function getProductsInCart(products) {
//   let myHeaders = new Headers()
//   myHeaders.append('Oun', 'E290017')
//   myHeaders.append('Content', 'application/json')
//   myHeaders.append(
//     'Origin',
//     'https://scu1qudx3s612095292-rs.su.retail.dynamics.com'
//   )

//   let requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: {
//       "channelId": 5637154326,
//       "productIds": products
//     }
//   }

//   try {
//     const response = await fetch(
//       `https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Products/GetByIds?$top=1000&api-version=7.3`,
//       requestOptions
//     )
//     cart = await response.json()
//   } catch (error) {
//     console.log('Error:', error)
//   }
//   return cart
// }

// If you call CRT from server, do not use the redirect trick, call the server directly
interface NextPageProps<SlugType = string> {
  params: { slug: SlugType }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function CartPage({ searchParams }: NextPageProps) {
  const [cart, setCart] = useState<ICart | null>(null)
  const [products, setProducts] = useState<IProducts | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  //const cookieStore = cookies()
  //const cartId = cookieStore.get('mfrm-poc-cartid')
  //const cart = await getCart();
  //console.log('cart', cart);
  // TODO: go through line items and get productId's and call for product info

  useEffect(() => {
    getCartWithHttpClient().then((res) => {
      const productIds = res.CartLines.map((cartLine) => cartLine.ProductId)
      setCart(res)
      getProductsByIdWithHttpClient(productIds).then((res) => setProducts(res))
    })
  }, [])

  // let cartycartcart = getCartWithHttpClient()
  // setCart(cartycartcart)
  // const productIds = cartycartcart.CartLines.map(cl => cl.ProductId);
  // const products =  use(getProductsByIdWithHttpClient(productIds));

  async function handleQuantityChange(
    body: IUpdateQuantityPayload
  ): Promise<void> {
    setIsUpdating(true)
    const updatedCart = await HttpClient(
      `/Commerce/Carts('${cart!.Id}')/UpdateCartLines?api-version=7.3`,
      'POST',
      body
    )
    setCart(updatedCart)
    setIsUpdating(false)
  }
  // async function handleQuantityChange(body) {
  //   cart = await updateQuantity(cart?.Id, body)
  // }

  return (
    <div>
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
          {cart && products && (
            <CartLineItems
              cartLineItems={cart.CartLines}
              products={products.value}
              onQuantityChange={handleQuantityChange}
              isUpdating={isUpdating}
            />
          )}
        </div>
        <div className="body__order-summary col-span-4 lg:col-span-1">
          {cart && <OrderSummary cart={cart} />}
        </div>
      </div>
    </div>
  )
}
