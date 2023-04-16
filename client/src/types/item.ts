export interface Item {
  id: string;
  title: string;
  image?: string | null;
  type: string;
  price: number;
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

export interface ItemBody extends Omit<Item, 'id'> {}
