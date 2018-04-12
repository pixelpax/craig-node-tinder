let craigslist = require('node-craigslist');

client = new craigslist.Client({
});

client.search({
    city: 'madison',
    category: 'cta'
}, 'sprinter high')
    .then((listings) => {
        console.log(listings);
        return client.details(listings[0]);
    })
    .then((details) => {
        console.log(details);
    });



