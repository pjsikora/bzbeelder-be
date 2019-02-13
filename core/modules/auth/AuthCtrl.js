const AuthHelper = require('./AuthHelper');

const Ctrl = {
  register: async ({ body }, res) => {
    const email = body.email;
    const password = body.password;

    try {
      const response = await AuthHelper.register(email, password);

      res.json(response);
    } catch (e) {
      res.json(e);
    }
  },

  login: async ({ body }, res) => {
    const email = body.email;
    const password = body.password;

    try {
      const response = await AuthHelper.login(email, password);

      res.json(response);
    } catch (e) {
      res.json(e);
    }
  },

  logout: () => {
  },
};

module.exports = Ctrl;
