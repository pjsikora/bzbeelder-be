const MODELPost = require('../../post/PostModel');
const CRUDHelper = require('../../../helpers/CRUDHelper');
const Config = require('../../../../config/config.json');

const ding = () => {
    return 'string';
}

let PageViewController = {
    getPostsList: async (req, res) => {
        try {
            const {items} = await CRUDHelper.listAllByDate(MODELPost);

            res
                .status(200)
                .render(Config.theme + '/post/list', {
                    relatedPosts: items.slice(0,3),
                    posts: items
                })
        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    },

    getPost: async (req, res) => {
        console.log(Config.theme);

        try {
            const post = await CRUDHelper.readBy(MODELPost, 'slug', req.params.id);

            res
                .status(200)
                .render(Config.theme + '/post/single', {
                    title: post.title,
                    create_date: post.create_date,
                    content: post.content,
                    tags: post.tags,
                    seo_title: post.title + Config.title,
                    seo_keywords: post.seo_keywords + ', ' + Config.keywords,
                    seo_description: post.seo_description
                })
        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    }
}

module.exports = PageViewController;
