export interface ICart {
  IsRequiredAmountPaid: boolean
  IsDiscountFullyCalculated: boolean
  IgnoreDiscountCalculation: boolean
  AmountDue: number
  AmountPaid: number
  IsTaxIncludedInPrice: boolean
  BeginDateTime: string
  CartTypeValue: number
  ChannelId: number
  ChargeAmount: number
  CustomerOrderRemainingBalance: number
  Comment: string
  InvoiceComment: string
  CustomerOrderModeValue: number
  DeliveryMode: string
  DiscountAmount: number
  DiscountAmountWithoutTax: number
  DiscountCodes: string[]
  Id: string
  TransactionTypeValue: number
  IncomeExpenseTotalAmount: number
  IsReturnByReceipt: boolean
  ReturnTransactionHasLoyaltyPayment: boolean
  IsFavorite: boolean
  IsRecurring: boolean
  IsSuspended: boolean
  LoyaltyCardId: string
  ModifiedDateTime: string
  AvailableDepositAmount: number
  PrepaymentAmountPaid: number
  PrepaymentRoundingDifference: number
  PrepaymentAppliedOnPickup: number
  PrepaymentAmountInvoiced: number
  PromotionLines: []
  RequiredDepositAmount: number
  RequiredDepositWithoutCarryoutAmount: number
  StaffId: string
  SubtotalAmount: number
  SubtotalAmountWithoutTax: number
  NetPrice: number
  SubtotalSalesAmount: number
  TaxAmount: number
  TaxOnCancellationCharge: number
  TaxOnShippingCharge: number
  TaxOnNonShippingCharges: number
  TerminalId: string
  TotalAmount: number
  TotalSalesAmount: number
  TotalReturnAmount: number
  TotalCarryoutSalesAmount: number
  TotalCustomerOrderSalesAmount: number
  TotalManualDiscountAmount: number
  TotalManualDiscountPercentage: number
  WarehouseId: string
  IsCreatedOffline: boolean
  CartStatusValue: number
  ReceiptTransactionTypeValue: number
  CommissionSalesGroup: string
  Version: number
  TotalItems: number
  HasTaxCalculationTriggered: boolean
  HasChargeCalculationTriggered: boolean
  ShippingChargeAmount: number
  OtherChargeAmount: number
  PeriodicDiscountsCalculateScopeValue: number
  TaxCalculationTypeValue: number
  AffiliationLines: []
  AttributeValues: []
  CartLines: ICartLine[]
  ChargeLines: []
  TaxViewLines: []
  Coupons: []
  CustomerAccountDepositLines: []
  IncomeExpenseLines: []
  ReasonCodeLines: []
  TenderLines: []
  RefundableTenderLines: []
  MerchantProperties: []
  FiscalTransactions: []
  ExtensionProperties: IExtensionProperty[]
}

export interface ICartLine {
  LineId: string
  ItemId: string
  Barcode: string
  EntryMethodTypeValue: number
  Description: string
  InventoryDimensionId: string
  Comment: string
  ProductId: number
  WarehouseId: string
  Quantity: number
  Price: number
  ExtendedPrice: number
  TaxAmount: number
  SalesTaxGroupId: string
  ItemTaxGroupId: string
  TotalAmount: number
  NetAmountWithoutTax: number
  NetPrice: number
  DiscountAmountWithoutTax: number
  DiscountAmount: number
  LineDiscount: number
  LinePercentageDiscount: number
  LineManualDiscountPercentage: number
  LineManualDiscountAmount: number
  UnitOfMeasureSymbol: 'EA'
  DeliveryMode: string
  IsWarrantyLine: boolean
  WarrantableTransactionId: string
  WarrantableSalesId: string
  WarrantableLineNumber: number
  WarrantableSerialNumber: string
  ReturnTransactionId: string
  ReturnLineNumber: number
  ReturnInventTransId: string
  IsVoided: boolean
  IsTaxOverideCodeTaxExempt: boolean
  IsGiftCardLine: boolean
  IsPriceKeyedIn: boolean
  GiftCardId: string
  GiftCardCurrencyCode: string
  GiftCardOperationValue: number
  GiftCardTypeValue: number
  SalesStatusValue: 1
  QuantityCanceled: number
  FulfillmentStoreId: string
  SerialNumber: string
  ElectronicDeliveryEmail: string
  ElectronicDeliveryEmailContent: string
  IsPriceOverridden: boolean
  IsInvoiceLine: boolean
  InvoiceId: string
  InvoiceAmount: number
  GiftCardBalance: number
  LineVersion: number
  PromotionLines: []
  RelatedDiscountedLineIds: []
  TaxRatePercent: number
  IsCustomerAccountDeposit: boolean
  LineNumber: number
  CommissionSalesGroup: string
  TrackingId: string
  StaffId: string
  CatalogId: number
  BarcodeEmbeddedPrice: number
  PriceInBarcode: boolean
  InvoiceTypeValue: number
  DetailedLineStatusValue: number
  SalesAgreementLineRecordId: number
  PriceLines: IPriceLine[]
  DiscountLines: IDiscountLine[]
  ReasonCodeLines: []
  ChargeLines: []
  TaxLines: ITaxLine[]
  ReturnTaxLines: []
  ExtensionProperties: []
  AttributeValues: ICartLineAttribute[]
  ThirdPartyGiftCardInfo: {
    Amount: number
    Authorization: string
    ExtensionProperties: []
  }
}

interface IPriceLine {
  RecordId: number
  Value: number
  PriceMethod: string
  OriginId: string
  PriceChangedByExtensions: boolean
  ExtensionProperties: []
}

interface IDiscountLine {
  SaleLineNumber: number
  OfferId: string
  OfferName: string
  OfferDescription: string
  Amount: number
  DiscountCost: number
  EffectiveAmount: number
  EffectivePercentage: number
  LineNumber: number
  Percentage: number
  DealPrice: number
  DiscountLineTypeValue: 2
  ManualDiscountTypeValue: number
  CustomerDiscountTypeValue: number
  PeriodicDiscountTypeValue: number
  DiscountApplicationGroup: string
  ConcurrencyModeValue: 1
  IsCompoundable: boolean
  DiscountCode: string
  PricingPriorityNumber: number
  PricingAttributeCombinationPriority: number
  IsDiscountCodeRequired: boolean
  ThresholdAmountRequired: number
  BundleId: number
  ValidFrom: string
  ValidTo: string
  ExtensionProperties: []
}

interface ITaxLine {
  TaxGroup: string
  Percentage: number
  IsExempt: boolean
  TaxBasis: number
  IsIncludedInPrice: boolean
  SaleLineNumber: number
  TaxCode: string
  Amount: number
  AmountRefunded: number
  IsTaxGroupRounding: boolean
  ExtensionProperties: []
}

interface IExtensionProperty {
  Key: string
  Value: {
    StringValue: string
  }
}

export interface IUpdateQuantityPayload {
  cartLines: ICartLine[]
  cartVersion: number | null
}

export interface ICartLineAttribute {
  ExtensionProperties: any[]
  Name: string
  TextValue: string
  TextValueTranslations: any[]
}
