import { ICart, ICartLine } from '@/types/cart'
import { IProduct } from '@/types/product'
import { getProductsById } from '@/services/csu/cart/get-products-by-id'
import { getAttributeValues } from '@/services/csu/cart/get-attribute-values'
import { getCart } from '@/services/csu/cart/get-cart'
import { getAtpPlp, IMFIATPInventoryPLPResponse } from '@/services/csu/cart/get-atp-plp'

export interface IDelivery {
  variantDelivery?:{end?: string, start?: string, label?: string},
  variantInStock?: boolean
  variantInMarket?: boolean
}
export interface  ICartItemLine  extends ICartLine {
  product: Promise<IProduct>
  shipping: Promise<string>
  delivery: Promise<IDelivery>
}
export interface IExtendedCart extends ICart {
  CartLines: ICartItemLine[]
}
export async function getAsyncCart (cartId: string, zipCode: string): Promise<IExtendedCart > {
  const cart = await getCart(cartId);
  const {CartLines=[], ... rest} = cart || {}
  const lines: ICartItemLine[] = CartLines.map(line => {
    const product: Promise<IProduct>  = getProductsById([line.ProductId]).then( r=> r.value?.[0])
    const shipping: Promise<string> = getAttributeValues(line.ProductId).then( a=> a.value.find(
      (x: { [x: string]: string }) =>
        x['Name'] === 'shippingInformation'
    ).TextValue as string )
    const delivery = getAtpPlp(zipCode, line.ProductId,line.ItemId , line.Quantity, shipping)
      .then( d =>
       d.ATPInventoryPLPData?.map( i=>
          ({
            variantDelivery: {end: i.EndTime, start: i.StartTime, label: i.SlotDate},
            variantInMarket: i.IsNationWide,
            variantInStock: i.Available === "YES"
          })
        )[0] || {},
      );
    return {...line, product: product, shipping: shipping, delivery: delivery}
  })
  return {...rest, CartLines: lines}
}
