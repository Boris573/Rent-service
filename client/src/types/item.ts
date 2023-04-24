export interface Item {
  id: string;
  title: string;
  image?: string | null;
  type: string;
  buyPrice: number;
  rentPrice: number;
  isRent: boolean;
  isSale: boolean;
  description?: string | null;
  flatNumber?: string;
  houseNumber: string;
  street: string;
  city: string;
  country: string;
  params?: {
    hasKitchen?: boolean;
    hasWorkZone?: boolean;
    hasParking?: boolean;
    hasGym?: boolean;
    hasWifi?: boolean;
    hasTV?: boolean;
    hasIron?: boolean;
    hasPool?: boolean;
    hasElevator?: boolean;
  },
  host?: string;
  roomCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export const itemTypeOptions = [
  {
    label: 'Дом',
    value: 'house',
  },
  {
    label: 'Квартира',
    value: 'flat',
  },
  {
    label: 'Комната',
    value: 'room',
  },
  {
    label: 'Апартаменты',
    value: 'aparts',
  },
  {
    label: 'Вилла',
    value: 'villa',
  },
];


export enum ITEM_PARAMS {
  hasKitchen = 'Кухня',
  hasWorkZone = 'Рабочая зона',
  hasGym = 'Спортзал',
  hasParking = 'Парковка',
  hasPool = 'Бассейн',
  hasWifi = 'Wi-Fi',
  hasTV = 'Телевизор',
  hasIron = 'Утюг',
}

export interface ItemBody extends Omit<Item, 'id'> {}
