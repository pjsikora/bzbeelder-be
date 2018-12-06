const QueryHelper = require("../QueryHelper");
let expect = require('chai').expect;

describe("QueryHelper", () => {
  it(`should return object when empty object is passed  { limit: 0, skip: 0, sort: null, fields: null }`, () => {
    const queryMock = {};
    const parsed = QueryHelper.parse(queryMock);

    expect(parsed).to.have.property('limit');
    expect(parsed).to.have.property('skip');
    expect(parsed).to.have.property('sort');
    expect(parsed).to.have.property('fields');
    expect(parsed.limit).to.equal(0);
    expect(parsed.skip).to.equal(0);
    expect(parsed.sort).to.equal(null);
    expect(parsed.fields).to.equal(null);
  });

  it(`should return proper object when 'limit' is setted`, () => {
    const queryMock = {
      limit: '10',
    };
    const parsed = QueryHelper.parse(queryMock);

    expect(parsed.limit).to.equal(10);
    expect(parsed.skip).to.equal(0);
    expect(parsed.sort).to.equal(null);
    expect(parsed.fields).to.equal(null);
  });

  it(`should return proper object when 'skip' is setted`, () => {
    const queryMock = {
      skip: '10',
    };
    const parsed = QueryHelper.parse(queryMock);

    expect(parsed.limit).to.equal(0);
    expect(parsed.skip).to.equal(10);
    expect(parsed.sort).to.equal(null);
    expect(parsed.fields).to.equal(null);
  });
});
