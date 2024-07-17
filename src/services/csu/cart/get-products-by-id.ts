// duplicated from cart page
import { IProducts } from '@/types/product'
import HttpClient from '@/HttpClient'

export async function getProductsById(products: number[]): Promise<IProducts> {
  const body = {
    channelId: 5637154326,
    productIds: products
  }
  return await HttpClient(
    '/Commerce/Products/GetByIds?$top=1000&api-version=7.3',
    'POST',
    body
  )
}
