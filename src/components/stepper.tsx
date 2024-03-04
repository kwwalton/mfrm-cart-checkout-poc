import Link from 'next/link'
export default function Stepper() {
  return (
    <ul className="flex flex-row justify-between text-xs">
      <li>
        <Link href="/cart">Cart</Link>
      </li>
      <li>
        <Link href="/checkout">Customer Info</Link>
      </li>
      <li>
        <Link href="/checkout">Delivery</Link>
      </li>
      <li>
        <Link href="/checkout">Payment</Link>
      </li>
    </ul>
  )
}
