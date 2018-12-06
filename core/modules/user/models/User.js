const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  userRoles: [],
  createdAt: {
    required: true,
    type: Date,
    default: Date.now
  },
  groups: Array,
  acl: Object,
  isActive: {
    default: false,
    type: Boolean
  }
});

schema.plugin(mongooseUniqueValidator);

schema.pre('save', function (next) {
  var user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', schema);
