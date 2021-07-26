const express = require('express');
const jsdom = require('jsdom');

const dom = new jsdom.JSDOM('');
const $ = require('jquery')(dom.window);

const PORT = 3000;
const API_KEY = require('../config.js');

$.ajaxPrefilter((settings, _, jqXHR) => {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});


const app = express();

// app.use( express.json() );

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/products', (req, res) => {
  $.ajax({
    method: 'GET',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/',
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    },
  });
});

app.get('/reviews', (req, res) => {
  $.ajax({
    method: 'GET',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/meta?product_id=20100',
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    },
  });
});

app.get('/questions', (req, res) => {
  $.ajax({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions?product_id=${req.query.productId}&page=1&count=50`,
    success: (data) => {
      res.send(data);
    },
    error: (err) => {
      res.sendStatus(500, err);
    }
  })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
