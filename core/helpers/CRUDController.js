'use strict';
const CRUDHelper = require('./CRUDHelper');

const CRUDController = (function() {
  let MODEL;

  function CRUDController(model) {
    MODEL = model;
  }

  CRUDController.prototype = {
    list: function(req, res) {
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

    create: function({ body }, res) {
      CRUDHelper
          .create(MODEL, body)
          .then((el) => {
                res
                    .status(200)
                    .json(el);
              },
          )
          .catch((err) => {
                res
                    .status(500)
                    .json(err);
              },
          );
    },

    read: function({ params }, res) {
      CRUDHelper
          .read(MODEL, params.id)
          .then((el) => {
                res
                    .status(200)
                    .json(el);
              },
          )
          .catch((err) => {
                res
                    .status(500)
                    .json(err);
              },
          );
    },

    update: function({ params, body }, res) {
      CRUDHelper
          .update(MODEL, params.id, body)
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

    delete: function({ params }, res) {
      CRUDHelper
          .delete(MODEL, params.id)
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

  };

  return CRUDController;
})();

module.exports = CRUDController;
