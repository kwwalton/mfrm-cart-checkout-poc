export const deliveryInfoFromCms = [
  {
    serviceName: 'Free Delivery',
    serviceId: 1,
    serviceSku: '103401',
    serviceProductRecId: 5637148201,
    displayServiceSku: false,
    active: true,
    descriptionMessage:
      '<p>Drop-off to your front door, side door or garage. Signature Required.</p>',
    descriptionHyperlink: {},
    multipleMessagesBasedOnState: [
      {
        state: 'CA',
        message:
          '<p>Drop-off to your front door, side door or garage. Free mattress removal available for CA deliveries. Signature Required.&nbsp;</p>'
      }
    ],
    switchableServiceIds: '2',
    DefaultStateWithDeliveryExpanded: false,
    defaultStateWithWillCallExpanded: false,
    willCallMessage:
      '<p>A customer service representative will schedule delivery for the soonest available date/time and notify you via email. For help finding a similar product contact us at 855-346-3233 or via the Chat link found in your shopping cart.</p>',
    willCallTitle: '<h4>This item is backordered 6+ weeks.</h4>\n',
    callOrTextMessage:
      '<p>You will receive a call, text and email the evening prior to your delivery date with a two-hour delivery window.</p>',
    warningMessage:
      '<p>In home setup is recommended.</p><p>The items in your cart may weigh up to 200lbs.</p>',
    recommended: false,
    addKeyInPrice: true
  },
  {
    serviceName: 'Mattress Setup and Haul Away',
    serviceId: 2,
    serviceSku: '136906',
    serviceProductRecId: 5637148281,
    displayServiceSku: false,
    descriptionMessage:
      '<p>In-home setup and removal of your old mattresses.</p>',
    descriptionHyperlink: {},
    mattressesOrBoxSpring: '<3',
    adjustableBase: '0',
    switchableServiceIds: '1',
    DefaultStateWithDeliveryExpanded: false,
    defaultStateWithWillCallExpanded: true,
    willCallMessage:
      '<p>A customer service representative will schedule delivery for the soonest available date/time and notify you via email. For help finding a similar product contact us at 855-346-3233 or via the Chat link found in your shopping cart.</p>',
    willCallTitle: '<h4>This item is backordered 6+ weeks.</h4>\n',
    redeliveryMessage:
      '<h4>A person 18 years or older must be present to receive delivery.</h4>\n\n<p class="vfi-desktop" tabindex="0">If delivery is missed because you are not home during your scheduled delivery window, a $99.99 redelivery fee may be required before rescheduling a delivery.</p>',
    callOrTextMessage:
      '<p>You will receive a call, text and email the evening prior to your delivery date with a two-hour delivery window.</p>',
    warningMessage: '',
    recommended: false,
    childService: [
      {
        serviceName: 'High Gold',
        serviceSKU: '138378',
        productRectId: 5637149119,
        redeliveryMessage:
          '<h4>A person 18 years or older must be present to receive delivery.</h4>\n\n<p class="vfi-desktop" tabindex="0">If delivery is missed because you are not home during your scheduled delivery window, a $119.99 redelivery fee may be required before rescheduling a delivery.</p>',
        active: true,
        excludeZipCode: false,
        alternativeSolution: true
      },
      {
        serviceName: 'Low Gold',
        serviceSKU: '138377',
        productRectId: 5637149117,
        redeliveryMessage:
          '<h4>A person 18 years or older must be present to receive delivery.</h4>\n\n<p class="vfi-desktop" tabindex="0">If delivery is missed because you are not home during your scheduled delivery window, a $79.99 redelivery fee may be required before rescheduling a delivery.</p>',
        active: true,
        excludeZipCode: false,
        alternativeSolution: true
      }
    ]
  },
  {
    serviceName: 'Mattress Setup and Haul Away / Adj. Base',
    serviceId: 3,
    serviceSku: '135406',
    serviceProductRecId: 5637148272,
    displayServiceSku: false,
    active: true,
    descriptionMessage:
      '<p>In-home setup and removal of your old mattress(s). Set up includes up to&nbsp;3 mattress sets and&nbsp;adjustable bases.</p>',
    descriptionHyperlink: {
      destinationUrl: '/adjustable-beds-bases-guide.html',
      type: 'internalLink'
    },
    mattressesOrBoxSpring: '>=3',
    adjustableBase: '>0',
    switchableServiceIds: '1',
    DefaultStateWithDeliveryExpanded: false,
    defaultStateWithWillCallExpanded: true,
    willCallMessage:
      '<p>A customer service representative will schedule delivery for the soonest available date/time and notify you via email. For help finding a similar product contact us at 855-346-3233 or via the Chat link found in your shopping cart.</p>',
    willCallTitle: '<h4>This item is backordered 6+ weeks.</h4>\n',
    redeliveryMessage:
      '<h4>A person 18 years or older must be present to receive delivery.</h4>\n\n<p class="vfi-desktop" tabindex="0">If delivery is missed because you are not home during your scheduled delivery window, a $149.99 redelivery fee may be required before rescheduling a delivery.</p>',
    callOrTextMessage:
      '<p>You will receive a call, text and email the evening prior to your delivery date with a two-hour delivery window.</p>',
    recommended: false
  }
]
