// let Datastore = require('nedb') , db = new Datastore();

const nedb = require('nedb-promises');
let db = nedb.create('./data/posts.db');


class PostManager {

    // private Post;
    // private db;

    // static start() {
    //     return new Promise((resolve, reject) => {
    //         mongoose.connect('mongodb://localhost/test');
    //         this.db = mongoose.connection();
    //         this.db.once('open', () => {
    //             // this.Post = mongoose.Model('Post', postSchema);
    //             resolve();
    //         }, (err) => {
    //             console.log(err);
    //             reject();
    //         })
    //     })
    // }

    static async addPost() {
        await db.insert({a: 1, b: 2});
    }

    static async getPost() {
        let post = await db.find({a:1});
        console.log(post);
    }
}



PostManager.getPost();
