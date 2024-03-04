import Link from 'next/link'
import SetCartFromUat from '@/components/set-cart-from-uat'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
        <p className="mb-5">First, enter a cart id from UAT env.</p>
        <SetCartFromUat />
        <hr className="my-3" />

        <p className="mb-5">
          Next, choose client or server version of cart page.
        </p>
        <ul className="flex">
          <li className="mr-5">
            <Link
              className="mt-4 px-4 py-2 font-semibold text-sm bg-red text-white rounded-md shadow-sm opacity-100"
              href="/cart"
            >
              Cart Page
            </Link>
          </li>
          <li className="ml-5">
            <Link
              className="mt-4 px-4 py-2 font-semibold text-sm bg-red text-white rounded-md shadow-sm opacity-100"
              href="/cart-ssr"
            >
              Cart Page SSR
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
