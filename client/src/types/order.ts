export enum ORDER_TYPES {
    RENT = 'RENT',
    BUY = 'BUY',
}

export enum ORDER_TYPES_LABEL {
    RENT = 'Аренда',
    BUY = 'Покупка',
}

export interface Order {
    id: string;
    orderType: string;
    user: string;
    dateFrom?: string;
    dateTo?: string;
    item: string;
    phone: string;
    totalPrice: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderBody extends Omit<Order, 'id'> {}
