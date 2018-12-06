process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const UserModel = require("../../user/models/User");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../../app");
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);

const userName = "tester@unit";

//Our parent block
describe("Auth API endpoint", () => {
  before(done => {
    UserModel.findOneAndRemove({ email: userName }, err => {
      done();
    });
  });

  describe("Register (method: POST)", () => {
    it("it should register user", done => {
      chai
        .request(app)
        .post("/api/auth/register")
        .send({ email: userName, password: "password" })
        .end((err, res) => {
          done();
        });
    });
  });

  describe("Login (method: POST)", () => {
    describe("Before activation", () => {
      it("User shouldn't login when is not activated", done => {
        chai
          .request(app)
          .post("/api/auth/login")
          .send({ email: userName, password: "password" })
          .end((err, res) => {
            const body = res.body;
            expect(body).to.have.property("success");
            expect(body.success).to.equal(false);

            done();
          });
      });
    });
    describe("After activation", () => {
      beforeEach(done => {
        UserModel.findOneAndUpdate(
          { email: userName },
          { isActive: 1 },
          (err, doc) => {
            done();
          }
        );
      });
      it("User shouldn login when is activated", done => {
        chai
          .request(app)
          .post("/api/auth/login")
          .send({ email: userName, password: "password" })
          .end((err, res) => {
            const body = res.body;
            expect(body).to.have.property("success");
            expect(body.success).to.equal(true);

            done();
          });
      });
      it("User should have token in login response", done => {
        chai
          .request(app)
          .post("/api/auth/login")
          .send({ email: userName, password: "password" })
          .end((err, res) => {
            const body = res.body;
            expect(body).to.have.property("token");

            done();
          });
      });
    });
  });

  after(done => {
    done();
  });
});
