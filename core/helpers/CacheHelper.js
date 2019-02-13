const pug = require('pug');
const nodeCMS = require('../../app');

const createFolder = function(folder) {
};

const createFile = function(file) {
};

const getPostHTML = function(post) {
  let html = pug.renderFile('./themes/fedojo/single.pug', {
    title: post.title,
    create_date: post.create_date,
    content: post.content,
  });

  return html;
};

let Helper = {
  createFolder: createFolder,
  createFile: createFile,
  getPostHTML: getPostHTML,
};

module.exports = Helper;
