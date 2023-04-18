import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { orderApi } from '../api/order';
import type { AppThunk } from '../store';
import type { Order, OrderBody } from '../types/order';

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: []
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrders(
      state: OrderState,
      action: PayloadAction<Order[]>
    ): void {
      state.orders = action.payload;
    },
    getOrdersByItemId(
      state: OrderState,
      action: PayloadAction<Order[]>
    ): void {
      const orders = action.payload;

      state.orders = state.orders.length
        ? state.orders.map((_order) => {
            const order = orders.find((item) => item.id === _order.id)

            return order ? order : _order;
          })
        : action.payload;
    },
    getOrdersByUserId(
      state: OrderState,
      action: PayloadAction<Order[]>
    ): void {
      const orders = action.payload;

      state.orders = state.orders.length
        ? state.orders.map((_order) => {
            const order = orders.find((item) => item.id === _order.id)

            return order ? order : _order;
          })
        : action.payload;
    },
    createOrder(
      state: OrderState,
      action: PayloadAction<Order>
    ): void {
      state.orders.push(action.payload);
    },
    updateOrder(
      state: OrderState,
      action: PayloadAction<Order>
    ): void {
      const order = action.payload;

      state.orders = state.orders.map((_order) => {
        if (_order.id === order.id) {
          return order;
        }

        return _order;
      });
    },
    deleteOrder(
      state: OrderState,
      action: PayloadAction<string>
    ): void {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    }
  }
});

export const { reducer } = slice;

export const getOrders = (): AppThunk => async (dispatch): Promise<void> => {
  const data = await orderApi.getOrders();

  dispatch(slice.actions.getOrders(data));
};

export const getOrdersByItemId = (itemId: string): AppThunk => async (dispatch): Promise<void> => {
  const data = await orderApi.getOrdersByItemId(itemId);

  dispatch(slice.actions.getOrdersByItemId(data));
};

export const getOrdersByUserId = (userId: string): AppThunk => async (dispatch): Promise<void> => {
  const data = await orderApi.getOrdersByUserId(userId);

  dispatch(slice.actions.getOrdersByUserId(data));
};

export const createOrder = (createData: OrderBody): AppThunk => async (dispatch): Promise<void> => {
  const data = await orderApi.createOrder(createData);

  dispatch(slice.actions.createOrder(data));
};

export const updateOrder = (
  orderId: string,
  update: OrderBody
): AppThunk => async (dispatch): Promise<void> => {

  const data = await orderApi.updateOrder({
    orderId,
    update
  });

  dispatch(slice.actions.updateOrder(data));
};

export const deleteOrder = (orderId: string): AppThunk => async (dispatch): Promise<void> => {
  await orderApi.deleteOrder(orderId);

  dispatch(slice.actions.deleteOrder(orderId));
};
