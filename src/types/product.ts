export interface IProduct {
  RecordId: number
  ItemId: string
  Name: string
  Description: string
  ProductTypeValue: number
  DefaultUnitOfMeasure: string
  BasePrice: string
  Price: number
  AdjustedPrice: number
  IsGiftCard: boolean
  ProductNumber: string
  PrimaryImageUrl: string
  ItemTypeValue: number
  ItemServiceTypeValue: number
  Components: []
  Dimensions: IDimension[]
  Behavior: {
    HasSerialNumber: boolean
    IsDiscountAllowed: true
    IsManualDiscountAllowed: true
    IsKitDisassemblyAllowed: boolean
    IsNegativeQuantityAllowed: boolean
    IsReturnAllowed: true
    IsSaleAtPhysicalStoresAllowed: true
    IsZeroSalePriceAllowed: true
    KeyInPriceValue: number
    KeyInQuantityValue: number
    MustKeyInComment: boolean
    MustPrintIndividualShelfLabelsForVariants: boolean
    MustPromptForSerialNumberOnlyAtSale: boolean
    MustWeighProductAtSale: boolean
    ValidFromDateForSaleAtPhysicalStores: string
    ValidToDateForSaleAtPhysicalStores: string
    IsStorageDimensionGroupLocationActive: boolean
    IsStorageDimensionGroupLocationAllowBlankReceiptEnabled: boolean
    AllowNegativePhysicalInventory: boolean
    IsStockedProduct: true
    IsBlankSerialNumberAllowed: boolean
    IsBlankSerialNumberReceiptAllowed: boolean
    IsSerialNumberControlEnabled: boolean
    IsStorageDimensionGroupLocationBlankIssueAllowed: boolean
    IsSerialNumberRequired: boolean
    DefaultQuantity: number
    MaximumQuantity: number
    MinimumQuantity: number
    MultipleOfQuantity: number
    InventoryLocationId: string
    ExtensionProperties: []
  }
  LinkedProducts: []
  ExtensionProperties: []
}

export interface IProducts {
  value: IProduct[]
}

interface IDimension {
  DimensionTypeValue: number
  DimensionValue: {
    RecordId: number
    Value: string
    DimensionId: string
    ExtensionProperties: []
  }
  ExtensionProperties: []
}
