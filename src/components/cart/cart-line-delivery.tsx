import { IDelivery } from '@/services/csu/cart/get-async-cart'

interface IProps {
  deliveryInfo?:  Promise<IDelivery>
}

// TODO: we can call either PLP or status depending on shipping information

export default async function CartLineDelivery({
  deliveryInfo
}: Readonly<IProps>) {
  const res = await deliveryInfo ;// getAtpPlp(productId, itemId, quantity, shippingInformation)
  return (
    <>
      <p>
        Delivery Info: {res?.variantDelivery?.label}
      </p>
      <p>ATP Available: {res?.variantInStock}</p>
    </>
  )
}
