const { Router } = require('express');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/quotes', async (req, res) => {
    const profile = await QuoteService.getQuotes(req.body);
    res.send(profile);
    return profile;
  });
