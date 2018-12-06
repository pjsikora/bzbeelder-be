const LISTED_VALUES = [
    '_id',
    'name',
    'title',
    'parent',
    'create_date',
    'weight',
    'type',
    'composition'
];

const READED_VALUES = [
    ...LISTED_VALUES,
    'seo_description',
    'seo_title',
    'seo_keywords'
];

const FOREIGN_KEYS = [
    'author',
    'composition'
];

module.exports = {
    LISTED_VALUES,  
    FOREIGN_KEYS,
    READED_VALUES
}