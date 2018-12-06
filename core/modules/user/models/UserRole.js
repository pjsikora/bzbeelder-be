const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
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

module.exports = mongoose.model('UserRole', schema);
