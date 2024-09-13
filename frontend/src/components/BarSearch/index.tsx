import useCollapse from '../../Hooks/useCollapse';
import useConditionalRendering from '../../Hooks/useConditionalRendering';
import useFormState from '../../Hooks/useFormState';
import useRoutesOptions from '../../Hooks/useRoutesOptions';
import { ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType } from '../../types/fetchButtonTypes';
import ButtonJoinGroup from '../ButtonJoinGroup';
import FetchButton from '../FetchButton';
import Input from '../Input';
import SearchType from '../SearchType';
import Table from '../Table';

type SearchBarPops = {
  searchData: [] | object[];
  usefetchLazyData: (query: ProductFormType |
  SaleFormType | UpdateProductFromSaleFormType | undefined) => void;
};

export default function SearchBar({ searchData, usefetchLazyData }: SearchBarPops) {
  const { close, onCloseWindown } = useConditionalRendering();
  const { onSetCollapse, visible } = useCollapse();
  const { typeRequest } = useConditionalRendering();
  const { productForm, updateProductForm } = useFormState();
  const { fetch } = useRoutesOptions();

  return (
    <div>
      {typeRequest('search') && (
        <div className="flex items-center m-4">
          <SearchType />
          <Input
            name={ fetch }
            setInput={ updateProductForm }
            input={ productForm }
            key="search"
          />
          <FetchButton
            title="SEARCH"
            input={ productForm }
            usefetchLazyData={ () => {
              usefetchLazyData(productForm);
              onCloseWindown(false);
            } }
          />
        </div>
      )}
      {searchData.length > 0 && (
        <Table
          data={ searchData }
          close={ close }
          visible={ visible }
        >
          <ButtonJoinGroup title="HIDE" onHandleClick={ onSetCollapse } />
          <ButtonJoinGroup
            title="CLOSE"
            color="text-red-600 btn-warning"
            onHandleClick={ () => { onCloseWindown(true); } }
          />
        </Table>)}
    </div>

  );
}
