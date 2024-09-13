import {
  useSalesDataQuery,
  useLazyFetchDataQuery,
  useProductsDataQuery,
} from '../redux/reducers/apiSlice';
import useRoutesOptions from './useRoutesOptions';
import getRoute from '../utils/getRoute';

import { ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType } from '../types/fetchButtonTypes';
import useConditionalRendering from './useConditionalRendering';

export default function useFetchData() {
  const { dispatchDisplayAlert } = useConditionalRendering();
  const { fetch, route, request } = useRoutesOptions();
  const [fetchTrigger,
    { data = [], isLoading, error, isError, isSuccess },
  ] = useLazyFetchDataQuery();
  const { data: salesData = [], refetch: salesRefresh } = useSalesDataQuery();
  const { data: productsData = [], refetch: productsRefresh } = useProductsDataQuery();

  const fetchData = !Array.isArray(data) ? [data] : data;

  const usefetchLazyData = (queries: ProductFormType |
  SaleFormType | UpdateProductFromSaleFormType | undefined) => {
    dispatchDisplayAlert(true);
    const URL = getRoute(fetch, route, request, queries);
    if (typeof URL === 'string') return fetchTrigger(URL);
  };

  const fetchHttp = {
    usefetchLazyData,
    fetchData,
    isError,
    isLoading,
    error,
    isSuccess,
    salesRefresh,
    productsRefresh,
  };

  return { fetchHttp, salesData, productsData };
}
