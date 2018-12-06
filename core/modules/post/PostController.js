const fs = require("fs");
const pug = require("pug");
const MODEL = require("./PostModel");
const CRUDHelper = require("../../helpers/CRUDHelper");
const PostHelper = require("./PostHelper");
const UserTokenHelper = require("../user/helpers/UserTokenHelper");
// const path = require('path');
const FileHelper = require('../../helpers/FileHelper');
const ResponseHelper = require('../../helpers/ResponseHelper');
const QueryHelper = require('../../helpers/QueryHelper');

const PostController = {
  list: async (req, res) => {
    const config = QueryHelper.parse(req.query);
    const condition = {};

    try {
      const list = await CRUDHelper.listCurried(MODEL)(condition, config);

      res
        .status(200)
        .json(ResponseHelper.successResponse(list.items, config.limit, list.total));
    } catch (err) {
      res
        .status(500)
        .json(ResponseHelper.errorResponse(err));
    }
  },

  read: async (req, res) => {
    try {
      const post = await CRUDHelper.read(MODEL, req.params.id);

      res
        .status(200)
        .json(ResponseHelper.successResponse(post));
    } catch (e) {
      res
        .status(500)
        .json(ResponseHelper.errorResponse(err));
    }
  },

  create: async (req, res) => {
    const foreignKeysArr = ["author"];
    let obj = req.body;

    try {
      const user = req.BZ_USER;
      obj.author = user.uid;
      const element = await CRUDHelper.create(MODEL, req.body, foreignKeysArr);

      res
        .status(200)
        .json(ResponseHelper.successResponse(element));
    } catch (err) {
      res
        .status(500)
        .json(ResponseHelper.errorResponse(err));
    }
  },

  update: async (req, res) => {
    let obj = req.body;

    try {
      const user = req.BZ_USER;
      obj.author = user.uid;
      const element = await CRUDHelper.update(MODEL, req.params.id, obj, ["author"]);

      res
        .status(200)
        .json(ResponseHelper.successResponse(element));
    } catch (err) {
      res
        .status(500)
        .json(ResponseHelper.errorResponse(err));
    }
  },

  delete: async (req, res) => {
    try {
      const element = await CRUDHelper.delete(MODEL, req.params.id);

      res
        .status(200)
        .json(ResponseHelper.successResponse(element));
    } catch (err) {
      res
        .status(500)
        .json(ResponseHelper.errorResponse(err));
    }
  },

  generateCache: async (req, res) => {
    const values = PostHelper.LIST_FOR_LOGGED_USER;

    try {
      const condition = {};
      const list = await CRUDHelper.listValuesSortedByDate(
        MODEL,
        condition,
        values
      );

      PostController.generateIndex();
      await PostController.createPostsHtmlFiles();

      res
        .status(200)
        .json(titles);
    } catch (e) {
      res
        .status(500)
        .json(e);
    }
  },

  createHtmlFile: (filePath, content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(filePath);
        }
      });
    });
  },

  deleteCache: (req, res) => {
    FileHelper.deleteFolderRecursive('./public/posts');

    res
    .status(200)
    .json({status: true})
  },

  createHtmlFileFromPug: async (
    pugTemplatePath,
    targetHtmlFile,
    variablesObject
  ) => {
    let html = pug.renderFile(pugTemplatePath, variablesObject);
    return await PostController.createHtmlFile(targetHtmlFile, html);
  },

  createPostsHtmlFiles: async () => {
    try {
      const condition = {};
      const values = PostHelper.LIST_FOR_LOGGED_USER;
      const list = await CRUDHelper.listValuesSortedByDate(
        MODEL,
        condition,
        values
      );

      for (const post of list) {
        if (typeof post.slug !== "undefined") {
          FileHelper.mkDirByPathSync("./public/posts/"+post.slug);
          await PostController.createHtmlFile("./public/posts/" + post.slug + "/index.html", post.content);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },

  generateIndex: async () => {
    try {
      let html = pug.renderFile("./views/index.pug", {});
      return await PostController.createHtmlFile("./public/index.html", html);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = PostController;
