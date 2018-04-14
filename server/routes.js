

const express = require('express');
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

  app.post('/fetch-posts', async (req, res) => {

    // TODO: add multiple cities

    let listings;
    try {
      listings = await client.search({
        city: 'madison',
        category: 'cta'
      }, 'sprinter');
    } catch (e) {
      console.error('Couldnt pull postings from clist');
      res.sendStatus(404);
    }

    // TODO: Remove slice
    listings = listings.slice(0, 3);

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

    // TODO: Implement
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
      posts: [{
            category: 'madison.craigslist.org',
            date: '2018-04-10 20:48',
            hasPic: true,
            location: '(Madison)',
            pid: '6557695822',
            price: '$3000',
            title: 'Dodge sprinter van',
            url: 'https://madison.craigslist.org/cto/d/dodge-sprinter-van/6557695822.html',
            complete: false,
            trash: false,
            id: 1,
            _id: 'qWSjQvDXJG0NWHm6'
          },
        {
          category: 'madison.craigslist.org',
          date: '2018-04-10 20:48',
          hasPic: true,
          location: '(Madison)',
          pid: '6557695822',
          price: '$3000',
          title: 'Dodge sprinter van',
          url: 'https://madison.craigslist.org/cto/d/dodge-sprinter-van/6557695822.html',
          complete: false,
          trash: false,
          id: 2,
          _id: 'qWSjQvDXJG0NWHm6'
        },
      ]}
    ))
  });

  app.use(function(err, req, res, next) {
    res.setStatus(400);
    res.send(err.message);
  });

  app.listen(4100);

};
