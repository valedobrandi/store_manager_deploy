const everySale = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
  
];

const saleById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const registerSaleAtDB = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const registerSaleAtDBWithProductIdInexistent = [
  {
    productId: 999,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const registerSaleAtDBWithoutKeyQuantity = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const returnRegisterSaleFromDB = {
  id: '3',
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  everySale,
  saleById,
  registerSaleAtDB,
  returnRegisterSaleFromDB,
  registerSaleAtDBWithoutKeyQuantity,
  registerSaleAtDBWithProductIdInexistent,
};