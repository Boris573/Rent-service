import { Filter } from "src/types/filter";
import { Item } from "src/types/item";
import { ORDER_TYPES } from "src/types/order";

const hasImage = (item, filter) => filter.hasImage ? item.image : true;
const minPrice = (item, filter) => filter.priceFrom ? filter.orderType === ORDER_TYPES.BUY ? item.buyPrice > filter.priceFrom : item.rentPrice > filter.priceFrom : true;
const maxPrice = (item, filter) => filter.priceTo ? filter.orderType === ORDER_TYPES.BUY ? item.buyPrice < filter.priceTo : item.rentPrice < filter.priceTo : true;
const isRightStreet = (item, filter) => filter.street ? item.street === filter.street : true;
const isRightCity = (item, filter) => filter.city ? item.city === filter.city : true;
const isRightCountry = (item, filter) => filter.country ? item.country === filter.country : true;
const isRightType = (item, filter) => filter.type ? item.type === filter.type : true;
const isAvailable = (item, filter) => filter.orderType === ORDER_TYPES.BUY ? item.isSale : item.isRent
const hasRightRoom = (item, filter) => filter.roomCount ? item.roomCount === filter.roomCount : true;
const hasKitchen = (item, filter) => filter.hasKitchen ? item.params.hasKitchen : true;
const hasGym = (item, filter) => filter.hasGym ? item.params.hasGym : true;
const hasIron = (item, filter) => filter.hasIron ? item.params.hasIron : true;
const hasParking = (item, filter) => filter.hasParking ? item.params.hasParking : true;
const hasPool = (item, filter) => filter.hasPool ? item.params.hasPool : true;
const hasTV = (item, filter) => filter.hasTV ? item.params.hasTV : true;
const hasWifi = (item, filter) => filter.hasWifi ? item.params.hasWifi : true;
const hasWorkZone = (item, filter) => filter.hasWorkZone ? item.params.hasWorkZone : true;
const hasElevator = (item, filter) => filter.hasElevator ? item.params.hasElevator : true;

const filterFunc = (item, filter) => (
  hasImage(item, filter) &&
  minPrice(item, filter) &&
  maxPrice(item, filter) &&
  isRightStreet(item, filter) &&
  isRightCountry(item, filter) &&
  isRightCity(item, filter) &&
  isRightType(item, filter) &&
  isAvailable(item, filter) &&
  hasRightRoom(item, filter) &&
  hasKitchen(item, filter) &&
  hasGym(item, filter) &&
  hasIron(item, filter) &&
  hasParking(item, filter) &&
  hasPool(item, filter) &&
  hasTV(item, filter) &&
  hasWifi(item, filter) &&
  hasWorkZone(item, filter) &&
  hasElevator(item, filter)
)

export const filterItems = (items: Item[], filter: Filter): Item[] => {
  if (items && filter) {
    return items.filter((item) => filterFunc(item, filter));
  }

  return [];
}