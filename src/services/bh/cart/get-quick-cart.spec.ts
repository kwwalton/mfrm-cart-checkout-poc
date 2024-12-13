/**
 * @jest-environment jest-environment-node
 */

import { getQuickCart } from '@/services/bh/cart/get-quick-cart'
import { ApolloClient } from '@apollo/client'


jest.mock('@apollo/experimental-nextjs-app-support', () => ({
  ...jest.requireActual('@apollo/experimental-nextjs-app-support'),
  registerApolloClient: jest.fn((x: () => ApolloClient<unknown>) => {
    /* eslint-disable no-var */
    var client: ApolloClient<unknown>
    // @ts-expect-error simulating caching with var global
    if (!client) {
      client = x()
    }
    return { getClient: () => client }
  })
}))


describe('getQuickCart', () => {
  fetchMock.disableMocks()
  it('should return an empty array', async () => {
    console.time('default')
    const cart = await getQuickCart('76b530d1-b0dc-4e82-b069-63a8e53a6290', '94041')
    console.timeLog('default', 'cart', cart)
    expect(cart).toStrictEqual(TEST_CART)
    // @ts-ignore
    const items = await cart.items
    console.timeLog('default', 'items', items)
    expect(items).toStrictEqual(TEST_ITEMS)
    // // @ts-ignore
    const delivery = []
    for (const i of items) {
      const variantDelivery = await i.variantDelivery
      const variantInMarket = await i.variantInMarket
      const variantInStock = await i.variantInStock
      console.timeLog('default', 'dd', variantDelivery, variantInMarket, variantInStock)

      delivery.push({
        id: i.id,
        variantDelivery,
        variantInMarket,
        variantInStock
      })
    }
    console.timeLog('default', 'delivery', delivery)
    // @ts-ignore
    expect(delivery).toStrictEqual(TEST_DELIVERY)
    console.timeEnd('default')
    console.timeEnd('getQuickCart')
  }, 60000)

})
const TEST_CART = {
  count: 3,
  coupons: [{ id: 'WELCOME', type: 'BASIC', '__typename': 'CartCoupon' }],
  discount: 35,
  dynamicsVersion: expect.anything(),
  id: '76b530d1-b0dc-4e82-b069-63a8e53a6290',
  items: expect.any(Promise),
  subTotal: 1314.97,
  recyclingFee: 0,
  tax: 0,
  total: 1349.97,
  '__typename': 'Cart'
}
const TEST_ITEMS = [
  {
    categoryId: '5637147593',
    categoryName: 'Bedding',
    categoryUrl: 'https://dev-sit.mattressfirm.com/bedding/5637147593.c',
    count: 1,
    coupons: [{
      __typename: 'CartCoupon',
      id: 'WELCOME',
      type: 'BASIC'
    }],
    id: '78053ea206674acea293502e6f67101d',
    price: 49.99,
    productBadges: [
      {
        __typename: 'UIBadge',
        label: 'Limited Availability',
        type: 'SALE'
      }
    ],
    productBrand: 'Tulo',
    productEyebrow: 'BEST_SELLER',
    productImage: 'https://images-us-prod.cms.dynamics365commerce.ms/cms/api/cncgmclkfv/imageFileData/search?fileName=/Products/140884P_000_001.png&fallback=/Products/140884P_000_001.png,Product-Fallback-Image.png&w=276&h=207&q=80&m=6&f=jpg&cropfocalregion=true',
    productName: 'Tulo Smooth Waterproof Mattress Protector',
    productPromo: null,
    productRating: 4.2491,
    productRatingCount: 2332,
    productUrl: 'https://dev-sit.mattressfirm.com/tulo-smooth-waterproof-mattress-protector/5637231577.p?variantid=5637231593',
    variantAttributes: ['Queen', 'White'],
    variantOriginalPrice: 49.99,
    variantPrice: 49.99,
    variantType: 'SMALL_PARCEL',
    variantUrl: 'https://dev-sit.mattressfirm.com/tulo-smooth-waterproof-mattress-protector/5637231577.p?variantid=5637231593',
    __typename: 'CartItem',
    productId: '5637231577',
    itemID: '140884P',
    barCode: 'V000260773',
    variantId: '5637231593',
    variantDelivery: expect.any(Promise),
    variantInMarket: expect.any(Promise),
    variantInStock: expect.any(Promise)
  },
  {
    categoryId: '5637147600',
    categoryName: 'Mattresses',
    categoryUrl: 'https://dev-sit.mattressfirm.com/mattresses/5637147600.c',
    count: 1,
    coupons: [],
    id: 'dc807ee9d74f46d1a3da44c081f297cd',
    price: 999.99,
    productBadges: [],
    productBrand: 'Serta',
    productEyebrow: 'BEST_SELLER',
    productImage: 'https://images-us-prod.cms.dynamics365commerce.ms/cms/api/cncgmclkfv/imageFileData/search?fileName=/Products/143981P_000_001.png&fallback=/Products/143981P_000_001.png,Product-Fallback-Image.png&w=276&h=207&q=80&m=6&f=jpg&cropfocalregion=true',
    productName: 'Serta Perfect Sleeper® Elkins III 10" Firm Mattress',
    productPromo: null,
    productRating: 3.9843,
    productRatingCount: 1340,
    productUrl: 'https://dev-sit.mattressfirm.com/serta-perfect-sleeper-elkins-iii-10-firm-mattress/5637465578.p?variantid=5637465595',
    variantAttributes: ['Queen'],
    variantOriginalPrice: 999.99,
    variantPrice: 999.99,
    variantType: 'DELIVERY',
    variantUrl: 'https://dev-sit.mattressfirm.com/serta-perfect-sleeper-elkins-iii-10-firm-mattress/5637465578.p?variantid=5637465595',
    __typename: 'CartItem',
    productId: '5637465578',
    itemID: '143981P',
    barCode: 'V000272087',
    variantId: '5637465595',
    variantDelivery: expect.any(Promise),
    variantInMarket: expect.any(Promise),
    variantInStock: expect.any(Promise)
  },
  {
    categoryId: '5637147587',
    categoryName: 'Box Springs & Bed Bases',
    categoryUrl: 'https://dev-sit.mattressfirm.com/box-springs-bed-bases/5637147587.c',
    count: 1,
    coupons: [{
      '__typename': 'CartCoupon',
      id: 'WELCOME',
      type: 'BASIC'
    }],
    id: '29b48be9868a41c9bd17948a1d8b236b',
    price: 299.99,
    productBadges: [],
    productBrand: 'Sleepy\'s',
    productEyebrow: 'EXCLUSIVE',
    productImage: 'https://images-us-prod.cms.dynamics365commerce.ms/cms/api/cncgmclkfv/imageFileData/search?fileName=/Products/143806P_000_001.png&fallback=/Products/143806P_000_001.png,Product-Fallback-Image.png&w=276&h=207&q=80&m=6&f=jpg&cropfocalregion=true',
    productName: 'Sleepy\'s Basic Adjustable Base',
    productPromo: '<b>FREE</b> with select mattress purchase<sup>3</sup>.',
    productRating: 3.9002,
    productRatingCount: 2234,
    productUrl: 'https://dev-sit.mattressfirm.com/sleepys-basic-adjustable-base/5637401826.p?variantid=5637401081',
    variantAttributes: ['Queen', 'Adj'],
    variantOriginalPrice: 299.99,
    variantPrice: 299.99,
    variantType: 'DELIVERY',
    variantUrl: 'https://dev-sit.mattressfirm.com/sleepys-basic-adjustable-base/5637401826.p?variantid=5637401081',
    __typename: 'CartItem',
    productId: '5637401826',
    itemID: '143806P',
    barCode: 'V000269607',
    variantId: '5637401081',
    variantDelivery: expect.any(Promise),
    variantInMarket: expect.any(Promise),
    variantInStock: expect.any(Promise)
  }
]
const TEST_DELIVERY = [{
  id: '78053ea206674acea293502e6f67101d',
  variantDelivery: {
    __typename: 'LocalDateRange',
    end: '2024-07-26',
    label: 'Jul 23 to Jul 26',
    start: '2024-07-23'
  },
  variantInMarket: true,
  variantInStock: false
},
  {
    id: 'dc807ee9d74f46d1a3da44c081f297cd',
    variantDelivery: null,
    variantInMarket: true,
    variantInStock: true
  },
  {
    id: '29b48be9868a41c9bd17948a1d8b236b',
    variantDelivery: null,
    variantInMarket: true,
    variantInStock: true
  }]
