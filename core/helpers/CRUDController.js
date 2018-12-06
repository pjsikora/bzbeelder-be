'use strict';
const CRUDHelper = require('./CRUDHelper');

const CRUDController = (function () {
  let MODEL;

  function CRUDController(model) {
    MODEL = model;
  }

  CRUDController.prototype = {
    list: function (req, res) {
      CRUDHelper.list(MODEL, {})
        .then((arr) => {
          res
            .status(200)
            .json(arr);
        })
        .catch((err) => {
          res
            .status(500)
            .json(err);
        });
    },

    create: function (req, res) {
      CRUDHelper
        .create(MODEL, req.body)
        .then((el) => {
            res
              .status(200)
              .json(el);
          }
        )
        .catch((err) => {
            res
              .status(500)
              .json(err);
          }
        );
    },

    read: function (req, res) {
      CRUDHelper
        .read(MODEL, req.params.id)
        .then((el) => {
            res
              .status(200)
              .json(el);
          }
        )
        .catch((err) => {
            res
              .status(500)
              .json(err);
          }
        );
    },

    update: function (req, res) {
      CRUDHelper
        .update(MODEL, req.params.id, req.body)
        .then((el) => {
          res
            .status(200)
            .json(el);
        })
        .catch((err) => {
          res
            .status(500)
            .json(err);
        });
    },

    delete: function (req, res) {
      CRUDHelper
        .delete(MODEL, req.params.id)
        .then((el) => {
          res
            .status(200)
            .json(el);
        })
        .catch((err) => {
          res
            .status(500)
            .json(err);
        });
    }

  }

  return CRUDController;
})();

module.exports = CRUDController;
