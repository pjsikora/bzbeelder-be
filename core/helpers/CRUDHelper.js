'use strict';
const mongoose = require('mongoose');

const CRUDHelper = {
  /**
   * List all elements from model with condition
   * @param condition
   */
  list: function(Model, condition, sort) {
    return new Promise((resolve, reject) => {
      Model.find(condition, function(err, items) {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  },

  listCurried: (Model) => async (condition, config) => {
    let query = Model.find(condition);

    const itemsToCount = await new Promise((resolve, reject) => {
      Model.count(condition, (err, length) => {
        if (err) {
          reject(err);
        } else {
          resolve(length);
        }
      });
    });

    (typeof config.sort !== 'undefined') ? query.sort(config.sort) : null;
    (typeof config.fields === 'string') ? query.select(config.fields.split(',').join(' ')) : null;
    (typeof config.limit !== 'undefined') ? query.limit(config.limit) : null;
    (typeof config.offset !== 'undefined') ? query.skip(config.offset) : null;

    return new Promise((resolve, reject) => {
      query.exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve({ items, total: itemsToCount });
        }
      });
    });
  },

  // listSortedByDate: function(Model, condition) {
  //   return new Promise((resolve, reject) => {
  //     Model.find(condition)
  //       .sort({ create_date: -1 })
  //       .exec((err, items) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(items);
  //         }
  //       });
  //   });
  // },

  // listValuesSortedByDate: function(Model, condition, values) {
  //   return new Promise((resolve, reject) => {
  //     Model.find(condition)
  //       .sort({ create_date: -1 })
  //       .exec((err, items) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           let finalItems = [];

  //           items.forEach(el => {
  //             let item = {};

  //             values.forEach(val => {
  //               item[val] = el[val];
  //             });

  //             finalItems.push(item);
  //           });

  //           resolve(finalItems);
  //         }
  //       });
  //   });
  // },

  /**
   * Create element
   * @param Model
   * @param obj
   * @returns {Promise}
   */
  create: function(Model, obj, foreignsArr) {
    var newObj = {},
        newItem;

    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        newObj[k] = obj[k];
      }
    }

    if (typeof foreignsArr !== 'undefined') {
      foreignsArr.forEach(f => {
        if (mongoose.Types.ObjectId.isValid(f)) {
          newObj[f] = mongoose.Types.ObjectId(f);
        }
      });
    }

    newItem = new Model(newObj);

    return new Promise((resolve, reject) => {
      newItem.save(function(err, el) {
        if (err) {
          reject(err);
        } else {
          resolve({ _id: el._id });
        }
      });
    });
  },

  /**
   * Read element
   * @param Model
   * @param id
   * @returns {Promise}
   */
  read: function(Model, id) {
    return new Promise((resolve, reject) => {
      Model.findById(id, (err, item) => {
        if (err) {
          reject(err);
        } else {
          resolve(item);
        }
      });
    });
  },

  /**
   * Read element by property name
   * @param {*} Model
   * @param {*} propertyName
   * @param {*} value
   */
  readBy: function(Model, propertyName, value) {
    const condition = {};
    condition[propertyName] = value;

    return new Promise((resolve, reject) => {
      Model.findOne(condition, (err, item) => {
        if (err) {
          reject(err);
        } else {
          resolve(item);
        }
      });
    });
  },
  /**
   * Read element
   * @param Model
   * @param id
   * @param values
   * @returns {Promise}
   */
  readValues: function(Model, conditions, values) {
    return new Promise((resolve, reject) => {
      Model.findOne(conditions, (err, item) => {
        if (err) {
          reject(err);
        } else {
          let newItem = {};

          values.forEach(el => {
            newItem[el] = item[el];
          });

          resolve(newItem);
        }
      });
    });
  },

  /**
   * Update element
   * @param Model
   * @param id
   * @param obj
   * @param foreignsArr
   * @returns {Promise}
   */
  update: (Model, id, obj, foreignsArr) => {
    var newObj = {};

    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        newObj[k] = obj[k];
      }
    }

    if (typeof foreignsArr !== 'undefined') {
      foreignsArr.forEach(f => {
        if (mongoose.Types.ObjectId.isValid(f)) {
          newObj[f] = mongoose.Types.ObjectId(f);
        }
      });
    }

    return new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(id, newObj, { new: true }, (err, el) => {
        // {new: true} will send updated object. Without this flag resolve will send previous state of element
        if (err) {
          reject({ error: JSON.stringify(err) });
        } else {
          resolve(el);
        }
      });
    });
  },

  /**
   * Remove element
   * @param Model
   * @param id
   * @returns {Promise}
   */
  delete: (Model, id) => {
    return new Promise((resolve, reject) => {
      Model.findByIdAndRemove(id, (err, el) => {
        if (err) {
          reject(err);
        } else {
          resolve(el);
        }
      });
    });
  },

  /**
   * List all elements
   * @param Model
   * @returns {*}
   */
  listAll: function(Model) {
    return CRUDHelper.list(Model, {});
  },

  listAllByDate: async (Model) => {
    let query = Model.find();

    query.sort({ create_date: -1 });

    return new Promise((resolve, reject) => {
      query.exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve({ items });
        }
      });
    });
  },

  /**
   * List selected values
   * @param Model - MongooseModel
   * @param condition - Object
   * @param values - Array
   * @returns {Promise}
   */
  listValues: function(Model, condition, values) {
    return new Promise((resolve, reject) => {
      Model.find(condition, function(err, items) {
        if (err) {
          reject(err);
        } else {
          let finalItems = [];

          items.forEach(el => {
            let item = {};

            values.forEach(val => {
              item[val] = el[val];
            });

            finalItems.push(item);
          });

          resolve(finalItems);
        }
      });
    });
  },
};

module.exports = CRUDHelper;
