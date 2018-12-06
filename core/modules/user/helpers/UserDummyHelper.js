const User = require('../models/User');

const users = [
  {
    name: 'admin',
    password: 'password',
    email: 'admin@admin'
  }];

function insertDummy (Model, data) {
  const promises = data.map((el) => {
    return new Promise((resolve, reject) => {
      let record = new Model(el);

      record.save((error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result);
      })
    })
  });

  return Promise
    .all(promises)
}

const insertUsers = function() {
  return insertDummy(User, users);
}

module.exports = {
  users,
  insertUsers
};
