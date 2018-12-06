const ResponseHelper = require("../ResponseHelper");
let expect = require('chai').expect;

describe("ResponseHelper", () => {
  describe('success()', () => {
    it(`Should have standard properties (limit, rows, total, message, errors)`, () => {
      const rows = {};
      const limit = 1000;
      const total = 10;
  
      const response = ResponseHelper.successResponse(rows, limit, total);
  
      expect(response).to.have.property('limit');
      expect(response).to.have.property('data');
      expect(response).to.have.property('total');
      expect(response).to.have.property('message');
      expect(response).to.have.property('errors');
    });

    it(`Should have standard setted values`, () => {
      const rows = {};
      const limit = 1000;
      const total = 10;
  
      const response = ResponseHelper.successResponse(rows, limit, total);
  
      expect(response.limit).to.equal(limit);
      expect(response.data).to.equal(rows);
      expect(response.total).to.equal(total);
      expect(response.errors).to.equal(null);
      expect(response.message).to.equal('success');
    });
  }) 

  describe('error() ',  () => {
    it(`Should have standard properties (row, message, errors)`, () => {
      const error = 'error my friend';
  
      const response = ResponseHelper.errorResponse(error);
  
      expect(response).to.have.property('errors');
      expect(response).to.have.property('message');
    });

    it(`Should have proper values`, () => {
      const error = 'error my friend';
  
      const response = ResponseHelper.errorResponse(error);
  
      expect(response.errors).to.equal(error);
      expect(response.message).to.equal('error');
    });

    it(`Shouldn't have properties as list has (limit, rows, total)`, () => {
      const error = 'error my friend';
  
      const response = ResponseHelper.errorResponse(error);

      expect(response).not.have.property('limit');
      expect(response).not.have.property('rows');
      expect(response).not.have.property('total');
    })
  });
});