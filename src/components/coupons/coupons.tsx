import CouponInput from './coupon-input'
import Coupon from './coupon'

interface ICoupon {
  Code: string
  CodeId: string
  DiscountOfferId: string
  ExtensionProperties: any[]
}

interface ICouponsProps {
  coupons: ICoupon[]
  cartId: string
}

export default function Coupons({ coupons, cartId }: Readonly<ICouponsProps>) {
  return (
    <div>
      {coupons.length > 0 && (
        <ul>
          {coupons.map((x) => (
            <Coupon key={x.Code} code={x.Code} cartId={cartId} />
          ))}
        </ul>
      )}
      <CouponInput cartId={cartId} />
    </div>
  )
}
