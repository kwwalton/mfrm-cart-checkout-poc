'use client'
import { useState } from 'react'
import HttpClient from '@/HttpClient'
import { useRouter } from 'next/navigation';

export default function CartLineQuantitySsr({ cartLine }) {
  const router = useRouter();
  let [count, setCount] = useState(cartLine.Quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const cartId = '79dd3d1d-8236-4a36-8451-bd7c67d40d72'

  // This should be at the cart level and we update the entire cart based on the result
  async function updateQuantity(num) {
    setIsUpdating(true)
    const body = {
      cartLines: [cartLine],
      cartVersion: null
    }
    body.cartLines[0].Quantity += num;
    setCount(count += num)
    await HttpClient(
      `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
      'POST',
      body
    ).then(() => {
      setIsUpdating(false)
      router.refresh();
    })
  }

  return (
    <div>
      <button onClick={() => updateQuantity(-1)} disabled={isUpdating}>- Remove</button>
      <span className="m-3">{count}</span>
      <button onClick={() => updateQuantity(1)} disabled={isUpdating}>+ Add</button>
    </div>
  )
}
