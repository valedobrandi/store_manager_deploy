import useDisableStatus from '../../Hooks/useButtonStatus';
import useFormState from '../../Hooks/useFormState';
import { ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType } from '../../types/fetchButtonTypes';
import FetchButton from '../FetchButton';
import Input from '../Input';
import Label from '../Label';

type BarDeletePops = {
  usefetchLazyData: (query: ProductFormType |
  SaleFormType | UpdateProductFromSaleFormType | undefined) => void
};

export default function BarDelete({ usefetchLazyData }: BarDeletePops) {
  const { productForm, updateProductForm } = useFormState();
  const { isInputEmpty } = useDisableStatus();
  return (
    <div className="m-4">
      <Label title="ID">
        <Input
          width="max-w-20"
          name="id"
          setInput={ updateProductForm }
          input={ productForm }
          key="register"
        />
      </Label>
      <FetchButton
        title="DELETE"
        input={ productForm }
        usefetchLazyData={ usefetchLazyData }
        isDisabled={ isInputEmpty(productForm.id) }
      />
    </div>
  );
}
