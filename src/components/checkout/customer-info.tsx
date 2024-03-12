'use client'
import { useState, useEffect, useRef, MutableRefObject, ChangeEvent, FormEvent } from 'react'
import { ICustomerInfo } from '@/app/checkout/page'
// NOTE: we need to make a copy of the cart for checkout, yes, its weird...
// a regular cart has CartTypeValue 1, the copy makes it a 2 and that is what we take through checkout
// if you go back to cart, you use the old cart of type 1 and then go through copy process again if you go into checkout
interface ICustomerInfoProps {
  cartId: string
  refFromChild: (ref:MutableRefObject<HTMLButtonElement | null>)=> void
  handleValidatedForm: (payload: ICustomerInfo) => {}
}

interface IFormData {
  firstName: string
  lastName: string
  address1: string
  city: string
  state: string
  zipCode: string
  phone: string
}

interface IFormDateInitialEntry {
  [key:string]: string
}

export default function CustomerInfo({ cartId, refFromChild, handleValidatedForm }: Readonly<ICustomerInfoProps>) {

  const [formData, setFormData] = useState<IFormData | IFormDateInitialEntry | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const submitRef = useRef<HTMLButtonElement | null>(null);

  useEffect(()=>{
    refFromChild(submitRef)
  }, [refFromChild])
  
// Will be a PATCH call https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Carts('8eef997b-e127-4c7d-81d6-5e1dce927a56')?api-version=7.3

  // const examplePayload = {
  //   Id: '8eef997b-e127-4c7d-81d6-5e1dce927a56',
  //   ShippingAddress: {
  //     Name: 'Ken##Walton',
  //     AddressTypeValue: 6,
  //     City: 'Windsor',
  //     State: 'CT',
  //     Street: '167 Carriage Way',
  //     ThreeLetterISORegionName: 'USA',
  //     TwoLetterISORegionName: 'US',
  //     ZipCode: '06095',
  //     Phone: '(860) 778-6817'
  //   }
  // }

  function buildPayload(): ICustomerInfo {
    return {
      Id: cartId,
      ShippingAddress: {
        Name: formData!.firstName + '##' + formData!.lastName,
        AddressTypeValue: 6,
        City: formData!.city,
        State: formData!.state,
        Street: formData!.address1,
        ThreeLetterISORegionName: 'USA',
        TwoLetterISORegionName: 'US',
        ZipCode: formData!.zipCode,
        Phone: formData!.phone
      } 
    }
  }

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as typeof event.target & {
      name: 'firstName' | 'lastName' | 'address1' | 'city' | 'zipCode' |'phone';
      value: string;
    };
    if (formData === null) {
      setFormData({ [target.name]: target.value })
    } else {
      setFormData({ ...formData, [target.name]: target.value })
    }
    // problem is state has not updated yet
    // setIsFormValid(
    //   !!formData?.firstName &&
    //   !!formData?.lastName &&
    //     !!formData?.address1 &&
    //     !!formData?.city &&
    //     !!formData?.state &&
    //     !!formData?.zipCode &&
    //     !!formData?.phone
    // )
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!!formData?.firstName &&
      !!formData?.lastName &&
        !!formData?.address1 &&
        !!formData?.city &&
        !!formData?.state &&
        !!formData?.zipCode &&
        !!formData?.phone) {
      let payload = buildPayload()
      handleValidatedForm(payload)
    }
  }
  return (
    <div>
      <h2 className="text-md font-bold">Customer Info*</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="firstName" className="mr-2">
            First Name*
          </label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="mr-2">
            Last Name*
          </label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="mr-2">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="mr-2">
            Phone Number*
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="receiveEmail">
            <input
              type="checkbox"
              id="receive-email"
              name="receiveEmail"
              className="mr-2"
              onChange={handleChange}
            />
            Email me news, exclusive offers, and behind-the-scenes content.
          </label>
        </div>
        <p className="text-md font-bold">Delivery Address</p>
        <div className="mb-2">
          <label htmlFor="address1" className="mr-2">
            Address*
          </label>
          <input
            type="text"
            id="address1"
            name="address1"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="address2" className="mr-2">
            Address (APT #, Unit, Etc.. optional)
          </label>
          <input
            type="text"
            id="address2"
            name="address2"
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="zipCode" className="mr-2">
            Zip Code*
          </label>
          <input
            type="text"
            id="zip-code"
            name="zipCode"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="zipCode" className="mr-2">
            City*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="state" className="mr-2">
            State*
          </label>
          <select
            id="state"
            name="state"
            required
            className="border border-gray-200 border-solid"
            onChange={handleChange}
          >
              <option value="">--Please choose an option--</option>
            <option value="CT">Connecticut</option>
          </select>
        </div>
        <button type="submit" ref={submitRef} className="hidden">Submit</button>
      </form>
      <p className="text-xs">* required</p>
    </div>
  )
}
