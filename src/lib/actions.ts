'use server'
import HttpClient from '@/HttpClient'
import { IUpdateQuantityPayload } from '@/types/cart'
import { revalidatePath } from 'next/cache'

export async function updateQuantity(cartId: string, body: IUpdateQuantityPayload) {
  const updatedCart = await HttpClient(
    `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
    'POST',
    body
  )
  return updatedCart
}

export  async function addCouponToCart(couponToAdd: string, cartId: string) {
  try {
    await HttpClient(
      `/Commerce/Carts('${cartId}')/AddDiscountCode?api-version=7.3`,
      'POST',
      { discountCode: couponToAdd }
    )
    revalidatePath('/cart-ssr-coupons')
  } catch (error) {
    console.log('Oh no', error)
  }
}

export  async function removeCouponFromCart(couponToRemove: string, cartId: string) {
  try {
    await HttpClient(
      `/Commerce/Carts('${cartId}')/RemoveDiscountCodes?api-version=7.3`,
      'POST',
      { discountCodes: [couponToRemove] }
    )
    revalidatePath('/cart-ssr-coupons')
  } catch (error) {
    console.log('Oh no', error)
  }
}

