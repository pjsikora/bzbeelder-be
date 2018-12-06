const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  pid: {
    type: Schema.ObjectId
  },
  slug: String,
  title: String,
  content: String,
  main_image: String,

  seo_description: String,
  seo_title: String,
  seo_keywords: String,

  create_date: {
    type: Date,
    required: true,
    default: Date.now
  },

  tags: String,
  author: String,
  
  isVisible: Boolean,
  isDeleted: Boolean
});

module.exports = mongoose.model('Post', schema);
