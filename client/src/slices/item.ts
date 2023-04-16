import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { itemApi } from '../api/item';
import type { AppThunk } from '../store';
import type { Item, ItemBody } from '../types/item';

interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: []
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    getItems(
      state: ItemState,
      action: PayloadAction<Item[]>
    ): void {
      state.items = action.payload;
    },
    getItemById(
      state: ItemState,
      action: PayloadAction<Item>
    ): void {
      const item = action.payload;

      state.items = state.items.length
        ? state.items.map((_item) => {
            if (_item.id === item.id) {
              return item;
            }

            return _item;
          })
        : [action.payload];
    },
    createItem(
      state: ItemState,
      action: PayloadAction<Item>
    ): void {
      state.items.push(action.payload);
    },
    updateItem(
      state: ItemState,
      action: PayloadAction<Item>
    ): void {
      const item = action.payload;

      state.items = state.items.map((_item) => {
        if (_item.id === item.id) {
          return item;
        }

        return _item;
      });
    },
    deleteItem(
      state: ItemState,
      action: PayloadAction<string>
    ): void {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  }
});

export const { reducer } = slice;

export const getItems = (): AppThunk => async (dispatch): Promise<void> => {
  const data = await itemApi.getItems();

  dispatch(slice.actions.getItems(data));
};

export const getItemById = (itemId: string): AppThunk => async (dispatch): Promise<void> => {
  const data = await itemApi.getItemById(itemId);

  dispatch(slice.actions.getItemById(data));
};

export const createItem = (createData: ItemBody): AppThunk => async (dispatch): Promise<void> => {
  const data = await itemApi.createItem(createData);

  dispatch(slice.actions.createItem(data));
};

export const updateItem = (
  itemId: string,
  update: ItemBody
): AppThunk => async (dispatch): Promise<void> => {
  const data = await itemApi.updateItem({
    itemId,
    update
  });

  dispatch(slice.actions.updateItem(data));
};

export const deleteItem = (itemId: string): AppThunk => async (dispatch): Promise<void> => {
  await itemApi.deleteItem(itemId);

  dispatch(slice.actions.deleteItem(itemId));
};
