'use client'
import { useRef, useEffect, FormEvent, MutableRefObject } from "react"
import { IMFIATPInventoryDynamic, IEnrichedDeliveryInfo } from '../../app/checkout/page'

// Example of atpSlots
// const result = {
//     ATPInventoryDynamicData: [
//       {
//         Date: "1/29/2024 12:00:00 AM",
//         AvailableSlots: "YES",
//         ATPSlots: [
//           {
//             Location1: "160800",
//             Zone: "ZL000633291",
//             ZoneId: "CT-HART",
//             SlotDate: "1/29/2024 12:00:00 AM",
//             StartTime: "08:00 am",
//             EndTime: "06:00 pm",
//             Slots: "40",
//             MFIATPLeadDate: "",
//             Available: "YES",
//             ATPQuantity: "99999",
//             SourceSystem: "D365",
//             IsTranscity: false,
//             IsNationWide: false
//           }
//         ]
//       }
//     ]
//   };

// Any time delivery method changes, remove the current delivery line item from the cart, wait for it, then add the new one as a line item

interface IDeliveryInfoProps {
  atpSlots: IMFIATPInventoryDynamic
  deliveryServices: IEnrichedDeliveryInfo[]
  refFromChild: (ref:MutableRefObject<HTMLButtonElement | null>)=> void
  handleValidatedForm: (itemId: string, date: string) => {}
}

export default function DeliveryInfo({ atpSlots, deliveryServices, refFromChild, handleValidatedForm }: Readonly<IDeliveryInfoProps>) {
    const submitRef = useRef<HTMLButtonElement | null>(null);
    console.log('atpSlots', atpSlots)
    useEffect(() => {
      refFromChild(submitRef)
    }, [refFromChild])

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault()
      const target = event.target as typeof event.target & {
        method: { value: string };
        date: { value: string };
      };
      handleValidatedForm(target.method.value, target.date.value)
    }

  return (
    <div>
      <h1>Delivery Info</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="date" className="mr-2">
            Choose Your Delivery Date*
          </label>
          <select
            id="date"
            name="date"
            required
            className="border border-gray-200 border-solid"
          >
            <option value="">--Please choose an option--</option>
            {atpSlots.ATPInventoryDynamicData.map((x) => (
              x.ATPSlots.length && <option key={x.Date} value={x.Date}>
                {x.ATPSlots[0].SlotDate.split(' ')[0]} {x.ATPSlots[0].StartTime} to {x.ATPSlots[0].EndTime}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="method" className="mr-2">
            Choose Your Delivery Method*
          </label>
          <select
            id="method"
            name="method"
            required
            className="border border-gray-200 border-solid"
          >
            <option value="">--Please choose an option--</option>
            {deliveryServices.map((x) => (
              <option key={x.serviceId} value={x.serviceSku}>
                {x.serviceName} {x.priceInfo.CustomerContextualPrice === 0 ? 'FREE' : `$${x.priceInfo.CustomerContextualPrice}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" ref={submitRef} className="hidden">
          Submit
        </button>
      </form>
    </div>
  )
}