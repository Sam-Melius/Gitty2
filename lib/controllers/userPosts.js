const { Router } = require('express');
const GithubUser = require('../models/GithubUser');

module.exports = Router()
  .get('/:id/posts', async (req, res, next) => {
    try {
      const user = await GithubUser.findByUsernamePosts(req.params.id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

