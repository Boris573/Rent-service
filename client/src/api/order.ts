import type { Order, OrderBody } from '../types/order';
import axiosInstance from './axiosInstance';

class OrdersApi {
  async getOrders(): Promise<Order[]> {
    const { data } = await axiosInstance.get(
      `/orders`
    );
  
    return data;
  }

  async getOrdersByItemId(id: string): Promise<Order[]> {
    const { data } = await axiosInstance.get(
      `/orders/item/${id}`
    );
  
    return data;
  }

  async getOrdersByUserId(id: string): Promise<Order[]> {
    const { data } = await axiosInstance.get(
      `/orders/user/${id}`
    );
  
    return data;
  }

  async createOrder(data: OrderBody): Promise<Order> {
    const { data: order } = await axiosInstance.post(
      `/orders`,
      data
    );
  
    return order;
  }

  async updateOrder({
    orderId,
    update
  }: {
    orderId: string;
    update: OrderBody;
  }): Promise<Order> {
    const { data: order } = await axiosInstance.put(
      `/orders`,
      { id: orderId, ...update }
    );
  
    return order;
  }

  async deleteOrder(orderId: string): Promise<Order> {
    const { data: order } = await axiosInstance.delete(
      `/orders/${orderId}`,
    );
  
    return order;
  }
}

export const orderApi = new OrdersApi();
