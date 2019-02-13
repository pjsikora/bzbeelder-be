'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const User = require('../user/models/User');
const UserTokenHelper = require('../user/helpers/UserTokenHelper');

const AuthHelper = {
  register: (email, password) => {
    var hashedPassword = bcrypt.hashSync(password);

    return new Promise((resolve, reject) => {
      var user = new User({
        email: email,
        password: hashedPassword,
        isActive: false,
      });

      user.save(function(err, el) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'User created' });
        }
      });
    });
  },

  login: (email, password) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          reject(err);
        }
        if (!user) {
          reject({
            success: false,
            message: 'Authentication failed. User not found.',
          });
        } else if (user) {
          if (!user.isActive) {
            reject({
              success: false,
              message: 'Authentication failed. User isn\'t active.',
            });
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
              if (!err) {
                if (result === true) {
                  const payload = {
                    admin: user.admin,
                  };

                  var token = jwt.sign(payload, config.secret, {
                    expiresIn: '1440m', // expires in 24 hours
                  });

                  const decoded = jwt.decode(token);

                  UserTokenHelper.create({
                    uid: user._id,
                    iat: parseInt(decoded.iat),
                    exp: parseInt(decoded.exp),
                    token: token,
                  }).then(resp => {
                    resolve({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token,
                    });
                  });
                } else {
                  reject({
                    success: false,
                    message: 'Authentication failed. Wrong password.',
                  });
                }
              } else {
                reject(err);
              }
            });
          }
        }
      });
    });
  },

  logout: () => {},
};

module.exports = AuthHelper;
