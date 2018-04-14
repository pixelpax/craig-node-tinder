// let Datastore = require('nedb') , db = new Datastore();

const nedb = require('nedb-promises');
let db = nedb.create('./data/posts.db');


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


db.find({}).then(records => console.log(records));
