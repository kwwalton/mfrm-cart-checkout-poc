import HttpClient from "@/HttpClient"

interface IProps {
    productId: number
    itemId: string
    quantity: number
    shippingInformation: string
  }

  async function getAtpPlp(productId: number, itemId: string, quantity: number, shippingInformation: string): Promise<any> {
    const body = {
      deliveryScheduleParam: {
        Weeks: 6,
        InventoryType: shippingInformation,
        StoreId: '',
        RequestedDate: '05/28/2024',
        ZipCode: '06095',
        ItemLines: [
          { ItemId: itemId, Quantity: 3, VariantRecordId: `${productId}` }
        ],
        CustomerRequestTime: '05/28/2024 15:53:25',
        Id: 0,
        NoOfPriorityDC: 0
      }
    }
    return await HttpClient(`/Commerce/ATP/MFIATPInventoryPLP?api-version=7.3`, 'POST', body)
  }

export default async function CartLineDelivery({productId, itemId, quantity, shippingInformation}: Readonly<IProps>) {
    console.log('all parameters', productId, itemId, quantity, shippingInformation)
    const res = await getAtpPlp(productId,itemId, quantity, shippingInformation)
    console.log('ATP RES', res)
    // await new Promise(resolve => setTimeout(resolve, 5000));
    return (
      <div>
        <p>
          Delivery Info: {productId} {shippingInformation}
        </p>
        <p>
          ATP Available: {res.ATPInventoryPLPData[0].Available}
        </p>
        <p>ATP Item ID: {res.ATPInventoryPLPData[0].ItemId}</p>
      </div>
    )
}