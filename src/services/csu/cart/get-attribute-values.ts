import HttpClient from '@/HttpClient'

export async function getAttributeValues(productId: number): Promise<any> {
  return await HttpClient(
    `/Commerce/Products(${productId})/GetAttributeValues(channelId=5637154326,catalogId=0)?$top=1000&api-version=7.3`
  )
}
