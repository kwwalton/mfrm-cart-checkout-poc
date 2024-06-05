'use client'
import { FormEvent, useState } from 'react'
import { addCouponToCart } from '@/lib/actions'

interface ICouponInputProps {
  cartId: string
}

export default function CouponInput({ cartId }: Readonly<ICouponInputProps>) {
  const [isVisible, setIsVisible] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('event', event)
    // @ts-ignore
    const couponToAdd = event.target?.[0].value.trim()
    addCouponToCart(couponToAdd, cartId).then(() => setIsVisible(!isVisible))
  }

  // move the form and the is visible state to its own component
  return (
    <div>
      {isVisible && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="coupon">
            enter coupon
            <input type="text" name="coupon" />
          </label>
          <button type="submit">submit</button>
        </form>
      )}

      {isVisible ? (
        <button onClick={() => setIsVisible(!isVisible)}>Close</button>
      ) : (
        <button onClick={() => setIsVisible(!isVisible)}>
          Add a promo code
        </button>
      )}
    </div>
  )
}
