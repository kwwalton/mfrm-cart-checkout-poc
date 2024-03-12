'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ICart } from '@/types/cart'
import React, { RefObject } from 'react'
interface IOrderSummaryProps {
  cart: ICart
  buttonText?: string
  innerRef?: RefObject<HTMLButtonElement | null> | undefined
}

export default function OrderSummary({
  cart,
  buttonText,
  innerRef
}: Readonly<IOrderSummaryProps>) {
  // TODO: Display tax, delivery, mattress recycling fee
  const path = usePathname()
  function formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }
  return (
    <div className="-mx-5 p-5 bg-gray-100">
      <p>
        Items ({cart.TotalItems}) {formatPrice(cart.NetPrice)}
      </p>
      <p>Savings -{formatPrice(cart.DiscountAmount)}</p>
      <p className="font-bold">Subtotal {formatPrice(cart.SubtotalAmount)}</p>
      <hr className="mt-2 mb-5" />
      {path === '/cart' || path === '/cart-ssr' ? (
        <Link
          href="/checkout?step=customer-info"
          className="px-4 py-2 font-semibold text-sm bg-red text-white rounded-md shadow-sm opacity-100"
        >
          Checkout
        </Link>
      ) : (
        innerRef && (
          <button
            type="button"
            onClick={() => innerRef?.current?.click()}
            className="px-4 py-2 font-semibold text-sm bg-red text-white rounded-md shadow-sm opacity-100"
          >
            {buttonText}
          </button>
        )
      )}
    </div>
  )
}
