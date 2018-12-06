const AuthHelper = require('./AuthHelper');

const Ctrl = {
  register: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const response = await AuthHelper.register(email, password);
      
      res.json(response)
    } catch(e) {
      res.json(e)
    }
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const response = await AuthHelper.login(email, password);
      res.json(response)
    } catch (e) {
      res.json(e)
    }
  },

  logout: () => {
  }
}

module.exports = Ctrl;
