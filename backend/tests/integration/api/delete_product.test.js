const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TEST - DELETE /products/:id', function () {
  beforeEach(sinon.restore);
  it('SERVER TEST', async function () {
    const response = await chai.request(app).get('/');

    expect(response.body).to.deep.equal({ status: 'Store Manager UP!' });
  });

  it('Delete un product from de the "product" table', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: '1' }]);

    const PRODUCT_ID = 1;

    const response = await chai.request(app)
      .delete(`/products/${PRODUCT_ID}`);

    expect(response.status).to.be.eq(204);
  });

  it('Delete un product from de the "product" table with "NOT_FOUND"', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const PRODUCT_ID = 1;

    const response = await chai.request(app)
      .delete(`/products/${PRODUCT_ID}`);

    expect(response.status).to.be.eq(404);
  });
});