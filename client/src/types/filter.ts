export interface Filter {
  hasImage?: boolean;
  type?: string;
  orderType: string;
  priceFrom: number;
  priceTo?: number;
  street?: string;
  city?: string;
  country?: string;
  hasKitchen?: boolean;
  hasWorkZone?: boolean;
  hasParking?: boolean;
  hasGym?: boolean;
  hasWifi?: boolean;
  hasTV?: boolean;
  hasIron?: boolean;
  hasPool?: boolean;
  hasElevator?: boolean;
  sort: string;
  roomCount: number;
}
