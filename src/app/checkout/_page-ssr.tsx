// import { cookies } from 'next/headers'
// import HttpClient from '@/HttpClient'
// import CustomerInfo from '@/components/checkout/customer-info'
// import OrderSummary from '@/components/order-summary'
// import Stepper from '@/components/stepper'

// I tried with SSR at first but switched to client only. This file is abandoned.

// //https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Carts('79dd3d1d-8236-4a36-8451-bd7c67d40d72')/Copy?api-version=7.3

// // We want to copy the cart to make it a checkout cart here
// async function getCheckoutCartWithHttpClient(shoppingCartId) {
//   const body = { targetCartType: 2 }
//   return await HttpClient("/Commerce/Carts('79dd3d1d-8236-4a36-8451-bd7c67d40d72')/Copy?api-version=7.3", 'POST', body);
// }

// export default async function Checkout() {
//   // Do I already have a checkout cart? Do I need to make one?
//   const cookieStore = cookies()
//   const cartId = cookieStore.get('mfrm_poc_cart_t1_id').value || '79dd3d1d-8236-4a36-8451-bd7c67d40d72'
//   const cart = await getCheckoutCartWithHttpClient(cartId)
  
//   return (
//     <div>
//       <div className="header grid grid-cols-4 lg:grid-cols-4 gap-4">
//         <div className="header__head col-span-4 lg:col-span-3">
//           <h1 className="text-lg font-bold">Checkout</h1>
//         </div>
//         <div className="header__stepper col-span-4 lg:col-span-1">
//           <Stepper />
//         </div>
//       </div>
//       <div className="body grid grid-cols-4 lg:grid-cols-4 gap-4">
//         <div className="body__cart-items col-span-4 lg:col-span-3">
//           <CustomerInfo />
//         </div>
//         <div className="body__order-summary col-span-4 lg:col-span-1">
//           {cart && <OrderSummary cart={cart} />}
//         </div>
//       </div>
//     </div>
//   )
// }
