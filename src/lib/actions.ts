'use server'
import HttpClient from '@/HttpClient'
import { IUpdateQuantityPayload } from '@/types/cart'

export async function updateQuantity(cartId: string, body: IUpdateQuantityPayload) {
  const updatedCart = await HttpClient(
    `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
    'POST',
    body
  )
  return updatedCart
}
