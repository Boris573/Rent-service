export interface Item {
  _id: string;
  images?: string[] | null;
  type: string;
  price: number;
  description?: string | null;
  address1: string;
  address2?: string;
  params?: string[];
  host?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemBody extends Omit<Item, '_id'> {}
