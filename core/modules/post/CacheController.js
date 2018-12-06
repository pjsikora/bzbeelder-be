const Post = require('../models/Post');
const fs = require('fs');
const pug = require('pug');
const nodeCMS = require('../../app');
const CacheHelper = require('../helpers/CacheHelper');
const CRUDHelper = require('../helpers/CRUDHelper');

const Controller = {
  /**
   * Clear public folder (remove all folders and files in static directory)
   * @param req
   * @param res
   */
  clear: function (req, res) {
    function rmDir (dirPath, removeSelf) {
      if (removeSelf === undefined) {
        removeSelf = true;
      }

      try {
        var files = fs.readdirSync(dirPath);
      } catch (e) {
        return;
      }

      if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
          } else {
            rmDir(filePath);
          }
        }
      }

      if (removeSelf) {
        fs.rmdirSync(dirPath);
      }
    }

    rmDir(nodeCMS.publicPath, false);

    res.json({success: true});
  },

  /**
   * Generate index file (main file)
   * @param req
   * @param res
   */
  generateIndex: function (req, res) {
    let path = nodeCMS.publicPath;
    let html = pug.renderFile('./themes/fedojo/index.pug', {});

    fs.writeFile(path + '/index.html', html, function (err) {
      if (err) {
        return console.log(err);
      } else {
        res.json({success: true});
      }
    });
  },

  /**
   * Generate folders and files into public folder
   * @param req
   * @param res
   */
  generate: function (req, res) {
    CRUDHelper.listAll(Post).then((items) => {
      items.forEach(function (el) {
        // path of generated directory (public folder path + slug path)
        let path = nodeCMS.publicPath + el.slug;

        // genereate HTML code based on theme single template
        let html = CacheHelper.getPostHTML(el);

        // create folder in public directory
        fs.mkdirSync(path);

        // save index.html file into folder
        fs.writeFile(path + '/index.html', html, function (err) {
          if (err) {
            return console.log(err);
          } else {}
        });
      });
      res.json({success: true, response: items});
    });
  },
};

module.exports = Controller;
