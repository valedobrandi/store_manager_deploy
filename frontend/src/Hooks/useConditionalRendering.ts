import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import useRoutesOptions from './useRoutesOptions';
import { InitialStateType } from '../types/reduxState';
import { displayAlert } from '../redux/reducers/storeManager';

export default function useConditionalRendering() {
  const [close, setClose] = useState(false);

  const dispatch = useDispatch();
  const { request, route } = useRoutesOptions();

  const dispatchDisplayAlert = (isAlert: boolean) => {
    dispatch(displayAlert({ isAlert }));
  };
  const { isAlert } = useSelector(
    (state: InitialStateType) => state.storeManager.storeSearch,
  );
  const onCloseWindown = (render: boolean) => {
    setClose(render);
  };
  const typeRequest = (title: string) => request === title;
  const typeRoute = (title: string) => route === title;

  const isItemList = (list: number) => list > 0;
  const isData = (isSuccess: boolean) => isSuccess;

  return {
    onCloseWindown,
    close,
    isData,
    typeRequest,
    isAlert,
    typeRoute,
    isItemList,
    dispatchDisplayAlert,
  };
}
