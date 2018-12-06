const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CRUDHelper = require("../CRUDHelper");
const QueryHelper = require("../QueryHelper");
const expect = require("chai").expect;

const schema = new Schema({
  pid: {
    type: Schema.ObjectId
  },

  name: String,
  url: String,

  create_date: {
    type: Date,
    required: true,
    default: Date.now
  },

  isVisible: Boolean,
  isDeleted: Boolean
});

let MODEL = mongoose.model("TEST_MODEL", schema);

describe("CRUDHelper", () => {
  beforeEach(done => {
    MODEL.remove({}, err => {
      done();
    });
  });

  describe("CRUDHelper.create(MODEL, {})", () => {
    it("it should create elements of model", done => {
      CRUDHelper.create(MODEL, { name: "Name 1", url: "Url 1" }).then(() => {
        MODEL.find({}, (err, docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0]).to.have.property("_id");
          expect(docs[0])
            .to.have.property("name")
            .equal("Name 1");
          expect(docs[0])
            .to.have.property("url")
            .equal("Url 1");
          expect(docs[0]).not.have.property("test");
          done();
        });
      });
    });
  });

  describe("listCurried(Model)(cofing,condition)", () => {
    before( done => {
      CRUDHelper.create(MODEL, { name: "Name 2", url: "Url 2" })
      .then(() => {
        done();
      })
      // Promise.all(
      //   CRUDHelper.create(MODEL, { name: "Name 2", url: "Url 2" }),
      //   CRUDHelper.create(MODEL, { name: "Name 3", url: "Url 3" }),
      //   CRUDHelper.create(MODEL, { name: "Name 4", url: "Url 4" }),
      //   CRUDHelper.create(MODEL, { name: "Name 5", url: "Url 5" })
      // ).then(() => {
      //   done();
      // }).catch(() => {
      //   console.log("ERROR")
      //   done();
      // }) ;
    });

    it("should GET all elements of model", done => {
      const config = QueryHelper.parse({});

      CRUDHelper.listCurried(MODEL)({}, config).then((resp) => {
        // expect(list.rows.length).to.equal(5);
        console.log(resp)

        done();
      });

      // console.log(list);
    });
  });
});
