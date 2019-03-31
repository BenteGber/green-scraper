const express = require('express');

const router = express.Router();

// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

const cheerio = require('cheerio');
const axios = require('axios');
const Article = require('../models/article');

// Make a request via axios to grab the HTML body from the site of your choice
const getGreentech = (page, cb) => {
  // TODO refactor title parsing to include title text.
  axios.get('https://www.greentechmedia.com').then((response) => {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(response.data);
    // An empty array to save the data that we'll scrape
    const results = [];
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $('div.copy-holder').each((i, element) => {
      const title = $(element)
        .children()
        .find('h1')
        .text()
        .trim();

      let link = $(element)
        .parent()
        .find('a')
        .attr('href');

      const rootUrl = 'https://www.greentechmedia.com';

      link = rootUrl + link;

      // Save these results in an object that we'll push into the results array we defined earlier
      // TODO add code to push results into DB
      results.push({
        title,
        link,
        source: rootUrl,
      });
      cb(page, results);
      // Log the results once you've looped through each of the elements found with cheerio
      console.log(results);
    });
  });
};

const getUtilityDive = (cb) => {
  axios.get('https://www.utilitydive.com/').then((response) => {
    const $ = cheerio.load(response.data);

    const results = [];

    $('h3.feed__title.feed__title--display').each((i, element) => {
      const title = $(element)
        .children()
        .text()
        .trim();

      let link = $(element)
        .find('a')
        .attr('href');

      const rootUrl = 'https://www.utilitydive.com/';

      link = rootUrl + link;

      // TODO add code to push results into DB
      results.push({
        title,
        link,
      });
      // results.forEach(el => cb(el));
    });
    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
  });
};

module.exports = {
  getGreentech,
  getUtilityDive,
};
/* GET users listing. */
// router.get('/articles/:source', (req, res, next) => {
//   res.render('index', data);
// });

module.exports = router;
