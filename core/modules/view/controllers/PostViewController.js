const MODELPost = require('../../post/PostModel');
const CRUDHelper = require('../../../helpers/CRUDHelper');
const Config = require('../../../../config/config.json');

const ding = () => {
  return 'string';
};

let PageViewController = {
  getPostsList: async (req, res) => {
    try {
      const { items } = await CRUDHelper.listAllByDate(MODELPost);

      res
          .status(200)
          .render(Config.theme + '/post/list', {
            relatedPosts: items.slice(0, 3),
            posts: items,
          });
    } catch (err) {
      res
          .status(500)
          .json(err);
    }
  },

  getPost: async ({ params }, res) => {
    console.log(Config.theme);

    try {
      const {
        title,
        create_date,
        content,
        tags,
        seo_keywords,
        seo_description,
      } = await CRUDHelper.readBy(MODELPost,
          'slug', params.id);

      res
          .status(200)
          .render(Config.theme + '/post/single', {
            title: title,
            create_date: create_date,
            content: content,
            tags: tags,
            seo_title: title + Config.title,
            seo_keywords: seo_keywords + ', ' + Config.keywords,
            seo_description: seo_description,
          });
    } catch (err) {
      res
          .status(500)
          .json(err);
    }
  },
};

module.exports = PageViewController;
