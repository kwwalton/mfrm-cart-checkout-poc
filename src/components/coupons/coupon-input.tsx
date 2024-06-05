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

  // TODO: move the form and the is visible state to its own component
  return (
    <div>
      {isVisible && (
        <form onSubmit={handleSubmit} className="flex">
          <label htmlFor="coupon" className="flex flex-col text-xs">
            coupon
            <input type="text" name="coupon" className="text-md p-3" />
          </label>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md shadow-sm opacity-100 mt-4"
          >
            Apply
          </button>
        </form>
      )}

      <button
        onClick={() => setIsVisible(!isVisible)}
        className="underline text-sm mb-3"
      >
        {isVisible ? 'Cancel' : 'Add a promo code'}
      </button>
    </div>
  )
}
