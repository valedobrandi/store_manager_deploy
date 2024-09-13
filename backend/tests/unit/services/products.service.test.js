const { expect } = require('chai');
const sinon = require('sinon');
const productsMock = require('../mocks/product.mock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

describe('UNIT TEST - PRODUCT SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1 - Return every product', async function () {
    sinon.stub(productsModel, 'searchEveryProduct').resolves(productsMock.everyProduct);

    const searchProducts = await productsService.searchEveryProduct();
    
    expect(searchProducts.status).to.be.equal('SUCCESSFUL');
    expect(searchProducts.data).to.be.deep.equal(productsMock.everyProduct);
  });

  it('2 - Return a product by id with SUCCESSFUL', async function () {
    sinon.stub(productsModel, 'searchProductById').resolves(productsMock.singleProduct);
    const PRODUCT_ID = '1';
    const searchProducts = await productsService.searchProductById(PRODUCT_ID);
    
    expect(searchProducts.status).to.be.equal('SUCCESSFUL');
    expect(searchProducts.data).to.be.deep.equal(productsMock.singleProduct);
  });

  it('3 - Return a product by id with NOT_FOUND', async function () {
    sinon.stub(productsModel, 'searchProductById').resolves();
    const PRODUCT_ID = '999';
    const searchProducts = await productsService.searchProductById(PRODUCT_ID);
    
    expect(searchProducts.status).to.be.equal('NOT_FOUND');
    expect(searchProducts.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('4 - Register a product at "products" table', async function () {
    sinon.stub(productsModel, 'registerProduct').resolves(productsMock.registerProductReturnFromDB);
   
    const searchProducts = await productsService.registerProduct(productsMock.registerProduct);
    
    expect(searchProducts.status).to.be.equal('CREATED');
    expect(searchProducts.data).to.be.deep.equal(productsMock.registerProductReturnFromDB);
  });

  it('5 - Return a error when register a product name with less then 5 letters', async function () {
    sinon.stub(productsModel, 'registerProduct').resolves(productsMock.registerProductReturnFromDB);
   
    const searchProducts = await productsService.registerProduct({ name: 'A' });
    
    expect(searchProducts.status).to.be.equal('INVALID_VALUE');
    expect(searchProducts.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('6 - Update a product value at the DB', async function () {
    sinon.stub(productsModel, 'searchProductById').resolves(true);
    sinon.stub(productsModel, 'registerProduct').resolves(productsMock.singleProduct);
   
    const updateProduct = await productsService.updateProduct({ name: 'ProdutoX' }, '1');
    
    expect(updateProduct.status).to.be.equal('SUCCESSFUL');
    expect(updateProduct.data).to.be.deep.equal({ id: 1, name: 'ProdutoX' });
  });
});