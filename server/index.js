const express = require('express');
// const app = express();
// app.get('/', (req, res) => res.send('Hello World!'));

const craigslist = require('node-craigslist');
const client = new craigslist.Client({});
const { PostManager } = require('./post-manager');

module.exports = function(app, ember) {

  const server = ember.httpServer;

  const morgan = require('morgan');
  app.use(morgan('dev'));

  app.use(express.static('dist'));
  app.use(express.static('public'));

  app.post('/fetch-posts', async (req, res) => {
    let listings;
    try {
      listings = await client.search({
        city: 'madison',
        category: 'cta'
      }, 'sprinter');
    } catch (e) {
      console.error('Couldnt pull postings from clist');
    }

    try {
      await PostManager.addPosts(listings);
      res.sendStatus(200);
    } catch (e) {
      console.error('Couldnt add listings');
    }


  });


  app.listen(4100);
};
