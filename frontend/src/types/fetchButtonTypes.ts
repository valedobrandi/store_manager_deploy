export type ProductFormType = {
  name: string;
  id: string;
};

export type SaleFormType = { saleItems: { productId: string; quantity: string; }[] };

export type UpdateProductFromSaleFormType = {
  productId: string;
  saleId: string;
  quantity: string;
};
