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
    <li style={{ color: pending ? 'lightgrey' : 'black' }}>
      {code} &nbsp;
      <form action={async () => await removeCouponFromCart(code, cartId)}>
        <button type="submit" disabled={pending}>
          remove
        </button>
      </form>
    </li>
  )
}
