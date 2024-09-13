const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMock = require('../mocks/sales.mock');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const middlewares = require('../../../src/middlewares/validateProducts');

const { expect } = chai;
chai.use(sinonChai);

describe('UNIT TEST - SALES CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1 - Return every sale', async function () {
    sinon.stub(salesService, 'searchEverySale')
      .resolves({ status: 'SUCCESSFUL', data: salesMock.everySale });

    const req = {};
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.everySale);
  });

  it('3 - Return a sale by ID with SUCCESSFUL', async function () {
    sinon.stub(salesService, 'searchSaleById')
      .resolves({ status: 'SUCCESSFUL', data: salesMock.saleById });

    const req = {
      params: { saleId: '1' },
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.saleById);
  });

  it('4 - Return a sale by ID with NOT_FOUND', async function () {
    sinon.stub(salesService, 'searchEverySale')
      .resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    const req = {
      params: { saleId: '999' },
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('5 - Register a sale', async function () {
    sinon.stub(salesService, 'register')
      .resolves({ status: 'CREATED', data: salesMock.returnRegisterSaleFromDB });

    const req = {
      body: salesMock.registerSaleAtDB,
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    await salesController.register(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesMock.returnRegisterSaleFromDB);
  });

  it('6 - Register a sale without input "Quantity"', async function () {
    sinon.stub(salesService, 'register')
      .resolves();
    const next = sinon.stub().returns();

    const req = {
      body: salesMock.registerSaleAtDBWithoutKeyQuantity,
    };
      
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
        
    middlewares.validateRegisterProductFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
});