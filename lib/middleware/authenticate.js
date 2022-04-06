const { verify } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME]; 
    if (!cookie) throw new Error('You must be signed in to continue');
    const user = verify(cookie);
    req.user = user;

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
