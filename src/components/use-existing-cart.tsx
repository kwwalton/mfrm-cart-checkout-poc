'use client'
import { useRef } from "react";
export default function UseExistingCart() {
    const cartid = useRef(null)
    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(cartid.current.value)
    }
  return (
    <main>
      <h1>Use Existing Cart</h1>
      <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="cart-id">Enter Cart Id</label>
            <input type="text" id="cart-id" name="cart-id" ref={cartid} placeholder="dc5e42f6-bbcc-4f6a-893d-2873fd64a646"/>
            <button type="submit">Get Cart</button>
        </form>
      </div>
    </main>
  )
}
