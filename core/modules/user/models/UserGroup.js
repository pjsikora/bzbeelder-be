const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('UserGroup', schema);
