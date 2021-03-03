const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.post('/clicks', (req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}!`));