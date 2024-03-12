'use client'

import HttpClient from '@/HttpClient'
import CustomerInfo from '@/components/checkout/customer-info'
import DeliveryInfo from '@/components/checkout/delivery-info'
import PaymentInfo from '@/components/checkout/payment-info'
import OrderSummary from '@/components/order-summary'
import Stepper from '@/components/stepper'
import { useState, useEffect, useRef, useCallback, RefObject, MutableRefObject } from 'react'
import getCookieValueOnClient from '@/utils/clientCookies'
import { deliveryInfoFromCms } from '@/delivery-info'
import { useRouter } from 'next/navigation'
import { ICart, ICartLine } from '@/types/cart'

// Types

interface IUpdateLineDeliverySpecifications {
  lineDeliverySpecifications: IUpdateLineDeliverySpecificationsLines[]
}

interface IUpdateLineDeliverySpecificationsLines {
  LineId: string
  DeliverySpecification: {
    DeliveryModeId: string
    DeliveryPreferenceTypeValue: number
    DeliveryAddress: {
      Name: string
      AddressTypeValue: number
      City: string
      State: string
      Street: string
      ZipCode: string
      ThreeLetterISORegionName: string
      TaxGroup: string
    }
  }
}

export interface ICustomerInfo {
  Id: string
  ShippingAddress: {
    Name: string
    AddressTypeValue: number
    City: string
    State: string
    Street: string
    ThreeLetterISORegionName: string
    TwoLetterISORegionName: string
    ZipCode: string
    Phone: string
  }
}

interface IShippingAddress {
  Name: string
    AddressTypeValue: number
    City: string
    State: string
    Street: string
    ThreeLetterISORegionName: string
    TwoLetterISORegionName: string
    ZipCode: string
    Phone: string
}

interface IAtpInventoryDynamic {
  deliveryScheduleParam: {
    InventoryType: string
    Weeks: number
    StoreId: string
    Page: string
    RequestedDate: string
    ZipCode: string
    ItemLines: IAtpInventoryDynamicItemLine[]
  }
}
interface IAtpInventoryDynamicItemLine {
  ItemId: string
  Quantity: number
  VariantRecordId: string
}

interface IAddCartLines {
  cartLines: IAddCartLine[]
}

interface IAddCartLine {
  ProductId: number
  EntryMethodTypeValue: number
  ItemId: string
  Quantity: number
  DeliveryMode: string
  UnitOfMeasureSymbol: string
  Price: number
}

interface IUpdateDeliveryCartLine {
  ProductId: number
  EntryMethodTypeValue: number
  ItemId: string
  Quantity: number
  DeliveryMode: string
  UnitOfMeasureSymbol: string
  Price: number
}

interface IUpdateShippingDateTimeCartLine {
  AttributeValues: any
  DeliveryMode: string
  ItemTaxGroupId: string
  LineId: string
  Quantity: number
  WarehouseId: string
}

interface IRemoveCartLines {
  cartLineIds: string[]
}

interface IGetActivePrices {
  projectDomain: {
    ChannelId: number
    CatalogId: number
  }
  productIds: number[]
  activeDate: Date
  customerId: null
  affiliationLoyaltyTiers: any[]
  includeSimpleDiscountsInContextualPrice: true
}
interface IActivePrices {
  value: IActivePrice[]
}

interface IActivePrice {
    "ProductId": number
    "ListingId": number
    "BasePrice": number
    "TradeAgreementPrice": number
    "AdjustedPrice": number
    "MaxVariantPrice": number
    "MinVariantPrice": number
    "CustomerContextualPrice": number
    "DiscountAmount": number
    "CurrencyCode": string
    "ItemId": string,
    "UnitOfMeasure": string
    "ValidFrom": string
    "ProductLookupId": number
    "ChannelId": number,
    "CatalogId": number
    "SalesAgreementPrice": number
    "PriceSourceTypeValue": number
    "DiscountLines": any[]
    "AttainablePriceLines": any[]
    "ExtensionProperties": any[]
}

interface IUpdateCartLines {
  cartLines: ICartLine[] | IUpdateDeliveryCartLine[] | IUpdateShippingDateTimeCartLine[]
}

interface IGetCardPaymentAcceptPoint {
  cardPaymentAcceptSettings: {
    HostPageOrigin: string
    AdaptorPath: string
    CardPaymentEnabled: false
    CardTokenizationEnabled: true
    HideBillingAddress: true
    TenderTypeId: string
    PaymentAmount: number
  }
  extensionProperties: []
}

interface IGetCardPaymentAcceptPointResponse {
  AcceptPageUrl: string
  AcceptPageSubmitUrl: string
  MessageOrigin: string
  AcceptPageContent: string
  PaymentConnectorId: string
  NotReloadAcceptPageContentWhenAmountChanged: boolean
}

interface IRetrieveCardPaymentAcceptResult {
  resultAccessCode: string
  extensionProperties: IRetrieveCardPaymentAcceptResultExtensionProperty[]
  cartId: string
  settings: {
    ReturnUrl: string
    PaymentConnectorId: string
  }
}

interface IRetrieveCardPaymentAcceptResultExtensionProperty {
  Key: string
  Value: {
    BooleanValue: true
    ByteValue: number
    DateTimeOffsetValue: string
    DecimalValue: number
    IntegerValue: number
    LongValue: number
    StringValue: string
  }
}

interface IRetrieveCardPaymentAcceptResultResponse {
  TokenizedPaymentCard: {
    IsSwipe: boolean
    TenderType: string
    Country: string
    House: string
    Address1: string
    Address2: string
    City: string
    State: string
    Zip: string
    NameOnCard: string
    CardTypeId: string
    ExpirationMonth: number
    ExpirationYear: number
    CardTokenInfo: {
      CardToken: string
      UniqueCardId: string
      ServiceAccountId: string
      MaskedCardNumber: string
    }
    ExtensionProperties: []
  }
  PaymentSdkErrors: []
}

interface IRetrieveCardPaymentAcceptResultTokenizedPaymentCard {
  IsSwipe: boolean
  TenderType: string
  Country: string
  House: string
  Address1: string
  Address2: string
  City: string
  State: string
  Zip: string
  NameOnCard: string
  CardTypeId: string
  ExpirationMonth: number
  ExpirationYear: number
  CardTokenInfo: {
    CardToken: string
    UniqueCardId: string
    ServiceAccountId: string
    MaskedCardNumber: string
  }
  ExtensionProperties: []
}
interface ICheckout {
  receiptEmail: string
  cartTenderLines: [
    {
      Currency: string
      Amount: number
      TenderTypeId: string
      CardTypeId: string
      TokenizedPaymentCard: {
        IsSwipe: false
        TenderType: string
        CardTokenInfo: {
          CardToken: string
          UniqueCardId: string
          ServiceAccountId: string
          MaskedCardNumber: string
        }
        Phone: string
        Country: string
        House: string
        Address1: string
        Address2: string
        City: string
        State: string
        Zip: string
        NameOnCard: string
        CardTypeId: string
        ExpirationMonth: number
        ExpirationYear: number
        ExtensionProperties: []
      }
      ExtensionProperties: ICheckoutExtensionProperty[]
    }
  ]
  cartVersion: number
}

interface ICheckoutExtensionProperty {
  Key: string
  Value: { StringValue: string } | { BooleanValue: boolean}
}

export interface IDeliveryInfo {
  serviceName: string
  serviceId: number
  serviceSku: string
  serviceProductRecId: number
  displayServiceSku: boolean
  active?: boolean
  descriptionMessage: string
  descriptionHyperlink: object
  multipleMessagesBasedOnState?: { state: string; message: string }[]
  switchableServiceIds: string
  DefaultStateWithDeliveryExpanded: boolean
  defaultStateWithWillCallExpanded: boolean
  willCallMessage: string
  willCallTitle: string
  callOrTextMessage: string
  warningMessage?: string
  recommended: boolean
  addKeyInPrice?: boolean
  childService?: IDeliveryChildService[]
}

interface IDeliveryChildService {
  serviceName: string
  serviceSKU: string
  productRectId: number
  redeliveryMessage: string
  active: boolean
  excludeZipCode: boolean
  alternativeSolution: boolean
}
export interface IEnrichedDeliveryInfo extends IDeliveryInfo {
  priceInfo: IActivePrice
}
interface IATPSlot {
  Location1: string
  Zone: string
  ZoneId: string
  SlotDate: string
  StartTime: string
  EndTime: string
  Slots: string
  MFIATPLeadDate: string
  Available: string
  ATPQuantity: string
  SourceSystem: string
  IsTranscity: boolean
  IsNationWide: boolean
}
interface IMFIATPInventoryDynamicItem {
  Date: string
  AvailableSlots: string
  ATPSlots: IATPSlot[]
}

export interface IMFIATPInventoryDynamic {
  ATPInventoryDynamicData: IMFIATPInventoryDynamicItem[]
}

const defaultCartCookie = '79dd3d1d-8236-4a36-8451-bd7c67d40d72'

// Customer Information
async function getCheckoutCart(shoppingCartId: string) {
  const body = { targetCartType: 2 }
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/Copy?api-version=7.3`, 'POST', body);
}

async function setPreliminaryDelivery(shoppingCartId: string, payload: IUpdateLineDeliverySpecifications) {
  // payload
  // {"lineDeliverySpecifications":[{"LineId":"632084d09d544c308c1b833ec35a106d","DeliverySpecification":{"DeliveryModeId":"Delivery","DeliveryPreferenceTypeValue":1,"DeliveryAddress":{"Name":"","AddressTypeValue":6,"City":"windsor","State":"CT","Street":"","ZipCode":"06095","ThreeLetterISORegionName":"USA","TaxGroup":"VertexAR"}}},{"LineId":"36e16826ecb6470da6f375f20b022d54","DeliverySpecification":{"DeliveryModeId":"Delivery","DeliveryPreferenceTypeValue":1,"DeliveryAddress":{"Name":"","AddressTypeValue":6,"City":"windsor","State":"CT","Street":"","ZipCode":"06095","ThreeLetterISORegionName":"USA","TaxGroup":"VertexAR"}}}]}
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/UpdateLineDeliverySpecifications?api-version=7.3`, 'POST', payload);
}

async function submitCustomerInfo(shoppingCartId: string, payload: ICustomerInfo) {
  // returns a 204, ok, no content
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')?api-version=7.3`, 'PATCH', payload)
}

// Delivery Information
async function getAtpInventoryDynamic(payload: IAtpInventoryDynamic): Promise<IMFIATPInventoryDynamic> {
  // payload
  // {"deliveryScheduleParam":{"InventoryType":"Delivery","Weeks":6,"StoreId":"","Page":"plp","RequestedDate":"01/24/2024","ZipCode":"06095","ItemLines":[{"ItemId":"107848P","Quantity":1,"VariantRecordId":"5637169770"},{"ItemId":"143762P","Quantity":1,"VariantRecordId":"5637372584"}]}}
  return await HttpClient(`/Commerce/ATP/MFIATPInventoryDynamic?api-version=7.3
  `, 'POST', payload)
  // then the response is used to populate the delivery dates and times
}

async function addDeliveryCartLine(shoppingCartId: string, payload: IAddCartLines) {
  // payload
  // {"cartLines":[{"ProductId":5637148281,"EntryMethodTypeValue":5,"ItemId":"136906","Quantity":1,"DeliveryMode":"Delivery","UnitOfMeasureSymbol":"EA"}]}
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/AddCartLines?api-version=7.3`, 'POST', payload)
}

async function removeDeliveryCartLine(shoppingCartId: string, payload: IRemoveCartLines) {
  // payload
  // {"cartLineIds":["8dffacc8d02e4ee6a62b6e4751697db2"]}
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/RemoveCartLines?api-version=7.3`, 'POST', payload)
}

async function getDeliveryPricing(payload: IGetActivePrices): Promise<IActivePrices> {
  return await HttpClient('/Commerce/Products/GetActivePrices?$top=1000&api-version=7.3', 'POST', payload)
}

async function updateCartLines(shoppingCartId: string, payload: IUpdateCartLines) {
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/UpdateCartLines?api-version=7.3`, 'POST', payload)
}


// also need product info for showing cart lines in delivery info

// Payment Information
async function getCardPaymentAcceptPoint(shoppingCartId: string, payload: IGetCardPaymentAcceptPoint): Promise<IGetCardPaymentAcceptPointResponse> {
  // payload
  // {"cardPaymentAcceptSettings":{"@odata.type":"#Microsoft.Dynamics.Commerce.Runtime.DataModel.CardPaymentAcceptSettings","HostPageOrigin":"https://mfrm-cit.commerce.dynamics.com","AdaptorPath":"https://mfrm-cit.commerce.dynamics.com/Connectors/","CardPaymentEnabled":false,"CardTokenizationEnabled":true,"HideBillingAddress":true,"TenderTypeId":"Visa;Master Card;American Express;Discover;Debit","PaymentAmount":2471.04},"extensionProperties":[]}
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/GetCardPaymentAcceptPoint?api-version=7.3`, 'POST', payload)
}

async function getTenderTypes() {
  return await HttpClient(`/Commerce/GetTenderTypes()?$top=15&api-version=7.3`)
}

async function getRetrieveCardPaymentAcceptResult(shoppingCartId: string, payload: IRetrieveCardPaymentAcceptResult): Promise<IRetrieveCardPaymentAcceptResultResponse> {
  return await HttpClient(`/Commerce/Carts/RetrieveCardPaymentAcceptResult?api-version=7.3`, 'POST', payload)
  // We get back
//  {
//     "TokenizedPaymentCard": {
//         "IsSwipe": false,
//         "TenderType": "5",
//         "Country": "",
//         "House": "",
//         "Address1": "",
//         "Address2": "",
//         "City": "",
//         "State": "",
//         "Zip": "",
//         "NameOnCard": "",
//         "CardTypeId": "DS",
//         "ExpirationMonth": 12,
//         "ExpirationYear": 2099,
//         "CardTokenInfo": {
//             "CardToken": "7ZnfT9swEMffkfgfsryH/ChqAZmgrmWjEoWKFLYJ8eA619ZqYgfbaZr99VNaN6EDBEiVxqpUecnd19ek/vh856Iv951ue9i+R2eLODLmICTl7NR0DxzTAEZ4SNnk1EzV2HKb5pm/v4faQuD8ejzAeQxMDQRPQKjcWMQRkycLSU/NqVLJiW1nWXaQNQ64mNie47j2z/5lQKYQY4syqTAjYJajwrdHmf7+nmGgv753aTQMdIVjkAkm4PdBkClmqk0IT5lCduUqAmitH4CYUwJa1QtXunW4OxylMMwT8AMlKJsgu7LoKIHiAsKVe+n03UYTjslR02q42LUO3VbLGnmjloUdr0WaDQhH4CD7+TgdsAuExjhaxXKQvXG/1mAFWuA4rrW8ho5zsryQ3S3d64cEkgqq8kuYQ+RfcQbIDjZsWtiT54yIPFEQ+mMcSUD2U1OpGmApMy6eiEpLqbkBHF6zKK8ClZZSc0HDEFil0Pfa36UyiXB+AXQyVb6L7E2DVgXwmAIjcJXGIxB+8dtuWgodsl8i5m2MOpwxIIqL1wAqBQVfW6DnNmjDAOcdHscgCJTha2KKNduTn54YzVkHC51MVvlIw1pQ4he+IZ8B2wIvg6bIfv8Qd1Kcd3rfhr3b7PtNOKtp2TFa8mQbyaVLJeFzEDUeu4PHLaOPKRQpZSvVS51PqmrkP6xX3rH79LGcQaiFW2Gm6biu5y2WH8/zDuv0sjvppUgsq8p6C8VKDUrRT+1mWjlfJFRgRTnrc6amr9Gi29kXOumNRtf16s7333a+79hJqin/BVh3yM+PTt45455zfFzP+aef80ss1WGXTqiSry3xD5yV1dXCer3sxsnGV8xmvRCYomNKlpvBqnYIFBb6DHb9wtVJ6gd4qQuIT1hAIPvlPwP8hwf/Dw==",
//             "UniqueCardId": "P6rwzWrVsrECIFTIUwGRdk",
//             "ServiceAccountId": "136e9c86-31a1-4177-b2b7-a027c63edbe0",
//             "MaskedCardNumber": "601122xxxxxx2224"
//         },
//         "ExtensionProperties": []
//     },
//     "PaymentSdkErrors": []
// }
}

async function checkOut(shoppingCartId: string, payload: ICheckout) {
  // payload
  // {"receiptEmail":"ken.walton@mfrm.com","cartTenderLines":[{"Amount@odata.type":"#Decimal","Currency":"USD","Amount":2471.04,"TenderTypeId":"5","CardTypeId":"DS","TokenizedPaymentCard":{"IsSwipe":false,"TenderType":"5","CardTokenInfo":{"CardToken":"7ZnfT9swEMffkfgfsryH/GhpBzJBXcO0ThSqpWwMxIPrXFuLxA620zb//ZTWTegAAVKlsSpVXnL39TWpPz7fuejTbTfoDDu36HSRxMYMhKScnZjugWMawAiPKJucmJkaW27LPPX391BHCJxfjgc4T4CpgeApCJUbiyRm8ngh6Yk5VSo9tu35fH4wbxxwMbE9x3Ht6/55SKaQYIsyqTAjYJajotdHmf7+nmGgv753aTQMdIETkCkm4PdBkClmqkMIz5hCduUqAmitH4KYUQJa1YtWunW4nzjOYJin4IdKUDZBdmXRUULFBUQr99Lpu40WHJHPLavhYtdquu22NfJGbQs7Xpu0GhCNwEH203E6YACEJjhexXKQvXG/1mAFWuA4rrW8ho5zvLyQHZTu9UMCyQRV+TnMIPYvOANkhxs2LezJM0ZEniqI/DGOJSD7salUDbCUcy4eiUpLqfkBOLpkcV4FKi2l5huNImCVQt9rf0BlGuP8G9DJVPkusjcNWhXCQwaMwEWWjED4xW+7aSl0yH6OmNcx6nLGgCguXgKoFBR8bYGeq7ADA5x3eZKAIFCGr4kp1mxPfnhiNGddLHQyWeUjDWtBiV/4hvwe2BZ4uW55v26aN9fdr0HnsHf4/bB5RbrDmpYdoyVPt5FcAioJn4Go8dgdPK4YfcigSClbqV7qfFJVI/9hvfKG3aeP5T1EWrgVZlqO63reYvnxPK9Zp5fdSS9FYllV1lsoVmpQin5qN9PK2SKlAivKWZ8zNX2JFt3OPtNJbzS6rld3vv+2833DTlJN+W/AukN+enTyxhn3nKOjes4//JyfY6maAZ1QJV9a4u84K6urhfV62Y2TjS+Y3fciYIqOKVluBqvaIVRY6DPY9QtXJ6nv4KUuID5gAYHs5/8M8O/u/D8=","UniqueCardId":"X62WZ4ZXCFDA5I5J54UcCT","ServiceAccountId":"136e9c86-31a1-4177-b2b7-a027c63edbe0","MaskedCardNumber":"601122xxxxxx2224","@odata.type":"#Microsoft.Dynamics.Commerce.Runtime.DataModel.CardTokenInfo"},"Phone":"860-778-6817","Country":"USA","House":"N/A","Address1":"167 Carriage Way","Address2":"","City":"Windsor","State":"CT","Zip":"06095","NameOnCard":"","CardTypeId":"DS","ExpirationMonth":12,"ExpirationYear":2099,"ExtensionProperties":[],"@odata.type":"#Microsoft.Dynamics.Commerce.Runtime.DataModel.TokenizedPaymentCard"},"ExtensionProperties":[{"Key":"clientIPAddress","Value":{"StringValue":"68.0.221.93"}},{"Key":"forterToken","Value":{"StringValue":"f155a6347ecc451db6382e9be205d531_1708355249960_251_UDF43-m4_15ck__tt"}},{"Key":"userAgent","Value":{"StringValue":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"}},{"Key":"isForterValidationEnabled","Value":{"BooleanValue":true}},{"Key":"isForterValidationEnabledForApplePay","Value":{"BooleanValue":true}}]}],"cartVersion":203661802}
  return await HttpClient(`/Commerce/Carts('${shoppingCartId}')/Checkout?api-version=7.3`, 'POST', payload)
}

export default function Checkout() {
  const router = useRouter()
  // What checkout step am I on?
  // Make a new checkout cart each time user enters from cart screen
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [cart, setCart] = useState<ICart | null>(null)
  const [atpSlots, setAtpSlots] = useState<IMFIATPInventoryDynamic| null>(null)
  const [deliveryInfo, setDeliveryInfo] = useState<IEnrichedDeliveryInfo[]>(deliveryInfoFromCms as IEnrichedDeliveryInfo[])
  const [selectedDate, setSelectedDate] = useState(null) // default to today
  const [selectedServiceId, setSelectedServiceId] = useState(1)
  const [customerInfo, setCustomerInfo] = useState<IShippingAddress | null>(null)
  const [cardPaymentSettings, setCardPaymentSettings] = useState<IGetCardPaymentAcceptPointResponse | null>(null)
  const [tokenizedPaymentCardInfo, setTokenizedPaymentCardInfo] = useState<IRetrieveCardPaymentAcceptResultTokenizedPaymentCard | null>(null)
 

  // need a ref for sibling to sibling communication
  const [childRef, setChildRef] = useState<RefObject<HTMLButtonElement> | undefined>(undefined)

  const handleRef = (ref: MutableRefObject<HTMLButtonElement | null>) => {
    setChildRef(ref)
  }

  const handleCustomerInfo = useCallback(async (payload: ICustomerInfo) => {
    await submitCustomerInfo(cart!.Id, payload)
    await getAtpSlotsAndSetDatePicker()
    setCustomerInfo(payload.ShippingAddress)
    setCheckoutStep(2)
    router.push('/checkout?step=delivery')
  }, [cart])

  function buildPayloadForAtpSlots() {
    // '01/29/2024'
    const today = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    const formattedToday = today.split(',')[0].split('/').map(x => x.length === 1 ? '0' + x : x).join('/')

    // iterate cart lines, ItemId is used for ItemId, ProductId is used for VariantRecordId
    // { ItemId: '107848P', Quantity: 1, VariantRecordId: '5637169770' }
    const lineItems = cart!.CartLines.map((x: ICartLine) => ({
      ItemId: x.ItemId,
      Quantity: 1,
      VariantRecordId: x.ProductId.toString()
    }))

    return {
      deliveryScheduleParam: {
        InventoryType: 'Delivery',
        Weeks: 6,
        StoreId: '',
        Page: 'plp',
        RequestedDate: formattedToday,
        ZipCode: '06095',
        ItemLines: lineItems
      }
    }
  }

  async function getAtpSlotsAndSetDatePicker() {
    const payload = buildPayloadForAtpSlots()
    const atpSlots = await getAtpInventoryDynamic(payload)
    setAtpSlots(atpSlots)
  }


  // TODO: Should use info from Customer Info here
  // Is DeliveryPreferenceTypeValue silver, gold, or platinum?
  function buildPreliminaryDeliveryPayload(cart: ICart): IUpdateLineDeliverySpecifications {
    const lines = cart.CartLines.map(x => {
      return {
        LineId: `${x.LineId}`,
        DeliverySpecification: {
          DeliveryModeId: "Delivery",
          DeliveryPreferenceTypeValue: 1,
          DeliveryAddress: {
            Name: "",
            AddressTypeValue: 6,
            City: "windsor",
            State: "CT",
            Street: "",
            ZipCode: "06095",
            ThreeLetterISORegionName: "USA",
            TaxGroup: "VertexAR"
          }
        }
      }
    })
    return {
      lineDeliverySpecifications: lines
    }
  }

  function builDeliveryPricePayload(): IGetActivePrices {
    return {
      projectDomain: { ChannelId: 5637154326, CatalogId: 0 },
      productIds: [5637148201, 5637148281, 5637149119, 5637149117, 5637148272],
      activeDate: new Date(),
      customerId: null,
      affiliationLoyaltyTiers: [],
      includeSimpleDiscountsInContextualPrice: true
    }
  }


  function buildDeliveryPayload() {
    return {
      cartLines: [
        {
          ProductId: 5637148201,
          EntryMethodTypeValue: 5,
          ItemId: '103401',
          Quantity: 1,
          DeliveryMode: 'Delivery',
          IsPriceKeyedIn: true,
          Price: 0,
          UnitOfMeasureSymbol: 'EA'
        }
      ]
    }
  }

  async function getDeliveryPricingAndEnrichDeliveryInfo() {
    const payload = builDeliveryPricePayload()
    const res = await getDeliveryPricing(payload)
    // take the pricing from the result and add it into delivery info from cms
    const enrichedDeliveryInfo  = [...deliveryInfo]
    enrichedDeliveryInfo.forEach(x => x.priceInfo = res.value.filter(r => r.ItemId === x.serviceSku)[0])
    setDeliveryInfo(enrichedDeliveryInfo)
  }

  // Before we add the delivery cart line we need to check if we already have one, if so , remove it first
  function buildDeliveryLineItemPayload(itemId: string) {
    // We should get delivery options from calling /Commerce/Products/GetDeliveryOptions?$top=1000&api-version=7.3
    // and then you get back the different delivery options for each item you passed in

    // Pickup is 5637144579
    // Delivery is 5637144580
    // Carry Out is 5637146076

    // Silver is 5637148201
    // Gold is 5637148281
    // Platinum is 5637148272

    // We need to know itemId, productId, and price but we don't send price when not free?
    // We need to get prices for delivery from /Commerce/Products/GetActivePrices?$top=1000&api-version=7.3
    // and send payload like {"projectDomain":{"ChannelId":5637154326,"CatalogId":0},"productIds":[5637148201,5637148281,5637149119,5637149117,5637148272],"activeDate":"2024-02-08T15:26:53.908Z","customerId":null,"affiliationLoyaltyTiers":[],"includeSimpleDiscountsInContextualPrice":true}
    const foundIndex = deliveryInfo.find(x => x.serviceSku === itemId)
    console.log('delivery price', foundIndex?.priceInfo?.AdjustedPrice)

    return {
      cartLines: [
        {
          ProductId: foundIndex!.serviceProductRecId,
          EntryMethodTypeValue: 5,
          ItemId: itemId,
          Quantity: 1,
          DeliveryMode: 'Delivery',
          UnitOfMeasureSymbol: 'EA',
          Price: foundIndex!.priceInfo.AdjustedPrice
        }
      ]
    }
  }

  function buildGetCardPaymentAcceptPointPayload(paymentAmount: number): IGetCardPaymentAcceptPoint {
    // What happens in the adaptor path? https://mfrm-cit.commerce.dynamics.com/Connectors/
    // if you reach with browser, you get a 404
    return {
      cardPaymentAcceptSettings: {
        HostPageOrigin: 'http://localhost:3000',
        AdaptorPath: 'http://localhost:3000/Connectors/',
        CardPaymentEnabled: false,
        CardTokenizationEnabled: true,
        HideBillingAddress: true,
        TenderTypeId: 'Visa;Master Card;American Express;Discover;Debit',
        PaymentAmount: paymentAmount
      },
      extensionProperties: []
    }

  }

  useEffect(() => {
    const cartId = getCookieValueOnClient('mfrm_poc_cart_t1_id') || defaultCartCookie

    // Get and set delivery pricing
    getDeliveryPricingAndEnrichDeliveryInfo()

    // Convert to checkout cart and add default delivery info
    getCheckoutCart(cartId).then((res) => {
      setCart(res)
      return res
    }).then(async (res) => {
      const payload = buildPreliminaryDeliveryPayload(res)
      const updatedCart = await setPreliminaryDelivery(res.Id, payload)
      setCart(updatedCart)
      return updatedCart
    }).then(async (updatedCart) => {
      // now add the delivery as a line item, set it to Free Delivery
      // why not wait until customer sets it?

    })
  }, [])

  // We need to call /Commerce/Carts('56b9054b-ff52-4776-949b-4b4f8673d8e5')/UpdateLineDeliverySpecifications?api-version=7.3
  // to POST the cart lines with a payload like:
  // {"lineDeliverySpecifications":[{"LineId":"632084d09d544c308c1b833ec35a106d","DeliverySpecification":{"DeliveryModeId":"Delivery","DeliveryPreferenceTypeValue":1,"DeliveryAddress":{"Name":"","AddressTypeValue":6,"City":"windsor","State":"CT","Street":"","ZipCode":"06095","ThreeLetterISORegionName":"USA","TaxGroup":"VertexAR"}}},{"LineId":"36e16826ecb6470da6f375f20b022d54","DeliverySpecification":{"DeliveryModeId":"Delivery","DeliveryPreferenceTypeValue":1,"DeliveryAddress":{"Name":"","AddressTypeValue":6,"City":"windsor","State":"CT","Street":"","ZipCode":"06095","ThreeLetterISORegionName":"USA","TaxGroup":"VertexAR"}}}]}
  // so we really need a zipcode on entering the customer info screen. 
  // and then we also need to call https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Carts('aa230a4c-7a1b-4e87-9313-994e0e9e32d4')/AddCartLines?api-version=7.3
  // to add delivery as its own line item

  // when you continue from delivery screen
  // call https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Carts('aa230a4c-7a1b-4e87-9313-994e0e9e32d4')/UpdateCartLines?api-version=7.3
  // payload is your cart lines
  // gets prices for delivery levels
  // https://scu1qudx3s612095292-rs.su.retail.dynamics.com/Commerce/Products/GetActivePrices?$top=1000&api-version=7.3


  // Delivery option come from CMS, 103401 | 5637148201 is free, 136906 | 5637148281 is silver, and 135406 | 5637148272 is platinum
  // you will not see a network call for that info

  // We need to add delivery as a line item

  // To set the date for a delivery, you have to include a very ugly AttributeValues array of odata objects in payload
  // they are on all cart lines after you addCartLines with delivery method
  // iterate through AttributeValues and find Name: "Ecom_DeliveryDate" and set TextValue to "2024-02-12T00:00:00"
  // UpdateCartLines is the api used for this POST
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const minute = 0 - today.getTimezoneOffset()
  const formatted = new Date(year, month, day, 0, minute, 0, 0)
  // Need to remove the Z

  function hasDeliveryCartLine(){
    return cart?.CartLines.findIndex(cl => cl.ItemTaxGroupId === 'DELV') !== -1
  }

  function deliveryCartLineId() {
    return cart?.CartLines.find(cl => cl.ItemTaxGroupId === 'DELV')?.LineId
  }

  function newDateFromAtpDateString(dateString: string) {
    // dateString '1/29/2024 12:00:00 AM'
    const dateInput = dateString.split(' ')[0]
    return new Date(dateInput)
  }

  function shippingMessage(dateString: string, startTime: string, endTime: string) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    const deliveryDate = newDateFromAtpDateString(dateString)
    const deliveryDateString = deliveryDate.toLocaleDateString(undefined, options)
    const weekDay = deliveryDateString.split(',')[0]
    const monthAndDay = deliveryDateString.split(',')[1]
    return `Arrives ${weekDay}, ${monthAndDay} at ${startTime} - ${endTime}`
  }

  function dateToIsoStringNoZ(dateString: string) {
    const deliveryDate = newDateFromAtpDateString(dateString)
    const year = deliveryDate.getFullYear()
    const month = deliveryDate.getMonth()
    const day = deliveryDate.getDate()
    const minute = 0 - deliveryDate.getTimezoneOffset()
    const formatted = new Date(year, month, day, 0, minute, 0, 0)
    return formatted.toISOString().split('Z')[0]
  }

  function deliveryServiceNameFromItemId(itemId: string) {
    return deliveryInfo.find(x => x.serviceId === +itemId)?.serviceName
  }

  function buildCartLinesWithShippingDateAndTimePayload(cartLines: ICartLine[], date: string, deliveryServiceName: string): IUpdateShippingDateTimeCartLine[] {
    // match the date with the ATP slot info
    const atpInfo = atpSlots?.ATPInventoryDynamicData.find(x => x.Date === date)
    //then set all those attributes on each cart line
    // I guess sometimes the payload can be partial?
    let payload = cartLines.map((cl) => {
      return {
        AttributeValues: cl.AttributeValues,
        DeliveryMode: cl.DeliveryMode,
        ItemTaxGroupId: cl.ItemTaxGroupId,
        LineId: cl.LineId,
        Quantity: cl.Quantity,
        WarehouseId: cl.WarehouseId
      }
    })
    // Include delivery line item when iterating and setting attributes
    // TODO: do not put on delivery item
    // NOTE: you have to have the odata bah blah in each one or the call will fail
    for (const cl of payload) {
      if (cl.ItemTaxGroupId === 'DELV') continue
      cl.AttributeValues.push(buildAttribute('Ecom_DSZipCode', '06095'))
      cl.AttributeValues.push(buildAttribute('Ecom_DSZoneLineId', atpInfo!.ATPSlots[0].Zone))
      cl.AttributeValues.push(buildAttribute('Ecom_InventLocationId', atpInfo!.ATPSlots[0].Location1))
      cl.AttributeValues.push(buildAttribute('Ecom_ShippingMessage', shippingMessage(atpInfo!.Date, atpInfo!.ATPSlots[0].StartTime, atpInfo!.ATPSlots[0].EndTime)))
      cl.AttributeValues.push(buildAttribute('Ecom_DeliveryDate', dateToIsoStringNoZ(atpInfo!.Date)))
      cl.AttributeValues.push(buildAttribute('Ecom_StartTime', atpInfo!.ATPSlots[0].StartTime))
      cl.AttributeValues.push(buildAttribute('Ecom_EndTime', atpInfo!.ATPSlots[0].EndTime))
      cl.AttributeValues.push(buildAttribute('Ecom_DeliveryService', deliveryServiceName))
      cl.AttributeValues.push(buildAttribute('Ecom_DeliveryTime', `${atpInfo!.ATPSlots[0].StartTime} - ${atpInfo!.ATPSlots[0].EndTime}`))
    }
    // we also need to add a bunch of other shit like Ecom_RevenueCategory, Ecom_VariantId, Ecom_DSZipCode, Ecom_ProductNameWithBrand, Ecom_ProductType, brandName, categoryName, Ecom_WillCallDateExists, Ecom_DSDeliveryScheduleStatus, 
    return payload
  }
  // TODO: see why this is malformed, look at payload from src/modules/mfrm-checkout-payment-instrument/mfrm-checkout-payment-instrument.tsx that goes to retrieveCardPaymentAcceptResultAsync
  async function handlePreCheckout(encodedCardInfo: string) {
    const cardInfoString = atob(encodedCardInfo)
    const cardInfoObject = JSON.parse(cardInfoString)
    console.log('cardInfoObject',cardInfoObject)
    const payload: IRetrieveCardPaymentAcceptResult = {
      resultAccessCode: encodedCardInfo,
      extensionProperties: [],
      cartId: cart!.Id,
      settings: {
        ReturnUrl: window.location.href,
        PaymentConnectorId: cardPaymentSettings!.PaymentConnectorId
      }
    }
    const res = await getRetrieveCardPaymentAcceptResult(cart!.Id, payload)
    console.log('res', res)
    setTokenizedPaymentCardInfo(res.TokenizedPaymentCard)
  }

  async function handleCheckout() {
    const payload = buildCheckoutPayload()
    console.log('TODO: call checkout', payload)
    const res = await checkOut(cart!.Id, payload)
    console.log('checkout res', res)
    router.push(`/order-confirmation?id=${res.Id}`)

  }
  // const cardNamesToTwoChars = new Map()
  // cardNamesToTwoChars.set('Discover', 'DS')

  function buildCheckoutPayload(): ICheckout {
    // first we need to call RetrieveCardPaymentAcceptResult to get back a tokenized card
    // which is silly as we have enough info to let back-end handle the it with what we have already
    // get tokenized card info from state
    return {
      receiptEmail: "ken.walton@mfrm.com",
      cartTenderLines: [
        {
          Currency: "USD",
          Amount: cart!.TotalAmount,
          TenderTypeId: "5",
          CardTypeId: tokenizedPaymentCardInfo!.CardTypeId,
          TokenizedPaymentCard: {
            IsSwipe: false,
            TenderType: "5",
            CardTokenInfo: tokenizedPaymentCardInfo!.CardTokenInfo,
            Phone: "860-778-6817",
            Country: "USA",
            House: "N/A",
            Address1: "167 Carriage Way",
            Address2: "",
            City: "Windsor",
            State: "CT",
            Zip: "06095",
            NameOnCard: "Kenneth Walton",
            CardTypeId: tokenizedPaymentCardInfo!.CardTypeId,
            ExpirationMonth: tokenizedPaymentCardInfo!.ExpirationMonth,
            ExpirationYear: tokenizedPaymentCardInfo!.ExpirationYear,
            ExtensionProperties: [],
          },
          ExtensionProperties: [
            { Key: "clientIPAddress", Value: { StringValue: "68.0.221.93" } },
            {
              Key: "forterToken",
              Value: {
                StringValue:
                  "f155a6347ecc451db6382e9be205d531_1708355249960_251_UDF43-m4_15ck__tt"
              }
            },
            {
              Key: "userAgent",
              Value: {
                StringValue:
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
              }
            },
            { Key: "isForterValidationEnabled", Value: { BooleanValue: false } },
            {
              Key: "isForterValidationEnabledForApplePay",
              Value: { BooleanValue: false }
            }
          ]
        }
      ],
      cartVersion: cart!.Version
    };
    
  }

  async function handleDelivery(itemId: string, date: string) {
    // do we already have a delivery line item?
    if (hasDeliveryCartLine()) {
      const lineIdToRemove = deliveryCartLineId()
      await removeDeliveryCartLine(cart!.Id, {cartLineIds:[`${lineIdToRemove}`]})
      // TODO: you also need to clear out delivery attributes on each cartline
    }
    const deliveryLineItemPayload = buildDeliveryLineItemPayload(itemId)
    const updatedCart = await addDeliveryCartLine(cart!.Id, deliveryLineItemPayload) // returns updated cart
    // maybe use entire ATP info as value on date/time select to not have to find it all later
    // then we need to update info on each line item after adding it using UpdateCartLines api
    // if this item is to be delivered (not drop ship or small parcel)
    // iterate cart lines in AttributeValues set the following:
    // where Name = Ecom_DSZoneLineId, set TextValue to Zone like 'ZL000390469'
    // where Name = Ecom_InventLocationId, set TextValue to Location1 like '053800'
    // where Name = Ecom_ShippingMessage, set TextValue to 'Arrives Wed, Feb 28 at 08:00 am - 04:00 pm'
    // where Name = Ecom_DeliveryDate, set TextValue to '2024-02-28T00:00:00'
    // where Name = Ecom_StartTime, set TextValue to '08:00 am'
    // where Name = Ecom_EndTime, set TextValue to '04:00 pm'
    // where Name = Ecom_DeliveryService, set TextValue to 'Mattress Setup and Haul Away'
    // where Name = Ecom_DeliveryTime, set TextValue to '08:00 am - 04:00 pm'

    // AttributeValues is an empty array on the cart until...
    const deliveryServiceName = deliveryServiceNameFromItemId(itemId)
    const updateCartLinesPayload = buildCartLinesWithShippingDateAndTimePayload(updatedCart.CartLines, date, deliveryServiceName!)
    // Now call update cart lines with updateCartLinesPayload, await it and then
    const anotherCartUpdate = await updateCartLines(cart!.Id, { cartLines: updateCartLinesPayload })
    setCart(anotherCartUpdate)
    setCheckoutStep(3)
    const cardPaymentSettingsPayload = buildGetCardPaymentAcceptPointPayload(anotherCartUpdate.TotalAmount)
    const cardPaymentSettingsResponse = await getCardPaymentAcceptPoint(cart!.Id, cardPaymentSettingsPayload)
    setCardPaymentSettings(cardPaymentSettingsResponse)
    router.push('/checkout?step=payment')
  }

  function buildAttribute(name: string, textValue: string) {
    // NOTE: Why do we have to have a decorator on this or it will fail on back-end?
    return {
      "@odata.type": "#Microsoft.Dynamics.Commerce.Runtime.DataModel.AttributeTextValue",
      ExtensionProperties: [],
      Name: name,
      TextValue: textValue,
      TextValueTranslations: []
    }
  }
  
  return (
    <div>
      <div className="header grid grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="header__head col-span-4 lg:col-span-3">
          <h1 className="text-lg font-bold">Checkout</h1>
        </div>
        <div className="header__stepper col-span-4 lg:col-span-1">
          <Stepper />
        </div>
      </div>
      <div className="body grid grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="body__cart-items col-span-4 lg:col-span-3">
          {cart && checkoutStep === 1 && (
            <CustomerInfo
              cartId={cart.Id}
              refFromChild={handleRef}
              handleValidatedForm={handleCustomerInfo}
            />
          )}
          {cart && checkoutStep === 2 && atpSlots && (
            <DeliveryInfo
              atpSlots={atpSlots}
              deliveryServices={deliveryInfo}
              refFromChild={handleRef}
              handleValidatedForm={handleDelivery}
            />
          )}
          {cart && checkoutStep === 3 && cardPaymentSettings && (
            <PaymentInfo
              markup={cardPaymentSettings.AcceptPageContent}
              onMsaxCcResult={handlePreCheckout}
              isOkToCheckout={!!tokenizedPaymentCardInfo}
              refFromChild={handleRef}
              handleCheckout={handleCheckout}
            />
          )}
        </div>
        <div className="body__order-summary col-span-4 lg:col-span-1">
          {cart && (
            <OrderSummary
              cart={cart}
              buttonText="Checkout"
              innerRef={childRef}
            />
          )}
        </div>
      </div>
    </div>
  )
}
