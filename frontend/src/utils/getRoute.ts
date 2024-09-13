import { RouteOptionsType } from '../types/routeOptions';

/* eslint-disable react-func/max-lines-per-function */
export default function getRoute(
  fetch: 'all' | 'id' | 'name' | '',
  route: 'sales' | 'products',
  request: 'search' | 'register' | 'update' | 'delete',
  params: {
    name?: string,
    id?: string,
    productId?: string,
    saleId?: string,
    quantity?: string;
    saleItems?: { productId: string; quantity: string; }[] } | undefined,

) {
  if (!params) return;

  fetch = request !== 'search' ? '' : fetch;

  const ROUTES_OPTIONS: RouteOptionsType = {
    sales: {
      search: {
        all: '/sales',
        id: `/sales/${params.id}`,
      },
      register:
      {
        url: '/sales',
        method: 'POST',
        body: params.saleItems,
      },
      update:
      {
        url: `/sales/${params.saleId}/products/${params.productId}/quantity`,
        method: 'PUT',
        body: {
          quantity: params.quantity,
        },
      },
      delete:
      {
        url: `/sales/${params.id}`,
        method: 'DELETE',
      },
    },
    products: {
      search: {
        all: '/products',
        id: `/products/${params.id}`,
        name: `/products/search?q=${params.name}`,
      },
      register:
      {
        url: '/products',
        method: 'POST',
        body: { name: params.name },
      },
      update:
      {
        url: `/products/${params.id}`,
        method: 'PUT',
        body: { name: params.name },
      },
      delete:
      {
        url: `/products/${params.id}`,
        method: 'DELETE',
      },
    },
  };
  if (!ROUTES_OPTIONS[route]) return;
  if (!ROUTES_OPTIONS[route][request]) return;
  if (fetch === '') return ROUTES_OPTIONS[route][request];
  if (request === 'search') return ROUTES_OPTIONS[route][request][fetch];
}
