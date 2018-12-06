const jwt = require('jsonwebtoken');
const CFG = require('../../../config');
const UserTokenHelper = require('../user/helpers/UserTokenHelper')

const AuthMiddleware = {
  loginCheck: (req, res, next) => {
    // var token = req.query.token;
    var token = req.headers['x-access-token'];


    if (token) {
      jwt.verify(token, CFG.secret, async (err, decoded) => {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token'});
        } else {
          try {
            req.BZ_USER = await UserTokenHelper.getUserIdByToken(token);
            req.BZ_USER_ID = req.BZ_USER.uid;
            
            req.BZ_TOKEN = token;
            req.decoded = decoded;
            next();
          } catch (err) {
            return res.json({success: false, message: err});
          }
        }
      });
    } else {
      return res
        .status(403)
        .send({
          success: false,
          message: 'No token'
        });
    }
  }
}

module.exports = AuthMiddleware;
