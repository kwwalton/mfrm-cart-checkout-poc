'use client'
import { useState } from 'react'
import HttpClient from '@/HttpClient'

export default function CartLineQuantity({ cartLine, onQuantityChange, isUpdating }) {
  let [count, setCount] = useState(cartLine.Quantity)
  const cartId = '79dd3d1d-8236-4a36-8451-bd7c67d40d72'

  // This should be at the cart level and we update the entire cart based on the result
  // async function updateQuantity(num) {
  //   const body = {
  //     cartLines: [cartLine],
  //     cartVersion: null
  //   }
  //   body.cartLines[0].Quantity += num;
  //   setCount(count += num)
  //   await HttpClient(
  //     `/Commerce/Carts('${cartId}')/UpdateCartLines?api-version=7.3`,
  //     'POST',
  //     body
  //   )
  // }

async function updateQuantity(num) {
    const body = {
              cartLines: [cartLine],
              cartVersion: null
            }
            body.cartLines[0].Quantity += num;
            setCount(count += num)
    await onQuantityChange(body)
}

  return (
    <div>
      <button onClick={() => updateQuantity(-1)} disabled={isUpdating}>- Remove</button>
      <span className="m-3">{count}</span>
      <button onClick={() => updateQuantity(1)} disabled={isUpdating}>+ Add</button>
    </div>
  )
}
