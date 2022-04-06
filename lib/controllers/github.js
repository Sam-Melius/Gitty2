const { Router } = require('express');
const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');
const { sign } = require('../utils/jwt');

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()

  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
  })

  .get('/login/callback', async (req, res, next) => {
    
    try {
      const user = await UserService.create(req.query.code);
      res.cookie(process.env.COOKIE_NAME, sign(user), {
        httpOnly: true,
        maxAge: ONE_DAY,
  
      })
        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
    //const payload = jwt.sign(user.JSON(), process.env.JWT_SECRET, { expiresIn: '1 day' }); 
    
    
  }) 

  .delete('/sessions', (req, res) => {
    res.clearCookie(process.COOKIE_NAME)
      .json({ success: true, message: 'Signed Out' });
  })

  .get('/dashboard', authenticate, (req, res) => {
    res.send(req.user);
  })

;
