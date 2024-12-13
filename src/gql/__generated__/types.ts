export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  HexColorCode: { input: string; output: string; }
  LocalDate: { input: string; output: string; }
  LocalDateTime: { input: string; output: string; }
  NonNegativeFloat: { input: number; output: number; }
  NonNegativeInt: { input: number; output: number; }
  PositiveFloat: { input: number; output: number; }
  PositiveInt: { input: number; output: number; }
  URL: { input: string; output: string; }
  UUID: { input: string; output: string; }
  ZipCode: { input: string; output: string; }
};

/** Defining cart fields. */
export type Cart = {
  __typename?: 'Cart';
  /** Total cart count */
  count: Scalars['NonNegativeInt']['output'];
  /** Cart Coupon */
  coupons: Array<CartCoupon>;
  /** Product discount */
  discount: Scalars['NonNegativeFloat']['output'];
  /** Dynamics cart version */
  dynamicsVersion: Scalars['PositiveInt']['output'];
  /** Required cart id */
  id: Scalars['String']['output'];
  /** Cart Item */
  items: Array<CartItem>;
  /** Recycling fee */
  recyclingFee: Scalars['NonNegativeFloat']['output'];
  /** Product total */
  subTotal: Scalars['PositiveFloat']['output'];
  /** Sales tax */
  tax: Scalars['NonNegativeFloat']['output'];
  /** Grand Total */
  total: Scalars['PositiveFloat']['output'];
};

/** Response for cart add coupon */
export type CartAddCouponResponse = CartResponse & {
  __typename?: 'CartAddCouponResponse';
  /** Cart data */
  cart: Cart;
  /** Response code */
  code: CartAddCouponResponseCode;
};

/** Response code for cart add coupon */
export enum CartAddCouponResponseCode {
  /** Coupon cannot be used with others */
  Exclusive = 'EXCLUSIVE',
  /** Coupon has expired */
  Expired = 'EXPIRED',
  /** Coupon is not applicable to cart */
  Invalid = 'INVALID',
  /** Coupon has reached use limit */
  Limit = 'LIMIT',
  /** Coupon successfully added */
  Ok = 'OK'
}

/** Response for cart add item */
export type CartAddItemResponse = CartResponse & {
  __typename?: 'CartAddItemResponse';
  /** Cart data */
  cart: Cart;
  /** Response code */
  code: CartAddItemResponseCode;
};

/** Response code for cart add item */
export enum CartAddItemResponseCode {
  /** Item successfully updated */
  Ok = 'OK'
}

export type CartCoupon = {
  __typename?: 'CartCoupon';
  /** Coupon ID */
  id: Scalars['String']['output'];
  /** Coupon type */
  type: CartCouponType;
};

/** Cart coupon type */
export enum CartCouponType {
  /** Basic coupon */
  Basic = 'BASIC',
  /** Bonus item coupon */
  BonusItem = 'BONUS_ITEM'
}

/** Cart item representing product(s) in the cart */
export type CartItem = Product & ProductCategory & ProductVariant & {
  __typename?: 'CartItem';
  /** Category id */
  categoryId: Scalars['String']['output'];
  /** Category name */
  categoryName: Scalars['String']['output'];
  /** Category name */
  categoryUrl: Scalars['URL']['output'];
  /** Required count value */
  count: Scalars['NonNegativeInt']['output'];
  /** Product coupons */
  coupons: Array<CartCoupon>;
  /** Cart item Id */
  id: Scalars['String']['output'];
  /** Current product price */
  price: Scalars['PositiveFloat']['output'];
  /** Product badges */
  productBadges: Array<UiBadge>;
  /** Product brand name */
  productBrand: Scalars['String']['output'];
  /** Optional Eyebrow type */
  productEyebrow: Maybe<ProductEyebrowType>;
  /** Product item ID */
  productId: Scalars['ID']['output'];
  /** URL linking to the product image */
  productImage: Scalars['URL']['output'];
  /** Category name */
  productName: Scalars['String']['output'];
  /** Optional product message description in HTML format. */
  productPromo: Maybe<Scalars['String']['output']>;
  /** Average product rating. */
  productRating: Scalars['NonNegativeFloat']['output'];
  /** Product rating count. */
  productRatingCount: Scalars['NonNegativeInt']['output'];
  /** Link tp product detail */
  productUrl: Scalars['URL']['output'];
  /** Product variant attributes */
  variantAttributes: Array<Scalars['String']['output']>;
  /** Product variant delivery estimate */
  variantDelivery: Maybe<LocalDateRange>;
  /** Product variant ID */
  variantId: Scalars['ID']['output'];
  /** Product variant is in market if true */
  variantInMarket: Scalars['Boolean']['output'];
  /** Product variant is in stock if true */
  variantInStock: Scalars['Boolean']['output'];
  /** Original product variant price, indicating discount */
  variantOriginalPrice: Scalars['PositiveFloat']['output'];
  /** Current product variant price */
  variantPrice: Scalars['PositiveFloat']['output'];
  /** Product variant type */
  variantType: ProductType;
  /** Link tp product variant page */
  variantUrl: Scalars['URL']['output'];
};


/** Cart item representing product(s) in the cart */
export type CartItemProductIdArgs = {
  type: InputMaybe<ProductIdType>;
};


/** Cart item representing product(s) in the cart */
export type CartItemVariantDeliveryArgs = {
  zip: Scalars['ZipCode']['input'];
};


/** Cart item representing product(s) in the cart */
export type CartItemVariantIdArgs = {
  type: InputMaybe<ProductIdType>;
};


/** Cart item representing product(s) in the cart */
export type CartItemVariantInMarketArgs = {
  zip: Scalars['ZipCode']['input'];
};


/** Cart item representing product(s) in the cart */
export type CartItemVariantInStockArgs = {
  zip: Scalars['ZipCode']['input'];
};

/** Response for cart remove coupon */
export type CartRemoveCouponResponse = CartResponse & {
  __typename?: 'CartRemoveCouponResponse';
  /** Cart data */
  cart: Cart;
  /** Response code */
  code: CartRemoveCouponResponseCode;
};

/** Response code for cart remove coupon */
export enum CartRemoveCouponResponseCode {
  /** Coupon successfully removed */
  Ok = 'OK'
}

/** Response for cart remove item */
export type CartRemoveItemResponse = CartResponse & {
  __typename?: 'CartRemoveItemResponse';
  /** Cart data */
  cart: Cart;
  /** Response code */
  code: CartRemoveItemResponseCode;
};

/** Response code for cart remove item */
export enum CartRemoveItemResponseCode {
  /** Item successfully removed */
  Ok = 'OK'
}

/** Response for cart mutation */
export type CartResponse = {
  /** Cart data */
  cart: Cart;
};

/** Response for cart update item */
export type CartUpdateItemResponse = CartResponse & {
  __typename?: 'CartUpdateItemResponse';
  /** Cart data */
  cart: Cart;
  /** Response code */
  code: CartUpdateItemResponseCode;
};

/** Response code for cart update item */
export enum CartUpdateItemResponseCode {
  /** Item successfully updated */
  Ok = 'OK'
}

/** Local date range */
export type LocalDateRange = {
  __typename?: 'LocalDateRange';
  /** End date */
  end: Scalars['LocalDate']['output'];
  /** Formatted date range */
  label: Scalars['String']['output'];
  /** Start date */
  start: Scalars['LocalDate']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add coupon to cart */
  cartAddCoupon: CartAddCouponResponse;
  /** Add item in cart */
  cartAddItem: CartAddItemResponse;
  /** Remove coupon from cart */
  cartRemoveCoupon: CartRemoveCouponResponse;
  /** Remove item from cart */
  cartRemoveItem: CartRemoveItemResponse;
  /** Update item in cart */
  cartUpdateItem: CartUpdateItemResponse;
  /**
   * Sync ached SiteBuilder data. If true, sync was successful.
   * @deprecated Only uused internally, may be removed
   */
  syncSiteBuilder: Scalars['Boolean']['output'];
};


export type MutationCartAddCouponArgs = {
  cartId: Scalars['ID']['input'];
  coupon: Scalars['ID']['input'];
  token: InputMaybe<Scalars['String']['input']>;
};


export type MutationCartAddItemArgs = {
  cartId: Scalars['ID']['input'];
  count: Scalars['PositiveInt']['input'];
  productId: Scalars['ID']['input'];
  token: InputMaybe<Scalars['String']['input']>;
  variantId: Scalars['ID']['input'];
};


export type MutationCartRemoveCouponArgs = {
  cartId: Scalars['ID']['input'];
  coupon: Scalars['ID']['input'];
  token: InputMaybe<Scalars['String']['input']>;
};


export type MutationCartRemoveItemArgs = {
  cartId: Scalars['ID']['input'];
  cartItemId: Scalars['ID']['input'];
  token: InputMaybe<Scalars['String']['input']>;
};


export type MutationCartUpdateItemArgs = {
  cartId: Scalars['ID']['input'];
  cartItemId: Scalars['ID']['input'];
  count: Scalars['PositiveInt']['input'];
  token: InputMaybe<Scalars['String']['input']>;
};

/** Product data */
export type Product = {
  /** Product badges */
  productBadges: Array<UiBadge>;
  /** Product brand name */
  productBrand: Scalars['String']['output'];
  /** Optional Eyebrow type */
  productEyebrow: Maybe<ProductEyebrowType>;
  /** Product item ID */
  productId: Scalars['ID']['output'];
  /** URL linking to the product image */
  productImage: Scalars['URL']['output'];
  /** Category name */
  productName: Scalars['String']['output'];
  /** Optional product message description in HTML format. */
  productPromo: Maybe<Scalars['String']['output']>;
  /** Average product rating. */
  productRating: Scalars['NonNegativeFloat']['output'];
  /** Product rating count. */
  productRatingCount: Scalars['NonNegativeInt']['output'];
  /** Link tp product detail */
  productUrl: Scalars['URL']['output'];
};


/** Product data */
export type ProductProductIdArgs = {
  type: InputMaybe<ProductIdType>;
};

/** Product category */
export type ProductCategory = {
  /** Category id */
  categoryId: Scalars['String']['output'];
  /** Category name */
  categoryName: Scalars['String']['output'];
  /** Category name */
  categoryUrl: Scalars['URL']['output'];
};

/** Mattress Firm product Eyebrow type. */
export enum ProductEyebrowType {
  /** Product best seller */
  BestSeller = 'BEST_SELLER',
  /** Mattress Firm exclusive */
  Exclusive = 'EXCLUSIVE',
  /** Sleep expert */
  SleepExpert = 'SLEEP_EXPERT',
  /** Sleep score */
  SleepScore = 'SLEEP_SCORE'
}

/** Product ID types supported. */
export enum ProductIdType {
  /** MSFT Dynamics based ID */
  Dynamics = 'DYNAMICS',
  /** Mattress Firm bassed ID */
  Mfrm = 'MFRM'
}

/** Product size */
export enum ProductSize {
  /** California King size */
  CaliforniaKing = 'CALIFORNIA_KING',
  /** Full size */
  Full = 'FULL',
  /** King size */
  King = 'KING',
  /** Queen size */
  Queen = 'QUEEN',
  /** Split California King size */
  SplitCaliforniaKing = 'SPLIT_CALIFORNIA_KING',
  /** Twin size */
  Twin = 'TWIN',
  /** Twin XL size */
  TwinXl = 'TWIN_XL'
}

/** Mattress Firm product type. */
export enum ProductType {
  /** Delivery product type. */
  Delivery = 'DELIVERY',
  /** Dropship product type. */
  Dropship = 'DROPSHIP',
  /** Small partcel product type. */
  SmallParcel = 'SMALL_PARCEL'
}

/** Product variant */
export type ProductVariant = {
  /** Product variant attributes */
  variantAttributes: Array<Scalars['String']['output']>;
  /** Product variant delivery estimate */
  variantDelivery: Maybe<LocalDateRange>;
  /** Product variant ID */
  variantId: Scalars['ID']['output'];
  /** Product variant is in market if true */
  variantInMarket: Scalars['Boolean']['output'];
  /** Product variant is in stock if true */
  variantInStock: Scalars['Boolean']['output'];
  /** Original product variant price, indicating discount */
  variantOriginalPrice: Scalars['PositiveFloat']['output'];
  /** Current product variant price */
  variantPrice: Scalars['PositiveFloat']['output'];
  /** Product variant type */
  variantType: ProductType;
  /** Link tp product variant page */
  variantUrl: Scalars['URL']['output'];
};


/** Product variant */
export type ProductVariantVariantDeliveryArgs = {
  zip: Scalars['ZipCode']['input'];
};


/** Product variant */
export type ProductVariantVariantIdArgs = {
  type: InputMaybe<ProductIdType>;
};


/** Product variant */
export type ProductVariantVariantInMarketArgs = {
  zip: Scalars['ZipCode']['input'];
};


/** Product variant */
export type ProductVariantVariantInStockArgs = {
  zip: Scalars['ZipCode']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Cart related data. */
  cart: Cart;
  /**
   * ID tied to this request
   * @deprecated Read from header `x-request-id`
   */
  requestId: Scalars['UUID']['output'];
  /** UI related data. */
  ui: UiQuery;
};


export type QueryCartArgs = {
  cartId: Scalars['ID']['input'];
  token: InputMaybe<Scalars['String']['input']>;
};

/** UI action */
export type UiAction = UiActionInterface & {
  __typename?: 'UIAction';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Action label */
  label: Scalars['String']['output'];
};

/** UI action */
export type UiActionInterface = {
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Action label */
  label: Scalars['String']['output'];
};

export type UiBadge = {
  __typename?: 'UIBadge';
  /** Badge label */
  label: Scalars['String']['output'];
  /** Optional badge type */
  type: UiBadgeType;
};

/** Badge styling type */
export enum UiBadgeType {
  /** Conversational non-urgent badge. */
  Conversational = 'CONVERSATIONAL',
  /** New item related badge. */
  New = 'NEW',
  /** Sale related badge. */
  Sale = 'SALE',
  /** Urgent related badge. */
  Urgency = 'URGENCY'
}

/** Best for reasons for a product. */
export type UiBestFor = {
  __typename?: 'UIBestFor';
  /** List denoting reasons to buy. */
  descriptions: Array<Scalars['String']['output']>;
  /** Title for best for section. */
  title: Scalars['String']['output'];
};

/** Color varant information. */
export type UiColorVariant = {
  __typename?: 'UIColorVariant';
  /** Hex color value. */
  color: Scalars['HexColorCode']['output'];
  /** Color name. */
  name: Scalars['String']['output'];
  /** URL link for product detail with variant. */
  url: Scalars['URL']['output'];
};

/** UI date range */
export type UiDateRange = {
  __typename?: 'UIDateRange';
  /** End date/time in ISO string */
  end: Scalars['LocalDateTime']['output'];
  /** Start date/time in ISO string */
  start: Scalars['LocalDateTime']['output'];
};

/** UI disclosure */
export type UiDisclosure = {
  __typename?: 'UIDisclosure';
  /** Maximum number of characters to display */
  maximum: Scalars['Float']['output'];
  /** Action to expand items */
  more: UiAction;
  /** Disclosure sections */
  sections: Array<UiDisclosureSection>;
};

/** UI disclosure section */
export type UiDisclosureSection = {
  __typename?: 'UIDisclosureSection';
  /** HTML content for disclosure */
  html: Scalars['String']['output'];
  /** If true truncate disclosure */
  truncate: Scalars['Boolean']['output'];
};

/** Eyebrow messaging type. */
export type UiEyebrow = {
  __typename?: 'UIEyebrow';
  /** Eyebrow label to display. */
  label: Scalars['String']['output'];
  /** Eyebrow type, typically used for icon. */
  type: UiEyebrowType;
};

/** Eyebrow messaging type. */
export enum UiEyebrowType {
  /** Product best seller. */
  BestSeller = 'BEST_SELLER',
  /** Mattress Firm exclusive. */
  Exclusive = 'EXCLUSIVE',
  /** Sleep expert. */
  SleepExpert = 'SLEEP_EXPERT',
  /** Sleep score. */
  SleepScore = 'SLEEP_SCORE'
}

/** UI footer */
export type UiFooter = {
  __typename?: 'UIFooter';
  /** Accessibility reader link */
  accessibilityReader: UiImageLink;
  /** Footer categories */
  categories: Array<UiFooterCategory>;
  /** Footer social media links */
  socials: Array<UiImageLink>;
};

/** UI footer category */
export type UiFooterCategory = {
  __typename?: 'UIFooterCategory';
  /** Footer category items */
  items: Array<UiLink>;
  /** Footer category label */
  label: Scalars['String']['output'];
};

/** UI header */
export type UiHeader = {
  __typename?: 'UIHeader';
  /** Header account related data */
  account: UiHeaderAccount;
  /**
   * Header account menu
   * @deprecated Use account field
   */
  accountMenu: Array<UiHeaderAccountMenu>;
  /** Header actions */
  actions: Array<UiHeaderAction>;
  /** Header logo */
  logo: UiImageLink;
  /** Header search */
  search: UiHeaderSearch;
};

/** UI header account */
export type UiHeaderAccount = {
  __typename?: 'UIHeaderAccount';
  /** My account link */
  myAccount: UiLink;
  /** Sign in link */
  signIn: UiLink;
  /** Sign out link */
  signOut: UiLink;
  /** Sign up link */
  signUp: UiLink;
};

/** UI header account menu */
export type UiHeaderAccountMenu = UiLinkInterface & {
  __typename?: 'UIHeaderAccountMenu';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Callout item flag */
  callout: Scalars['Boolean']['output'];
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Reveal if signed in (otherwise reveal if signed out) */
  signedIn: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI header action */
export type UiHeaderAction = UiLinkInterface & {
  __typename?: 'UIHeaderAction';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /**
   * Show action to the left of logo
   * @deprecated Use position field
   */
  beforeLogo: Scalars['Boolean']['output'];
  /** Callout text flag */
  callout: Scalars['Boolean']['output'];
  /** Show action in desktop view */
  desktop: Scalars['Boolean']['output'];
  /** Show action in small desktop view */
  desktopSmall: Scalars['Boolean']['output'];
  /** Action icon image */
  image: Maybe<UiImage>;
  /** Link label */
  label: Scalars['String']['output'];
  /** Show action in mobile view */
  mobile: Scalars['Boolean']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Position of action relstive to top navigation */
  position: Maybe<UiHeaderActionPosition>;
  /** Show action when scrolling */
  sticky: Scalars['Boolean']['output'];
  /** Optional subtext under label */
  subLabel: Maybe<Scalars['String']['output']>;
  /** Show action in tablet view */
  tablet: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** Position of action relative to header */
export enum UiHeaderActionPosition {
  /** Before logo location */
  BeforeLogo = 'BEFORE_LOGO',
  /** Bottom of top navigation for mobile view */
  Bottom = 'BOTTOM'
}

/** UI header search */
export type UiHeaderSearch = {
  __typename?: 'UIHeaderSearch';
  /** Search icon */
  icon: UiImage;
  /** Search placeholder */
  placeholder: Scalars['String']['output'];
  /** Search results URL */
  url: Scalars['URL']['output'];
};

/** UI image */
export type UiImage = {
  __typename?: 'UIImage';
  /** Optional alt text. */
  alt: Maybe<Scalars['String']['output']>;
  /** Image URL */
  url: Scalars['String']['output'];
};

/** UI link */
export type UiImageLink = UiLinkInterface & {
  __typename?: 'UIImageLink';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Link image */
  image: UiImage;
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI link */
export type UiLink = UiLinkInterface & {
  __typename?: 'UILink';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI link interface */
export type UiLinkInterface = {
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** Link type denoting special functionality */
export enum UiLinkType {
  /** Account related functionality */
  Account = 'ACCOUNT',
  /** Cart related functionality */
  Cart = 'CART',
  /** Chat realted functionality */
  Chat = 'CHAT',
  /** Stores related functionality */
  Stores = 'STORES'
}

/** UI navbar */
export type UiNavbar = {
  __typename?: 'UINavbar';
  /** Product menu elements */
  products: Array<UiProductMenuUnion>;
  /** Utility menu elements */
  utilities: Array<UiLink>;
};

/** UI pencil banner */
export type UiPencilBanner = {
  __typename?: 'UIPencilBanner';
  /** Banner interval (in ms) */
  interval: Scalars['Int']['output'];
  /** Banner items */
  items: Array<UiPencilBannerItem>;
  /** Next action */
  next: UiPencilBannerAction;
  /** Previous action */
  previous: UiPencilBannerAction;
};

/** UI pencil banner action */
export type UiPencilBannerAction = UiActionInterface & {
  __typename?: 'UIPencilBannerAction';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Action image */
  image: UiImage;
  /** Action label */
  label: Scalars['String']['output'];
};

/** UI pencil banner item */
export type UiPencilBannerItem = UiLinkInterface & {
  __typename?: 'UIPencilBannerItem';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Optional countdown date/time range */
  countdown: Maybe<UiDateRange>;
  /** Additional HTML content for banner */
  html: Scalars['String']['output'];
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional schedule date/time range */
  schedule: Maybe<UiDateRange>;
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI product menu */
export type UiProductMenu = {
  __typename?: 'UIProductMenu';
  /** Optional CTA */
  action: Maybe<UiLink>;
  /** Optional badge indicator */
  badge: Maybe<UiBadge>;
  /** Callout item flag */
  callout: Scalars['Boolean']['output'];
  /** Product categories */
  categories: Array<UiProductMenuCategory>;
  /** Menu item label */
  label: Scalars['String']['output'];
  /** Optional promotion */
  promotion: Maybe<UiImageLink>;
  /** Product subcategories */
  subcategories: Array<UiProductMenuSubcategory>;
};

/** UI product menu category */
export type UiProductMenuAccordion = {
  __typename?: 'UIProductMenuAccordion';
  /** Action to collapse items */
  less: UiAction;
  /** Maximum number of category items to initially reveal */
  maximum: Scalars['Int']['output'];
  /** Action to expand items */
  more: UiAction;
};

/** UI product menu category */
export type UiProductMenuCategory = {
  __typename?: 'UIProductMenuCategory';
  /** Optional accordion */
  accordion: Maybe<UiProductMenuAccordion>;
  /** Category items */
  items: Array<UiProductMenuCategoryItem>;
  /** Optional category label */
  label: Maybe<Scalars['String']['output']>;
};

/** UI product menu category item */
export type UiProductMenuCategoryItem = UiLinkInterface & {
  __typename?: 'UIProductMenuCategoryItem';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Optional badge indicator */
  badge: Maybe<UiBadge>;
  /** Category item image */
  image: UiImage;
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI product menu as link */
export type UiProductMenuLink = UiLinkInterface & {
  __typename?: 'UIProductMenuLink';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Optional badge indicator */
  badge: Maybe<UiBadge>;
  /** Callout item flag */
  callout: Scalars['Boolean']['output'];
  /** Rich text label */
  html: Scalars['String']['output'];
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI product menu subcategory */
export type UiProductMenuSubcategory = {
  __typename?: 'UIProductMenuSubcategory';
  /** Subcategory items */
  items: Array<UiProductMenuSubcategoryItem>;
  /** Subcategory label */
  label: Scalars['String']['output'];
};

/** UI product menu subcategory item */
export type UiProductMenuSubcategoryItem = UiLinkInterface & {
  __typename?: 'UIProductMenuSubcategoryItem';
  /** Optional ARIA label */
  ariaLabel: Maybe<Scalars['String']['output']>;
  /** Optional badge indicator */
  badge: Maybe<UiBadge>;
  /** Optional subcategory item image */
  image: Maybe<UiImage>;
  /** Link label */
  label: Scalars['String']['output'];
  /** If true open link in new tab */
  openInNewTab: Scalars['Boolean']['output'];
  /** Optional link type (if present treat url as fallback) */
  type: Maybe<UiLinkType>;
  /** Link URL */
  url: Scalars['URL']['output'];
};

/** UI product menu category union */
export type UiProductMenuUnion = UiProductMenu | UiProductMenuLink;

/** UI product tile */
export type UiProductTile = {
  __typename?: 'UIProductTile';
  /** Optional badge for product. */
  badge: Maybe<UiBadge>;
  /** Optional best for details for product. */
  bestFor: Maybe<UiBestFor>;
  /** Optional list of available color variants. */
  colorVariants: Maybe<Array<UiColorVariant>>;
  /** Optional delivery estimate. If not available it is unknown. */
  deliveryEstimate: Maybe<Scalars['String']['output']>;
  /** Optional eyebrow type. */
  eyebrow: Maybe<UiEyebrow>;
  /** Optional badge for product. */
  image: UiImage;
  /** If true, product is available in store. */
  inStore: Scalars['Boolean']['output'];
  /** Product display name. */
  name: Scalars['String']['output'];
  /** Original product price. */
  originalPrice: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** Current product price. */
  price: Scalars['NonNegativeFloat']['output'];
  /** Optional price badge. */
  priceBadge: Maybe<UiBadge>;
  /** Optional product message description in HTML format. */
  promo: Maybe<Scalars['String']['output']>;
  /** Average product rating. */
  rating: Scalars['NonNegativeFloat']['output'];
  /** Product rating count. */
  ratingCount: Scalars['NonNegativeInt']['output'];
  /** Link to product page */
  url: Scalars['URL']['output'];
  /** Optional label describing product variants. (size, color, etc.) */
  variantsLabel: Maybe<Scalars['String']['output']>;
};

/** UI query */
export type UiQuery = {
  __typename?: 'UIQuery';
  /** UI disclosure banner */
  disclosure: UiDisclosure;
  /** UI footer */
  footer: UiFooter;
  /** UI header */
  header: UiHeader;
  /** UI navbar */
  navbar: UiNavbar;
  /** UI pencil banner */
  pencilBanner: UiPencilBanner;
  /** UI product tiles by product */
  productTiles: Array<UiProductTile>;
  /** UI product tiles by category */
  productTilesByCategory: Array<UiProductTile>;
};


/** UI query */
export type UiQueryProductTilesArgs = {
  productIds: Array<Scalars['ID']['input']>;
  size: InputMaybe<ProductSize>;
  storeId: InputMaybe<Scalars['ID']['input']>;
  zip: InputMaybe<Scalars['ZipCode']['input']>;
};


/** UI query */
export type UiQueryProductTilesByCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  size: InputMaybe<ProductSize>;
  storeId: InputMaybe<Scalars['ID']['input']>;
  zip: InputMaybe<Scalars['ZipCode']['input']>;
};
