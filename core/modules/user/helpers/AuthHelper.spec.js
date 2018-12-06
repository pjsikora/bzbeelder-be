// 'use strict'

// const AuthHelper = require('../../auth/AuthHelper');
// const User = require('../models/User');
// const DummyHelper = require('./DummyHelper');
// const expect = require('chai').expect;

// describe('AuthHelper', () => {
//   beforeEach((done) => {
//     User.remove({}, () => {
//       DummyHelper
//         .insertUsers()
//         .then(() => {
//           done();
//         });
//     });
//   });

//   afterEach((done) => {
//     User.remove({}, () => {
//       done();
//     });
//   })

//   describe('login', () => {
//     it('should be a function', () => {
//       expect(AuthHelper.login).to.be.a('function')
//     });

//     // it('should return promise', () => {
//     //   expect(AuthHelper.login()).to.be.a('Promise');
//     //   expect(AuthHelper.login().then).to.be.a('function');
//     //   expect(AuthHelper.login().catch).to.be.a('function');
//     // });

//     it('should return object when login', () => {
//       return AuthHelper
//         .login('admin@admin', 'password')
//         .then((result) => {
//           expect(result).to.be.a('object');
//         })
//         .catch(() => {});
//     });

//     it('should return token when login is passed', () => {
//       return AuthHelper
//         .login('admin@admin', 'password')
//         .then((result) => {
//           expect(result.token).to.be.a('string');
//           expect(result.token.length).to.be.above(10);
//           expect(result.success).to.be.eq(true);
//         }).catch(() => {});
//     });

//     it('should return object with error when bad login is passed', () => {
//       return AuthHelper
//         .login('admin@admi', 'password')
//         .then((result) => {

//         })
//         .catch((result) => {
//           expect(result).to.be.a('object');
//           expect(result.success).to.be.eq(false);
//           expect(result.message).to.be.a('string');
//           expect(result.message).to.be.eq('Authentication failed. User not found.');
//         });
//     });

//     it('should return object with error when bad password is passed', () => {
//       return AuthHelper
//         .login('admin@admin', 'passwor')
//         .then((result) => {

//         })
//         .catch((result) => {
//           expect(result).to.be.a('object');
//           expect(result.success).to.be.eq(false);
//           expect(result.message).to.be.a('string');
//           expect(result.message).to.be.eq('Authentication failed. Wrong password.');
//         });
//     });
//   });
// })
