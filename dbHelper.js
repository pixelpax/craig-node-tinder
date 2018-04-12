// let Datastore = require('nedb') , db = new Datastore();

const nedb = require('nedb-promises');
let db = nedb.create('./data/posts.db');


class PostManager {

    // private Post;
    // private db;


    static async addPost() {
        await db.insert({a: 1, b: 2});
    }

    static async getPost() {
        let post = await db.find({a:1});
        console.log(post);
    }
}



PostManager.getPost();
