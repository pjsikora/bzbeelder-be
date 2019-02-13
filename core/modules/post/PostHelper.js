'use strict';

const ElementHelper = Object.freeze({
  LIST_FOR_LOGGED_USER: [
    '_id',
    'title',
    'content',
    'isGlobal',
    'isDeleted',
    'isVisible',
    'create_date',

    'tags',
    'author',
    'slug',
    'tags',
  ],

  LIST_FOR_ANONYMOUS_USER: [],

});

module.exports = ElementHelper;
