const express = require('express');
// const app = express();
// app.get('/', (req, res) => res.send('Hello World!'));

const craigslist = require('node-craigslist');
const client = new craigslist.Client({});
const { PostManager } = require('./post-manager');

const routes = require('./routes');

module.exports = function(app, ember) {

  const server = ember.httpServer;

  routes(app);
};
