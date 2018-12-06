process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const UserModel = require("../../user/models/User");
const MODEL = require("../PostModel");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../../app");
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);

const userName = "tester@unit";
const endpointUrl = "/api/posts/";
let token;
let id;

//Our parent block
describe("Post", () => {
  before(done => {
    UserModel.findOneAndRemove({ email: userName }, err => {
      chai
        .request(app)
        .post("/api/auth/register")
        .send({ email: userName, password: "password" })
        .end((err, res) => {
          UserModel.findOneAndUpdate(
            { email: userName },
            { isActive: 1 },
            (err, doc) => {
              chai
                .request(app)
                .post("/api/auth/login")
                .send({ email: userName, password: "password" })
                .end((err, res) => {
                  token = res.body.token;
                  done();
                });
            }
          );
        });
    });
  });

  describe("Post Endpoints", () => {
    it("it should create Post (method: POST)", done => {
      chai
        .request(app)
        .post(endpointUrl)
        .set("X-Access-Token", token)
        .send({ title: "Title" })
        .end((err, res) => {
          const r = res.body;

          expect(r).to.have.property("message");
          expect(r).to.have.property("errors");
          expect(r).to.have.property("data");

          id = res.body.data._id; // For next tests
          done();
        });
    });

    it("it should read Post (method: GET)", done => {
      chai
        .request(app)
        .get(endpointUrl + id)
        .set("X-Access-Token", token)
        .end((err, res) => {
          const r = res.body;
          const row = r.data;

          expect(r).to.have.property("message");
          expect(r).to.have.property("errors");
          expect(r).to.have.property("data");

          expect(row).to.have.property("_id");
          expect(row).to.have.property("title");
          expect(row).to.have.property("create_date");

          done();
        });
    });

    it("it should update Post (method: PUT)", done => {
      const newTitle = "new title";

      chai
        .request(app)
        .put(endpointUrl + id)
        .set("X-Access-Token", token)
        .send({ title: newTitle })
        .end((err, res) => {
          const r = res.body;
          const row = r.data;

          expect(r).to.have.property("message");
          expect(r).to.have.property("errors");
          expect(r).to.have.property("data");

          expect(row).to.have.property("_id");
          expect(row).to.have.property("title");
          expect(row).to.have.property("create_date");

          expect(row.title).to.equal(newTitle);

          done();
        });
    });


    describe("List of Compositions (method: GET)", () => {
      before( done => {
        const models = [
          { title: "name" },
          { title: "name 1"},
          { title: "name 2" },
        ];

        MODEL.remove({}, () =>{
          MODEL.create(models, () => {
            done();
          }) 
        });
      });

      it("it should get list with all fields", done => {
        chai
          .request(app)
          .get(endpointUrl)
          .set("X-Access-Token", token)
          .end((err, res) => {
            const r = res.body;
            const rows = r.data;

            expect(r).to.have.property("message");
            expect(r).to.have.property("errors");
            expect(r).to.have.property("data");

            expect(rows[0]).to.have.property("_id");
            expect(rows[0]).to.have.property("title");
            done();
          });
      });

      it("it should get list with selected fields", done => {
        chai
          .request(app)
          .get(endpointUrl + "?fields=title")
          .set("X-Access-Token", token)
          .end((err, res) => {
            const r = res.body;
            const rows = r.data;

            expect(r).to.have.property("message");
            expect(r).to.have.property("errors");
            expect(r).to.have.property("data");

            expect(rows[0]).to.have.property("_id");
            expect(rows[0]).to.have.property("title");

            done();
          });
      });

      it("it should get list with limit=1", done => {
        chai
          .request(app)
          .get(endpointUrl + "?limit=1")
          .set("X-Access-Token", token)
          .end((err, res) => {
            const r = res.body;
            const rows = r.data;

            expect(r).to.have.property("message");
            expect(r).to.have.property("errors");
            expect(r).to.have.property("data");

            expect(rows.length).to.equal(1);
            expect(rows[0]).to.have.property("_id");
            expect(rows[0]).to.have.property("title");

            done();
          });
      });

      it("it should get list with limit=1 and fields=name", done => {
        chai
          .request(app)
          .get(endpointUrl + "?limit=1&fields=title")
          .set("X-Access-Token", token)
          .end((err, res) => {
            const r = res.body;
            const rows = r.data;

            expect(r).to.have.property("message");
            expect(r).to.have.property("errors");
            expect(r).to.have.property("data");

            expect(rows.length).to.equal(1);
            expect(rows[0]).to.have.property("_id");
            expect(rows[0]).to.have.property("title");

            done();
          });
      });
    });

    it("it should remove Post (method: DELETE)", done => {
      chai
        .request(app)
        .delete(endpointUrl + id)
        .set("X-Access-Token", token)
        .send({ title: "name", url: "url" })
        .end((err, res) => {
          const r = res.body;

          expect(r).to.have.property("message");
          expect(r).to.have.property("errors");
          expect(r).to.have.property("data");

          done();
        });
    });


  });
});
