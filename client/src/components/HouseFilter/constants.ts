import { Filter } from "src/types/filter";
import { ORDER_TYPES } from "src/types/order";

export enum SORTS {
  PRICE_UP = 'PRICE_UP',
  PRICE_DOWN = 'PRICE_DOWN'
}

export const defautFilter: Filter = {
  hasImage: false,
  type: '',
  orderType: ORDER_TYPES.RENT,
  street: '',
  city: '',
  country: '',
  priceFrom: 0,
  priceTo: 1000000,
  sort: SORTS.PRICE_UP,
  roomCount: 0,
  hasKitchen: false,
  hasWorkZone: false,
  hasParking: false,
  hasGym: false,
  hasWifi: false,
  hasTV: false,
  hasIron: false,
  hasPool: false,
  hasElevator: false,
};
