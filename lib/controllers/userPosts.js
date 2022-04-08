const { Router } = require('express');
const GithubUser = require('../models/GithubUser');

module.exports = Router()
  .get('/:id/posts', (req, res, next) => {
    
    GithubUser.findByUsernamePosts(req.params.id)
      .then((user) => res.send(user))
      .catch((error) => next(error));
    
  });

