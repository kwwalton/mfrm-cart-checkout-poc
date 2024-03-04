'use server'
import HttpClient from '@/HttpClient'

export async function updateQuantity(cartId, body) {
  const updatedCart = await HttpClient(
    `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
    'POST',
    body
  )
  return updatedCart
}
