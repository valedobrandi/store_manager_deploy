const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesMock = require('../mocks/sales.mock');
const salesModal = require('../../../src/models/sales.model');

describe('UNIT TEST - SALES MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1 - Return every sale from DB', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.everySale]);

    const searchProducts = await salesModal.searchEverySale();
    
    expect(searchProducts).to.be.an('array');
    expect(searchProducts).to.be.deep.equal(salesMock.everySale);
  });

  it('2 - Return one sale by ID from DB', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.saleById]);
    const PRODUCT_ID = '1';

    const searchProductsById = await salesModal.searchSaleById(PRODUCT_ID);

    expect(searchProductsById).to.be.an('array');
    expect(searchProductsById).to.be.deep.equal(salesMock.saleById);
  });

  it('3 - Insert a new sale at DB', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves()
      .onSecondCall()
      .resolves([[{ id: '3' }]])
      .onThirdCall()
      .resolves([]);
 
    const registerSale = await salesModal.registerSales(salesMock.registerSaleAtDB);
    
    expect(registerSale).to.be.an('object');
    expect(registerSale).to.be.deep.equal(salesMock.returnRegisterSaleFromDB);
  });
});