const fetch = require('cross-fetch');


module.exports = class QuoteService {
  static getQuotes() {
    const futurama =
    fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
      .then((futuramaQuote) => futuramaQuote.json())
      .then((futuramaParsed) => ({
        author: futuramaParsed[0].character,
        content: futuramaParsed[0].quote
      }));

    const program = 
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
      .then((programQuote) => programQuote.json())
      .then((programParsed) => ({
        author: programParsed.author,
        content: programParsed.en
      }));

    const random =
    fetch('https://api.quotable.io/random')
      .then((randomQuote) => randomQuote.json())
      .then((randomParsed) => ({
        author: randomParsed.author,
        content: randomParsed.content
      }));

    return Promise.allSettled([
      futurama,
      program,
      random,
    ])
      .then((responses) => {
        const quotes = responses.map((response) => response.value);
        console.log('$$$$$QUOTES$$$$$', quotes);
        return quotes;
        
      });
    
  }
  
};
