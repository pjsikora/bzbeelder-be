'use strict';

const express = require('express');
const CRUDHelper = require('../../../helpers/CRUDHelper')
const UserToken = require('../models/UserToken')
// const jwt = require('jsonwebtoken')

const Helper = {
  create: (obj) => {
    // console.log(obj.exp)
    return CRUDHelper
      .create(UserToken, obj, ['uid']);
  },

  getUserIdByToken: (token) => {
    return CRUDHelper
      .readValues(UserToken, {token: token}, ['uid']);
  },

  read: (presentationID) => {
    return CRUDHelper
      .read(UserToken, {_id: presentationID})
  },

  getList: () => {
    return CRUDHelper
      .listValues(UserToken, {}, ['_id', 'name'])
  },

  update: (presentationID, changesObj) => {
    return CRUDHelper
      .update(UserToken, presentationID, changesObj)
  },

  delete: (presentationID) => {
    return CRUDHelper
      .remove(UserToken, presentationID)
  }

};

module.exports = Helper;
