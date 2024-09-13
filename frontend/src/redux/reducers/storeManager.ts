import { createSlice } from '@reduxjs/toolkit';

const intialState = {
  storeSearch: {
    route: 'products',
    request: 'search',
    fetch: '',
    id: '1',
    isAlert: false,
  },
  registerSaleItemnsList: {
    itemsList: [] as { productId: string; quantity: number; }[],
    saleItem: { productId: '', quantity: 0 },
  },
};

const storeManagerSlice = createSlice({
  name: 'storeManager',
  initialState: intialState,
  reducers: {
    selectRoute: (state, action) => {
      state.storeSearch.isAlert = false;
      state.storeSearch.route = action.payload.route;
    },
    selectRequest: (state, action) => {
      state.storeSearch.isAlert = false;
      state.storeSearch.request = action.payload.request;
    },
    selectFetch: (state, action) => {
      state.storeSearch.isAlert = false;
      state.storeSearch.fetch = action.payload.fetch;
    },
    selectId: (state, action) => {
      state.storeSearch.id = action.payload.id;
    },
    displayAlert: (state, action) => {
      state.storeSearch.isAlert = action.payload.isAlert;
    },
    addItem: (state) => {
      const { saleItem } = state.registerSaleItemnsList;
      const { itemsList } = state.registerSaleItemnsList;
      const findItem = itemsList.find((item) => item.productId === saleItem.productId);

      if (!findItem) itemsList.push(saleItem);
      if (findItem) {
        const update = itemsList.map((item) => {
          if (item.productId === findItem.productId) {
            return { ...item,
              quantity: Number(saleItem.quantity) + Number(findItem.quantity) };
          }
          return item;
        });
        state.registerSaleItemnsList.itemsList = update;
      }
    },
    CLEAR_SALE_LIST: (state) => {
      state.registerSaleItemnsList.itemsList = [];
    },
    DELETE_ITEM_SALE_LIST: (state, action) => {
      const { itemsList } = state.registerSaleItemnsList;
      state.registerSaleItemnsList.itemsList = itemsList
        .filter((item) => item.productId !== action.payload);
    },
    newSale: (state, action) => {
      const saleItem = {
        ...state.registerSaleItemnsList.saleItem,
        [action.payload.name]: action.payload.value,
      };
      state.registerSaleItemnsList.saleItem = saleItem;
    },
  },
});

export const {
  selectRoute,
  selectRequest,
  selectFetch,
  selectId,
  displayAlert,
  addItem,
  newSale,
  CLEAR_SALE_LIST,
  DELETE_ITEM_SALE_LIST,
} = storeManagerSlice.actions;
export default storeManagerSlice.reducer;
