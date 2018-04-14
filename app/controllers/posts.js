import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  posts: [],

  async _updateList() {
    let newPosts = await this.store.query('post', {pageNumber: 1, pageSize: 3});
    this.set('posts', newPosts);
  },

  actions: {
    async updateList() {
      return this._updateList();
    }
  }
});
