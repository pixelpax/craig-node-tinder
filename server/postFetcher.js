const craigslist = require('node-craigslist');
const client = craigslist.client({});

class PostFetcher {

  static async fetchSprinterPostsFromCity(city) {
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

  static async fetchTransitPostsFromCity(city) {
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

}

PostFetcher.fetchSprinterPostsFromCity('madison').then(l => console.log(l)) ;

module.exports = {PostFetcher};

