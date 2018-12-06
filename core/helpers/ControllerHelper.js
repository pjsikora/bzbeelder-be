const CRUDHelper = require('./CRUDHelper');

class CtrlHelper {
    constructor(model, config) {
      this.model = model;
      this.LIST_VALUES = config.LIST_VALUES || [];
      this.LIST_CONDITION = config.LIST_CONDITION || {};
      this.CREATE_FOREIGN_KEYS = config.CREATE_FOREIGN_KEYS || [];
    }
  
    getTokenFromRequest(req) {
      return req.headers['x-access-token'];
    }
  
    async list(req, res) {
      // const token = req.headers['x-access-token'];
  
      try {
        const list = await CRUDHelper.listValuesSortedByDate(this.model, {}, this.LIST_VALUES);
        res
          .status(200)
          .json(list);
      } catch (e) {
        res
          .status(500)
          .json(e);
      }
    }
  
    async create(req, res) {
      // const token = req.headers['x-access-token'];
      // let obj = req.body;
    
      try {
        const element = await CRUDHelper.create(this.model, req.body, this.CREATE_FOREIGN_KEYS)
        res
          .status(200)
          .json(element);
      } catch (e) {
        res
          .status(500)
          .json(err);
      }
    }
  
    async read (req, res) {
      // const token = req.headers['x-access-token'];
  
      try {
        const element = await CRUDHelper.read(this.model, req.params.id);
  
        res
          .status(200)
          .json(element);
      } catch (e) {
        res
          .status(500)
          .json(err);
      }
    }
  }

  module.exports = CtrlHelper;