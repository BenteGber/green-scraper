const express = require('express');

const router = express.Router();

const scrape = require('./scrape');

const article = [
  {
    title: 'a',
    link: 'https://www.greentechmedia.com',
    source: 'https://www.greentechmedia.com',
    comments: 'donkey',
  },
  {
    title: 'Hello',
    link: 'https://www.greentechmedia.com',
    source: 'sandy',
    comments: 'd',
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  scrape.getGreentech('index', res.render);
});

module.exports = router;
