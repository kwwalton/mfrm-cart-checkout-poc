'use client'

// Set a cookie with id of cart from UAT environment
export default function SetCartIdFromUat() {
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      cartId: { value: string }
    }
    const cartId = target.cartId.value
    document.cookie = `mfrm_poc_cart_t1_id=${cartId}`
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cartId" className="mr-2">
            Cart Id from UAT
          </label>
          <input
            type="text"
            id="cart-id"
            name="cartId"
            className="border border-gray-200 border-solid"
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-sm bg-red text-white rounded-md shadow-sm opacity-100"
          >
            Set Cookie with Cart Id From Uat
          </button>
        </div>
      </form>
    </div>
  )
}
