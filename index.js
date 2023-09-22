require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const isUrl = require("is-url");

// Basic Configuration
const port = process.env.PORT || 3000;
let counter = 0;
const shortenedUrls = {};
const cur_url = "https://boilerplate-project-urlshortener.mohammadallie.repl.co"
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  if (!isUrl(url)) {
    res.send({ error: 'invalid url' })
    return;
  }
  counter += 1;
  shortenedUrls[counter] = url;
  res.send({ original_url: req.body.url, short_url: cur_url + "/api/shorturl/" + counter });
})

app.get('/api/shorturl/:id', function(req, res) {
  id = req.params.id;
  actual = shortenedUrls[id];
  res.redirect(actual)
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
