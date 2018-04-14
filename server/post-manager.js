// let Datastore = require('nedb') , db = new Datastore();

// TODO: May as well index by date
const Datastore = require('nedb-promise');
let db = Datastore({
  filename: './data/posts.db',
  autoload: true
});


class PostManager {

    // private Post;
    // private db;


    static async addPost() {
        await db.insert({a: 1, b: 2});
    }

    static async addPosts(posts) {
      let updatePromises = [];
      posts.forEach((post) => {
        updatePromises.push(
          db.update( {pid: post.pid},
            Object.assign(post, {
              complete: false,
              trash: false,
              id: post.pid
            }), {upsert: true} )
        );
      });
      return Promise.all(updatePromises);
    }

    static async getPage(pageSize, pageNumber) {
      return await db.cfind({})
        .sort({ date: 1 })
        .limit(pageSize)
        .skip(pageSize * (pageNumber-1))
        .exec();
    }

    static async getPost() {
        let post = await db.find({a:1});
        console.log(post);
    }

    static async clearDb() {
      db.remove({}, {multi: true}).then(() => {
        db.find({}).then(records => console.log(records));
      })
    }
}

module.exports = {PostManager};


// db.find({}).then(records => console.log(records));
PostManager.getPage(2, 1).then(page => console.log(page));
PostManager.getPage(2, 2).then(page => console.log(page));
