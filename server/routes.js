const craigslist = require('node-craigslist');
const client = new craigslist.Client({});

const express = require('express');
const bodyParser = require('body-parser');
// const app = express();
// app.get('/', (req, res) => res.send('Hello World!'));

const { PostManager } = require('./post-manager');

// const { PostFetcher } = require('./postFetcher');


async function fetchSprinterPostsFromCity(city) {
  let listings;
  try {
    listings = await client.search({
      city,
      category: 'cta'
    }, 'sprinter');
    return listings.filter(listing => !!listing.title.toLowerCase().match(/sprinter/));
  } catch (e) {
    throw e;
    // res.status(404);
    // res.send('Couldnt pull postings from clist');
  }
}

async function fetchTransitPostsFromCity(city) {
  let listings;
  try {
    listings = await client.search({
      city,
      category: 'cta'
    }, 'transit -"transit connect"');
    // let listings = JSON.parse('{"category":"madison.craigslist.org","date":"2018-03-23 16:54","hasPic":true,"location":"(Brillion - www.PRESTIGEAUTO.com)","pid":"6541044442","price":"$22995","title":"2013 FREIGHTLINER SPRINTER 2500 EXTENDED HIGH ROOF CARGO VAN DIESEL","url":"https://madison.craigslist.org/ctd/d/2013-freightliner-sprinter/6541044442.html","complete":false,"trash":false,"bookmarked":false,"id":"6541044442","_id":"yOpOpsrpu2edrhHr"},{"category":"madison.craigslist.org","date":"2018-03-26 12:13","hasPic":true,"location":"(Green Bay)","pid":"6543457508","price":"$18997","title":"2013 Mercedes Benz Sprinter 2500","url":"https://madison.craigslist.org/ctd/d/2013-mercedes-benz-sprinter/6543457508.html","complete":false,"trash":false,"bookmarked":false,"id":"6543457508","_id":"R6UO7QBHqGVbDDjt"},{"category":"madison.craigslist.org","date":"2018-03-31 11:53","hasPic":true,"location":"(Oregon WI)","pid":"6517535780","price":"$4000","title":"dodge sprinter 2004","url":"https://madison.craigslist.org/cto/d/dodge-sprinter-2004/6517535780.html","complete":false,"trash":false,"bookmarked":false,"id":"6517535780","_id":"grOCmAn1YDSmhJVq"},{"category":"madison.craigslist.org","date":"2018-04-01 19:01","hasPic":true,"location":"(East Isthmus)","pid":"6549227609","price":"$19995","title":"2013 Mercedes-Benz Sprinter 2500 Bluetec Van","url":"https://madison.craigslist.org/cto/d/2013-mercedes-benz-sprinter/6549227609.html","complete":false,"trash":false,"id":"6549227609","_id":"v26eeij1KAKYiPpb","bookmarked":false},{"category":"madison.craigslist.org","date":"2018-04-13 13:32","hasPic":true,"location":"(Summit Auto and Cycle)","pid":"6560189926","price":"$61888","title":"2008 Dodge Viper SRT 10 2dr Coupe CLEAN HISTORY REPORT","url":"https://madison.craigslist.org/ctd/d/2008-dodge-viper-srt-10-2dr/6560189926.html","complete":false,"trash":false,"id":"6560189926","_id":"CaJUhnaBg1L51r0L","bookmarked":false},{"category":"madison.craigslist.org","date":"2018-04-14 15:51","hasPic":true,"location":"(Madison, WI)","pid":"6550736423","price":"$36000","title":"2012 Mercedes-Benz Sprinter 2500 170\" WB Adventure Van","url":"https://madison.craigslist.org/cto/d/2012-mercedes-benz-sprinterwb/6550736423.html","complete":false,"trash":false,"bookmarked":true,"id":"6550736423","_id":"Ln4Sy2saWQfwRQjg"},{"category":"madison.craigslist.org","date":"2018-04-15 00:09","hasPic":true,"location":"(Madison)","pid":"6548213385","price":"$10000","title":"Dodge sprinter 2007","url":"https://madison.craigslist.org/cto/d/dodge-sprinter-2007/6548213385.html","complete":false,"trash":false,"bookmarked":false,"id":"6548213385","_id":"eVBCr1LxCsfD4ONJ"},{"category":"madison.craigslist.org","date":"2018-04-16 08:33","hasPic":true,"location":"(Dalton wi)","pid":"6562475858","price":"$7800","title":"2003 Sprinter Van diesel Mercedes 148k  Freightliner Dodge Refer","url":"https://madison.craigslist.org/cto/d/2003-sprinter-van-diesel/6562475858.html","complete":false,"trash":false,"bookmarked":false,"id":"6562475858","_id":"yfM4GDNiNV5mIXMU"},{"category":"madison.craigslist.org","date":"2018-04-17 11:42","hasPic":true,"location":"(East Isthmus)","pid":"6549201963","price":"$18995","title":"2012 Mercedes-Benz Sprinter 2500 Bluetec Van","url":"https://madison.craigslist.org/cto/d/2012-mercedes-benz-sprinter/6549201963.html","complete":false,"trash":false,"bookmarked":false,"id":"6549201963","_id":"E0o6t57CmlqfJsJK"}')
    return listings;
  } catch (e) {
    throw e;
    // res.status(404);
    // res.send('Couldnt pull postings from clist');
  }
}

module.exports = function(app) {

  const morgan = require('morgan');
  app.use(morgan('dev'));

  app.use(express.static('dist'));
  app.use(express.static('public'));

  app.use(bodyParser.json());

  app.post('/fetch-posts', async (req, res) => {


    let cities = ['milwaukee', 'madison', 'chicago'];

    try {
      for(let city of cities) {
        let sprinterListings = await fetchSprinterPostsFromCity(city);
        await PostManager.addPosts(sprinterListings, 'sprinter');
        let transitListings = await fetchTransitPostsFromCity(city);
        await PostManager.addPosts(transitListings, 'transit');
      }
      res.sendStatus(200);
      // res.set('Content-Type', 'application/json');
      // res.send(JSON.stringify(listings))
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
