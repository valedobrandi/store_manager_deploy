const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const salesMock = require('../mocks/sales.mock');
const productsMock = require('../mocks/product.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TEST - DELETE /sales/:id', function () {
  beforeEach(sinon.restore);
  it('Delete a sale from de the "sales" table', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
      .resolves([productsMock.everyProduct])
      .onCall(1)
      .resolves([salesMock.returnRegisterSaleFromDB]);

    const response = await chai.request(app)
      .post('/sales')
      .send(salesMock.registerSaleAtDBWithoutKeyQuantity);

    expect(response.status).to.be.eq(400);
    expect(response.body).to.deep.eq({ message: '"quantity" is required' });
  });
});