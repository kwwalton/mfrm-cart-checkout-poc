import Link from 'next/link'
import React from 'react'
import { ExtendedCart } from '@/services/bh/cart/get-async-cart'
interface IProps {
  cart: ExtendedCart
}

export default function Summary({
  cart,
}: Readonly<IProps>) {
  // TODO: Display tax, delivery, mattress recycling fee
  function formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }
  return (
    <div className="-mx-5 p-5 bg-gray-100">
      <p>
        Items ({cart.count}) {formatPrice(cart.total)}
      </p>
      <p>Savings -{formatPrice(cart.total-cart.subTotal)}</p>
      <p className="font-bold">Subtotal {formatPrice(cart.subTotal)}</p>
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
