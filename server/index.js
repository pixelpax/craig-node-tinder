const express = require('express');
// const app = express();
// app.get('/', (req, res) => res.send('Hello World!'));


module.exports = function(app, ember) {

  const server = ember.httpServer;

  const morgan = require('morgan');
  app.use(morgan('dev'));

  app.use(express.static('dist'));
  app.use(express.static('public'));


  app.listen(4100);
};
