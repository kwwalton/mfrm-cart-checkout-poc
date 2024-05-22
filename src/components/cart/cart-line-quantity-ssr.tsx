'use client'
import { useState } from 'react'
import HttpClient from '@/HttpClient'
import { useRouter } from 'next/navigation'
import { ICartLine } from '@/types/cart'
import { updateCartAction } from '@/components/cart/update-cart-action'
import { useOptimistic } from "react";

interface ICartLineQuantitySsrProps {
  cartId: string
  cartLine: ICartLine
}

export default function CartLineQuantitySsr({
  cartId,
  cartLine
}: ICartLineQuantitySsrProps) {
  const router = useRouter()
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    cartLine.Quantity, // Default to 0 likes if null
    (state, l) => state + 1
  );
  const [isUpdating, setIsUpdating] = useState(false)
  //const cartId = '79dd3d1d-8236-4a36-8451-bd7c67d40d72'
  // cartId through props is "prop drilling"

  // This should be at the cart level and we update the entire cart based on the result
  async function updateQuantity(num: number) {
    setIsUpdating(true)
    addOptimisticCount(num)
    await updateCartAction(cartId, {LineId: cartLine.LineId, Quantity: cartLine.Quantity+ num})
    setIsUpdating(false)
    router.refresh()
  }

  return (
    <div style={{color:isUpdating? "lightgrey": "black"}}>
      <button onClick={() => updateQuantity(-1)} disabled={isUpdating}>
        - Remove
      </button>
      <span className="m-3">{optimisticCount}</span>
      <button  onClick={() => updateQuantity(1)} disabled={isUpdating}>
        + Add
      </button>
    </div>
  )
}
