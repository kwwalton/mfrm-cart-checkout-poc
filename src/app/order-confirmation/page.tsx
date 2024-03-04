'use client'

import HttpClient from '@/HttpClient'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

async function getSalesOrder(orderId) {
  return await HttpClient(`/Commerce/SalesOrders('${orderId}')?api-version=7.3`)
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const [orderInfo, setOrderInfo] = useState(null)
  useEffect(() => {
    getSalesOrder(orderId).then((res) => setOrderInfo(res))
  }, [])
  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Order Id: {orderId}</p>
    </div>
  )
}
