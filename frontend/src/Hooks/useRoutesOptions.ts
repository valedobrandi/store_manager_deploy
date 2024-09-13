import { useDispatch, useSelector } from 'react-redux';
import {
  selectRoute, selectRequest,
  selectFetch, selectId,
} from '../redux/reducers/storeManager';
import { InitialStateType } from '../types/reduxState';
import URL_ROUTES from '../utils/URL_ROUTES';

export default function useRoutesOptions() {
  const dispatch = useDispatch();
  const dispatchSelectRoute = (route?: string) => {
    dispatch(selectRoute({ route }));
  };
  const dispatchSelectRequest = (request?: string) => {
    dispatch(selectRequest({ request }));
  };
  const dispatchSelectFetch = (fetch?: string) => {
    dispatch(selectFetch({ fetch }));
  };
  const dispatchselectId = (id: string) => dispatch(selectId({ id }));
  const { route, request, fetch, id } = useSelector(
    (state: InitialStateType) => state.storeManager.storeSearch,
  );

  const btnRoutes = Object.keys(URL_ROUTES);
  const btnRequests = Object.keys(URL_ROUTES[route]);
  const btnSearch = Object.keys(URL_ROUTES[route][request]);

  return {
    dispatchselectId,
    dispatchSelectRoute,
    dispatchSelectRequest,
    dispatchSelectFetch,
    id,
    route,
    request,
    fetch,
    btnRoutes,
    btnRequests,
    btnSearch,
  };
}
