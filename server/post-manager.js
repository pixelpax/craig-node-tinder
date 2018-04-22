// let Datastore = require('nedb') , db = new Datastore();

// TODO: May as well index by date
const Datastore = require('nedb-promise');
let db = Datastore({
  filename: './data/posts.db',
  autoload: true
});

db.ensureIndex({fieldName: 'pid', unique: true});


class PostManager {

    // private Post;
    // private db;


    static async addPost() {
        await db.insert({a: 1, b: 2});
    }

    static async addPosts(posts, vanType) {
      let updatePromises = [];
      posts.forEach((post) => {
        updatePromises.push(
          db.insert(
            Object.assign(post, {
              complete: false,
              trash: false,
              bookmarked: false,
              type: vanType,
              id: post.pid
            })
          )
            .catch(e => {})
          // db.update( {pid: post.pid},
          //   {
          //     $set:
          //       Object.assign(post, {
          //         complete: false,
          //         trash: false,
          //         bookmarked: false,
          //         id: post.pid
          //       })
          //   }, {upsert: true} )
        );
      });
      return Promise.all(updatePromises);
    }

    static async bookmark(turnon, pid) {
      return await db.update( {pid},
        {
          $set: {bookmarked: turnon}
        }
        )
    }

    static async trashPost(doTrash, pid) {
      return await db.update( {pid},
        {
          $set: {trash: doTrash}
        }
      )
    }

    static getAllPosts() {
      return db.find({});
    }

    static getAllBookmarkedPosts() {
      return db.find({bookmarked: true});
    }

    static async removeAllPosts() {
      return await db.remove({}, {multi: true});
    }

    static async getPage(pageSize, pageNumber, bookmarked) {
        let findCursor;
        if (bookmarked) {
          findCursor = db.cfind({bookmarked: true, trash: false});
        } else {
          findCursor = db.cfind({trash: false});
        }
        return await findCursor
          .sort({ date: 1 })
          .limit(pageSize)
          .skip(pageSize * (pageNumber-1))
          .exec();
    }

    static async getPost() {
        let post = await db.find({a:1});
        console.log(post);
    }

    static async update(post) {
        await db.update({pid: post.pid}, {$set: post})
    }

    static async clearDb() {
      db.remove({}, {multi: true}).then(() => {
        db.find({}).then(records => console.log(records));
      })
    }
}

module.exports = {PostManager};


// db.find({}).then(records => console.log(records));
// PostManager.getPage(2, 1).then(page => console.log(page));
// PostManager.getPage(2, 2).then(page => console.log(page));
