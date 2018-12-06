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

    LIST_FOR_ANONYMOUS_USER: [
            // '_id',
            // 'name',
            // 'isDeleted',
            // 'isVisible',
            // 'create_date',
            // 'variables',
            // 'html',
            // 'css',
            // 'js',
            // 'tags',
            // 'categories',
            // 'children'
        ]

});

module.exports = ElementHelper;