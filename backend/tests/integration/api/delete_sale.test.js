const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TEST - DELETE /sales/:id', function () {
  beforeEach(sinon.restore);
  it('Delete a sale from de the "sales" table', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: '1' }]);

    const PRODUCT_ID = 1;

    const response = await chai.request(app)
      .delete(`/sales/${PRODUCT_ID}`);

    expect(response.status).to.be.eq(204);
  });

  it('Delete a sale from de the "sales" table with "NOT_FOUND"', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const PRODUCT_ID = 999;

    const response = await chai.request(app)
      .delete(`/sales/${PRODUCT_ID}`);

    expect(response.status).to.be.eq(404);
  });
});