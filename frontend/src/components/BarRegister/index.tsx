import useConditionalRendering from '../../Hooks/useConditionalRendering';
import {
  ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType,
} from '../../types/fetchButtonTypes';
import useFormState from '../../Hooks/useFormState';
import Button from '../Button';
import FetchButton from '../FetchButton';
import Input from '../Input';
import Label from '../Label';
import Table from '../Table';
import useButtonStatus from '../../Hooks/useButtonStatus';
import ButtonJoinGroup from '../ButtonJoinGroup';
import useDispatchs from '../../Hooks/useDispatchs';
import useCollapse from '../../Hooks/useCollapse';

type RegisterBarPops = {
  usefetchLazyData: (query: ProductFormType |
  SaleFormType | UpdateProductFromSaleFormType | undefined) => void
};

export default function RegisterBar({ usefetchLazyData }: RegisterBarPops) {
  const { productForm, updateProductForm } = useFormState();
  const { isItemList, typeRoute } = useConditionalRendering();
  const { close, onCloseWindown } = useConditionalRendering();
  const { isArrayEmpty, isSaleForm } = useButtonStatus();
  const { onDispatch, reduxStore } = useDispatchs();
  const { visible, onSetCollapse } = useCollapse();
  return (
    <div>
      {typeRoute('products') && (
        <div className="ml-4 mr-4">
          <Label title="NAME">
            <Input
              name="name"
              setInput={ updateProductForm }
              input={ productForm }
              key="register"
            />
          </Label>
          <FetchButton
            title="REGISTER"
            input={ productForm }
            usefetchLazyData={ usefetchLazyData }
          />
        </div>
      )}
      {typeRoute('sales') && (
        <>
          <div className="m-4">
            <Label title="PRODUCT ID">
              <Input
                name="productId"
                width="max-w-20"
                setInput={ onDispatch.addItem }
                input={ reduxStore.saleItem }
                key="register"
              />
            </Label>
            <Label title="QUANTITY">
              <Input
                name="quantity"
                width="max-w-20"
                setInput={ onDispatch.addItem }
                input={ reduxStore.saleItem }
                key="register"
              />
            </Label>
            <Button
              name="ADD ITEM"
              btnType="success"
              dispatch={ () => { onDispatch.addItemList(); onCloseWindown(false); } }
              isDisabled={ !isSaleForm() }
            />
            <FetchButton
              title="REGISTER"
              input={ { saleItems: reduxStore.itemsList } }
              usefetchLazyData={
              () => { usefetchLazyData({ saleItems: reduxStore.itemsList }); }
            }
              isDisabled={ isArrayEmpty(reduxStore.itemsList.length) }
            />
          </div>
          {isItemList(reduxStore.itemsList.length) && (
            <Table
              data={ reduxStore.itemsList }
              close={ close }
              visible={ visible }
              icon
            >
              <ButtonJoinGroup title="HIDE" onHandleClick={ onSetCollapse } />
              <ButtonJoinGroup
                title="CLEAR"
                color="text-red-600 btn-warning"
                onHandleClick={ () => { onDispatch.clearSaleList(); } }
              />
            </Table>
          )}
        </>
      )}
    </div>
  );
}
