import Link from 'next/link'
import { ICart } from '@/types/cart'
import Coupons from './coupons/coupons'
// NOTE: copied order summary, made it server, only for cart page, to test handling coupon input and display
interface IOrderSummaryCartSsrProps {
  cart: ICart
  buttonText?: string
}

export default function OrderSummary({
  cart,
  buttonText,
}: Readonly<IOrderSummaryCartSsrProps>) {

  function formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }
  
  return (
    <div className="-mx-5 p-5 bg-gray-100">
      <Coupons coupons={cart.Coupons} cartId={cart.Id} />
      <p>
        Items ({cart.TotalItems}) {formatPrice(cart.NetPrice)}
      </p>
      <p>Savings -{formatPrice(cart.DiscountAmount)}</p>
      <p className="font-bold">Subtotal {formatPrice(cart.SubtotalAmount)}</p>
      <hr className="mt-2 mb-5" />
        <Link
          href="/checkout?step=customer-info"
          className="px-4 py-2 font-semibold text-sm bg-red text-white rounded-md shadow-sm opacity-100"
        >
          Checkout
        </Link>
    </div>
  )
}
