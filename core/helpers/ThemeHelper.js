var fs = require('fs');
var path = require('path');
var basePath = './';

function result_callback (results) {
  results.forEach((obj) => {
  });
};

const listAvailableThemes = function (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, items) {
      if (err) {
        reject(err);
      } else {
        var themes = {};

        items.forEach(function (el) {
          let info = getThemeInfo(el);

          if (info !== -1) {
            themes['name'] = el;
          }
        });

        resolve(themes);
      }
    });
  });
};

const setTheme = function () {
};
const currentTheme = function () {
};

const getThemeInfo = function (nameOfDir) {
  fs.readFile('./themes/' + nameOfDir + '/info.json', 'utf8', function (err, data) {
    if (err) {
      return -1;
    }
    return data;
  });
};

let Helper = {
  listAvailableThemes: listAvailableThemes,
  setTheme: setTheme,
  currentTheme: currentTheme
};

module.exports = Helper;
