'use server'
import HttpClient from '@/HttpClient'


export async function updateCartAction(cartId: string, cartLine:{ LineId: string, Quantity: number}) {
  // ...
  const body = {
    cartLines: [cartLine],
    cartVersion: null
  }
  const res = await HttpClient(
    `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
    'POST',
    body
  )
  return res
}
