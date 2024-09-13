import useDisableStatus from '../../Hooks/useButtonStatus';
import useConditionalRendering from '../../Hooks/useConditionalRendering';
import useFormState from '../../Hooks/useFormState';
import { ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType } from '../../types/fetchButtonTypes';
import FetchButton from '../FetchButton';
import Input from '../Input';
import Label from '../Label';

type BarUpdatePops = {
  usefetchLazyData: (query: ProductFormType |
  SaleFormType | UpdateProductFromSaleFormType | undefined) => void
};

export default function BarUpdate({ usefetchLazyData }: BarUpdatePops) {
  const {
    productForm, updateProductForm, updateProductFromSale, updateProductFromSaleForm,
  } = useFormState();
  const { isInputEmpty } = useDisableStatus();
  const { typeRoute } = useConditionalRendering();

  return (
    <div className="m-4">
      {typeRoute('products') && (
        <>
          <Label title="ID">
            <Input
              name="id"
              width="max-w-20"
              setInput={ updateProductForm }
              input={ productForm }
              key="updateId"
            />
          </Label>
          <Label title="NAME">
            <Input
              name="name"
              setInput={ updateProductForm }
              input={ productForm }
              key="updateName"
            />
          </Label>
          <FetchButton
            title="UPDATE"
            input={ productForm }
            usefetchLazyData={ usefetchLazyData }
            isDisabled={ isInputEmpty(productForm.id) }
          />
        </>)}
      {typeRoute('sales') && (
        <>
          <Label title="SALE ID">
            <Input
              name="saleId"
              width="max-w-20"
              setInput={ updateProductFromSale }
              input={ updateProductFromSaleForm }
              key="updateId"
            />
          </Label>
          <Label title="PRODUCT ID">
            <Input
              name="productId"
              width="max-w-20"
              setInput={ updateProductFromSale }
              input={ updateProductFromSaleForm }
              key="updateId"
            />
          </Label>
          <Label title="QUANTITY">
            <Input
              name="quantity"
              width="max-w-20"
              setInput={ updateProductFromSale }
              input={ updateProductFromSaleForm }
              key="updateName"
            />
          </Label>
          <FetchButton
            title="UPDATE"
            input={ updateProductFromSaleForm }
            usefetchLazyData={ usefetchLazyData }
            isDisabled={
               isInputEmpty(updateProductFromSaleForm.productId)
               && isInputEmpty(updateProductFromSaleForm.saleId)
              }
          />
        </>)}
    </div>
  );
}
