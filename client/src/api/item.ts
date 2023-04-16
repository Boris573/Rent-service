import type { Item, ItemBody } from '../types/item';
import axiosInstance from './axiosInstance';

class ItemsApi {
  async getItems(): Promise<Item[]> {
    const { data } = await axiosInstance.get(
      `/items`
    );
  
    return data;
  }

  async getItemById(id: string): Promise<Item> {
    const { data } = await axiosInstance.get(
      `/items/${id}`
    );
  
    return data;
  }

  async createItem(data: ItemBody): Promise<Item> {
    const { data: item } = await axiosInstance.post(
      `/items`,
      data
    );
  
    return item;
  }

  async updateItem({
    itemId,
    update
  }: {
    itemId: string;
    update: ItemBody;
  }): Promise<Item> {
    const { data: item } = await axiosInstance.put(
      `/items`,
      { id: itemId, ...update }
    );
  
    return item;
  }

  async deleteItem(itemId: string): Promise<Item> {
    const { data: item } = await axiosInstance.delete(
      `/items/${itemId}`,
    );
  
    return item;
  }
}

export const itemApi = new ItemsApi();
