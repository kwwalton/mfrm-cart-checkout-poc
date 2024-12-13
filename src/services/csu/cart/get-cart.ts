import { ICart } from '@/types/cart'
import HttpClient from '@/HttpClient'


export async function getCart(cartId: string): Promise<ICart> {
  return await HttpClient(`/Commerce/Carts('${cartId}')?api-version=7.3`)
}
