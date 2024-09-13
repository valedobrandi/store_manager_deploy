import { useState } from 'react';

export default function useFormState() {
  const [productForm, setProductForm] = useState({
    name: '',
    id: '',
  });

  const [saleItems, setSaleItems] = useState<
  { saleItems: { productId: string, quantity: string }[] }
  >({ saleItems: [] });

  const [updateProductFromSaleForm, setUpdateProductFromSaleForm] = useState({
    productId: '',
    saleId: '',
    quantity: '',
  });

  const itemsList = saleItems.saleItems;

  const updateProductForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setProductForm({ ...productForm, [target.name]: target.value });
  };

  const updateProductFromSale = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setUpdateProductFromSaleForm(
      { ...updateProductFromSaleForm, [target.name]: target.value },
    );
  };

  return {
    productForm,
    updateProductForm,
    itemsList,
    saleItems,
    updateProductFromSaleForm,
    updateProductFromSale,
    setSaleItems,
  };
}
