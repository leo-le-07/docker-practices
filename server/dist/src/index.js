'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.API_PORT;

var client = new _pg.Client({
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  host: 'xiusin-db',
  port: process.env.POSTGRES_PORT
});

app.use((0, _morgan2.default)('combined'));

app.get('/', function (req, res) {
  res.send('Hello from Express.js app!');
});

app.get('/ping', async function (req, res) {
  var database = await client.query('SELECT 1 + 1').then(function () {
    return 'up';
  }).catch(function () {
    return 'down';
  });

  res.send({
    environment: process.env.NODE_ENV,
    database: database
  });
});(async function () {
  await client.connect();
  app.listen(PORT, function () {
    return console.log('app running on ' + PORT);
  });
})();