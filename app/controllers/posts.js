import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  posts: [],

  actions: {
    async updateList() {
      let newPosts = await this.store.query('post', {});
      this.set('posts', newPosts);
    }
  }
});
