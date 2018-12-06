const CRUDHelper = require('../../../helpers/CRUDHelper');
const Model = require('../models/User');

const Ctrl = {
  list: function (req, res) {
    CRUDHelper
      .listValues(Model, {}, ['_id', 'email', 'password'])
      .then((items) => {
        res.json(items);
      })
      .catch((error) => {
        res.json({success: false, error: error});
      });
  },

  create: (req, res) => {
    CRUDHelper
      .create(Model, req.body)
      .then((items) => {
        res.json({success: true, response: items});
      })
      .catch((error) => {
        res.json({success: false, error: error});
      });
  },

  read: (req, res) => {
    let id = req.params.id;

    CRUDHelper
      .read(Model, {_id: id})
      .then((el) => {
        res.json(el);
      })
      .catch((error) => {
        res.json({success: false, error: error});
      });
  },

  update: (req, res) => {
    CRUDHelper
      .update(Model, req.params.id, req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({success: false, error: error});
      });
  },

  delete: (req, res) => {
    CRUDHelper
      .remove(Model, req.params.id)
      .then(() => {
        res.json({success: true});
      })
      .catch((error) => {
        res.json({success: false, error: error});
      });
  },
};

module.exports = Ctrl;
