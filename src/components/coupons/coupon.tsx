'use client'
import { removeCouponFromCart } from '@/lib/actions'
import { useFormStatus } from 'react-dom'

interface ICouponProps {
  code: string
  cartId: string
}

export default function Coupon({ code, cartId }: Readonly<ICouponProps>) {
  const { pending } = useFormStatus()

  return (
    <li
      style={{ color: pending ? 'lightgrey' : 'black' }}
      className="flex items-center mb-3"
    >
      <span className="text-lime-600">{code} applied &nbsp;</span>
      <form action={async () => await removeCouponFromCart(code, cartId)}>
        <button type="submit" disabled={pending} className="underline text-sm">
          remove
        </button>
      </form>
    </li>
  )
}
