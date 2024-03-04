'use client'
import HttpClient from "@/HttpClient"

export default function CreateCart() {
  async function handleClick() {
    let myHeaders = new Headers()
    myHeaders.append('Oun', 'E290017')
    myHeaders.append('Content', 'application/json')
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', '*/*')
    myHeaders.append(
        "Origin",
        "https://scu1qudx3s612095292-rs.su.retail.dynamics.com"
      );
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({})
    }

    try {
      const response = await fetch(
        `/api/Commerce/Carts?api-version=7.3`,
        requestOptions
      )
      const cart = await response.json()
      alert(cart)
      console.log(cart)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async function justGetTheExistingCart() {
    const res = await HttpClient(`/api/Commerce/Carts('dc5e42f6-bbcc-4f6a-893d-2873fd64a646')?api-version=7.3`)
  }

  return (
    <>
    <button onClick={handleClick} type="button">
      Create Cart
    </button>
    <button onClick={justGetTheExistingCart} type="button">Handle It</button>
    </>
  )
}
