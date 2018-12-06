'use strict';
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;

const ConditionHelper = {
  userCanUse: function(userId) {
    const userObject = new ObjectID(userId);
    const condition = {
      $or: [
        {
          isGlobal: true
        },
        {
          author: userObject
        },
        {
          usersCanUse: {
            $in: [userObject]
          }
        }
      ]
    };

    return condition;
  },
  
  userCanEdit: function(userId) {
    const userObject = new ObjectID(userId);
    const condition = {
      $or: [
        {
          isGlobal: true
        },
        {
          author: userObject
        },
        {
          userCanEdit: {
            $in: [userObject]
          }
        }
      ]
    };

    return condition;
  }
}


module.exports = ConditionHelper;
