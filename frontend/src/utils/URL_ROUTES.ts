/* eslint-disable sonarjs/no-duplicate-string */
const ROUTES_OPTIONS = {
  sales: {
    search: {
      all: '/sales',
      id: '/sales/:saleId,',
    },
    register:
      '/sales',
    update:
      '/:saleId/products/:productId/quantity',
    delete:
      '/sales',
  },
  products: {
    search: {
      all: '/products',
      id: '/products/:productId',
      name: '/products/search',
    },
    register:
      '/products',
    update:
      '/products/:productId',
    delete:
      '/products/:productId',
  },
};

export default ROUTES_OPTIONS;
