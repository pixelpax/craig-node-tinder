

const express = require('express');
const bodyParser = require('body-parser');
// const app = express();
// app.get('/', (req, res) => res.send('Hello World!'));

const craigslist = require('node-craigslist');
const client = new craigslist.Client({});
const { PostManager } = require('./post-manager');

module.exports = function(app) {

  const morgan = require('morgan');
  app.use(morgan('dev'));

  app.use(express.static('dist'));
  app.use(express.static('public'));

  app.use(bodyParser.json())

  app.post('/fetch-posts', async (req, res) => {

    // TODO: add multiple cities

    let listings;
    try {
      listings = await client.search({
        city: 'madison',
        category: 'cta'
      }, 'sprinter');
    } catch (e) {
      res.status(404);
      res.send('Couldnt pull postings from clist');
      return;
    }

    // TODO: Remove slice
    listings = listings.slice(0, 10);

    // TODO: Filter the list by date

    try {
      await PostManager.addPosts(listings);
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(listings))
    } catch (e) {
      console.error('Couldnt add listings');
      res.status(404);
      res.send('Couldnt add listings');
    }


  });

  app.get('/posts', async(req, res) => {

    let pageNumber = Number(req.query.pageNumber); // TODO: add a query param for page
    let pageSize = Number(req.query.pageSize); // TODO: add a query param for page
    let filterByBookmarked = req.query.bookmarked;

    try {
      let postPage = await PostManager.getPage(pageSize, pageNumber, filterByBookmarked);
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify({posts: postPage} ))
    } catch (e) {
      res.status(400);
      res.send(err.message);
    }
  });

  // Not intended for frontend consumption
  app.get('/posts/all', async(req, res) => {
    try {
      let posts = await PostManager.getAllPosts();
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify({posts: posts} ))
    } catch (e) {
      res.status(400);
      res.send(err.message);
    }
  });

  // Not intended for frontend consumption
  app.delete('/posts/all', async (req, res) => {
    try {
      await PostManager.removeAllPosts();
      res.sendStatus(200);
    } catch (e) {
      res.status(400);
      res.send(e.message);
    }
  });

  app.get('/details', async(req, res) => {
    try {
      let url = decodeURI(req.query.url);
      let detail = await client.details({url});
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(detail))
    } catch (e) {
      console.log(e);
    }
  });

  app.put('/posts/:pid/bookmark', async (req, res) => {
    try {
      let {bookmarked} = req.body;
      let {pid} = req.params;
      await PostManager.bookmark(bookmarked, pid);
      res.sendStatus(200);
    } catch (e) {
      res.status(400);
      res.send(e.message);
    }
  });

  app.put('/posts/:pid/trash', async (req, res) => {
    try {
      let {trash} = req.body;
      let {pid} = req.params;
      await PostManager.trashPost(trash, pid);
      res.sendStatus(200);
    } catch (e) {
      res.status(400);
      res.send(e.message);
    }
  });

  app.use(function(err, req, res, next) {
    res.setStatus(400);
    res.send(err.message);
  });

  app.listen(4100);

};
