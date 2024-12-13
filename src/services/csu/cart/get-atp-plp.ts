import HttpClient from '@/HttpClient'

export interface IMFIATPInventoryEntityPLP {
  Location1?: string;
  ItemId?: string;
  Variant?: string;
  VariantRecordId?: string;
  Zone?: string;
  ZoneId?: string;
  SlotDate?: string;
  StartTime?: string;
  EndTime?: string;
  Slots?: string;
  MFIATPLeadDate?: string;
  Available?: string;
  ATPQuantity?: string;
  SourceSystem?: string;
  IsTranscity?: boolean;
  IsNationWide?: boolean;
  ZipCodeGroupId?: string;
  ZoneLineId?: string;
}

export interface IMFIATPInventoryPLPResponse {
  ATPInventoryPLPData?: IMFIATPInventoryEntityPLP[];
  Message?: string;
}

export async function getAtpPlp(
  zipCode: string,
  productId: number,
  itemId: string,
  quantity: number,
  shippingInformation: Promise<string>
): Promise<IMFIATPInventoryPLPResponse> {
  const body = {
    deliveryScheduleParam: {
      Weeks: 6,
      InventoryType: await shippingInformation,
      StoreId: '',
      RequestedDate: '05/28/2024',
      ZipCode: zipCode,
      ItemLines: [
        { ItemId: itemId, Quantity: quantity, VariantRecordId: `${productId}` }
      ],
      CustomerRequestTime: '05/28/2024 15:53:25',
      Id: 0,
      NoOfPriorityDC: 0
    }
  }
  return await HttpClient(
    `/Commerce/ATP/MFIATPInventoryPLP?api-version=7.3`,
    'POST',
    body
  )
}
