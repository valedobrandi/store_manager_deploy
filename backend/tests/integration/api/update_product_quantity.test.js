const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const salesMock = require('../mocks/sales.mock');
const productMock = require('../mocks/product.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TEST - UPDATE /sales/:saleId/products/:productId/quantity', function () {
  beforeEach(sinon.restore);
  it(' 1 - Update a product quantity from de the "products-sales" table', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
      .resolves([salesMock.saleById])
      .onCall(1)
      .resolves([[productMock.singleProduct]])
      .onCall(2)
      .resolves([{ affectedRows: 1 }]);

    const response = await chai.request(app)
      .put('/sales/1/products/1/quantity')
      .send({
        quantity: '20',
      });

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(salesMock.updateSaleQuantity);
  });

  it('2 - Update a product without quantity input', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
      .resolves([salesMock.saleById])
      .onCall(1)
      .resolves([[productMock.singleProduct]])
      .onCall(2)
      .resolves([{ affectedRows: 1 }]);

    const response = await chai.request(app)
      .put('/sales/1/products/1/quantity')
      .send({});

    expect(response.status).to.be.eq(400);
    expect(response.body).to.deep.eq({ message: '"quantity" is required' });
  });

  it('3 - Update a product with quantity input less than 1', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
      .resolves([salesMock.saleById])
      .onCall(1)
      .resolves([[productMock.singleProduct]])
      .onCall(2)
      .resolves([{ affectedRows: 1 }]);

    const response = await chai.request(app)
      .put('/sales/1/products/1/quantity')
      .send({
        quantity: '0',
      });

    expect(response.status).to.be.eq(422);
    expect(response.body).to.deep.eq({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('4 - Update a product with with a invalid "sale_id"', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
      .resolves([[]])
      .onCall(1)
      .resolves([[productMock.singleProduct]])
      .onCall(2)
      .resolves([{ affectedRows: 1 }]);

    const response = await chai.request(app)
      .put('/sales/999/products/1/quantity')
      .send({
        quantity: '20',
      });

    expect(response.status).to.be.eq(404);
    expect(response.body).to.deep.eq({ message: 'Sale not found' });
  });

  it(' 5 - Update a product with with a invalid "product_id"', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
      .resolves([salesMock.saleById])
      .onCall(1)
      .resolves([[undefined]])
      .onCall(2)
      .resolves([{ affectedRows: 1 }]);

    const response = await chai.request(app)
      .put('/sales/1/products/999/quantity')
      .send({
        quantity: '20',
      });

    expect(response.status).to.be.eq(404);
    expect(response.body).to.deep.eq({ message: 'Product not found in sale' });
  });
});