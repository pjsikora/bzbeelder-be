const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  createdAt: {
    required: true,
    type: Date,
    default: Date.now
  },
  token: {
    required: true,
    type: String
  },
  iat: {
    required: true,
    type: Number
  },
  uid: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  exp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('UserToken', schema);
