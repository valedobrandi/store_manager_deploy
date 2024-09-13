export type ReduxState = {
  isFetching: boolean,
  errorMessage: string,
};

export type InitialStateType = {
  storeManager: {
    storeSearch: {
      route: 'sales' | 'products';
      request: 'search' | 'register' | 'update' | 'delete';
      fetch: 'all' | 'id' | 'name' | '';
      id: string;
      isAlert: boolean;
    };
    registerSaleItemnsList: {
      itemsList: { productId: string; quantity: string; }[] ;
      saleItem: {
        productId: string;
        quantity: string;
      }
    }
  }
};
