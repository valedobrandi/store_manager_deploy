const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsMock = require('../mocks/product.mock');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const middlewares = require('../../../src/middlewares/validateProducts');

const { expect } = chai;
chai.use(sinonChai);

describe('UNIT TEST - PRODUCT CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1 - Return every product', async function () {
    sinon.stub(productsService, 'searchEveryProduct')
      .resolves({ status: 'SUCCESSFUL', data: productsMock.everyProduct });

    const req = {};
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock.everyProduct);
  });

  it('3 - Return a product by ID with SUCCESSFUL', async function () {
    sinon.stub(productsService, 'searchProductById')
      .resolves({ status: 'SUCCESSFUL', data: productsMock.singleProduct });

    const req = {
      params: { productId: '1' },
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock.singleProduct);
  });

  it('4 - Return a product by ID with NOT_FOUND', async function () {
    sinon.stub(productsService, 'searchEveryProduct')
      .resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    const req = {
      params: { productId: '999' },
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('5 - Register a product with CREATED', async function () {
    sinon.stub(productsService, 'registerProduct')
      .resolves({ status: 'CREATED', data: productsMock.registerProductReturnFromDB });

    const req = {
      body: productsMock.registerProduct,
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await productsController.register(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMock.registerProductReturnFromDB);
  });

  it('6 - Register a product without a "name" input', function () {
    sinon.stub(productsService, 'registerProduct')
      .resolves();
    const next = sinon.stub().returns();

    const req = { body: { date: '' } };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    middlewares.validateRegisterProductFields(req, res, next);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
    expect(res.status).to.have.been.calledWith(400);
  });

  it('7 - Update a product value', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(
      { status: 'SUCCESSFUL', data: productsMock.singleProduct },
    );

    const req = {
      params: { id: '1' },
      body: { name: 'Martelo de Thor' }, 
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.update(req, res);
    expect(res.json).to.have.been.calledWith(productsMock.singleProduct);
    expect(res.status).to.have.been.calledWith(200);
  });
});