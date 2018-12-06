// 'use strict'
//
// process.env.NODE_ENV = 'test';
//
// const mongoose = require("mongoose");
// // const PresentationCtrl = require('./PresentationCtrl');
// // const Presentation = require('../models/Presentation');
// const User = require('../models/User');
// const DummyHelper = require('../helpers/DummyHelper');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../index');
// const expect = require('chai').expect;
// const should = chai.should();
//
// chai.use(chaiHttp);
//
// describe('AuthCtrl', () => {
//   beforeEach((done) => {
//     User.remove({}, () => {
//       DummyHelper
//         .insertUsers()
//         .then(() => {
//           done();
//         });
//     });
//   });
//
//   afterEach((done) => {
//     User.remove({}, () => {
//       done();
//     });
//   });
//
//   describe('Method: POST | Url: /api/login', () => {
//     it('it should login and send token', (done) => {
//       chai
//         .request(server)
//         .post('/api/login')
//         .type('form')
//         .send({email: 'admin@admin', password: 'password'})
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.exist(res.body.token);
//           done();
//         });
//     });
//
//     it('it shouldnt login when bad login has been sent', (done) => {
//       chai
//         .request(server)
//         .post('/api/login')
//         .type('form')
//         .send({email: 'admin', password: 'password'})
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(res.body.token);
//           done();
//         });
//     });
//
//     it('it shouldnt login when bad password has been sent', (done) => {
//       chai
//         .request(server)
//         .post('/api/login')
//         .type('form')
//         .send({email: 'admin@admin', password: 'pass'})
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(res.body.token);
//           done();
//         });
//     });
//   });
// });
