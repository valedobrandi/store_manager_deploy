import { useDispatch, useSelector } from 'react-redux';
import { addItem, newSale,
  CLEAR_SALE_LIST, DELETE_ITEM_SALE_LIST } from '../redux/reducers/storeManager';
import { InitialStateType } from '../types/reduxState';

type EventType = React.ChangeEvent<HTMLInputElement>;

export default function useDispatchs() {
  const dispatch = useDispatch();

  const onDispatch = {
    addItemList: () => dispatch(addItem()),
    addItem: ({ target }: EventType) => dispatch(newSale(
      { name: target.name, value: target.value },
    )),
    clearSaleList: () => dispatch(CLEAR_SALE_LIST()),
    deleteItemSaleList: (id: string) => dispatch(DELETE_ITEM_SALE_LIST(id)),
  };

  const { itemsList, saleItem } = useSelector(
    (state: InitialStateType) => state.storeManager.registerSaleItemnsList,
  );

  const reduxStore = {
    itemsList, saleItem,
  };
  return { onDispatch, reduxStore };
}
