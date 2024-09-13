import { http, HttpResponse } from 'msw';
import { productsList } from './productsList';
import { salesList } from './salesList';
import { productSearchById, productSearchByName } from './search';
import { productRegister } from './register';

export const handlers = [
  http.get('http://localhost:3001/sales', () => {
    return HttpResponse.json(salesList);
  }),
  http.get('http://localhost:3001/products', () => {
    return HttpResponse.json(productsList);
  }),
  http.get('http://localhost:3001/products/search', () => {
    return HttpResponse.json(productSearchByName);
  }),
  http.get('http://localhost:3001/products/:id', () => {
    return HttpResponse.json(productSearchById);
  }),
  http.post('http://localhost:3001/products', () => {
    return HttpResponse.json(productRegister);
  }),
];
