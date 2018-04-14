import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  posts: [],
  currentPage: 1,

  currentDetails: null,

  async _updateList() {
    let currentPage = this.get('currentPage');
    let newPosts = await this.store.query('post', {pageNumber: currentPage, pageSize: 3});
    this.set('posts', newPosts);
  },

  actions: {
    async updateList() {
      return this._updateList();
    },
    async nextPage() {
      let lastPage = this.get('currentPage');
      this.set('currentPage', lastPage + 1);
      return this._updateList();
    },
    async prevPage() {
      let lastPage = this.get('currentPage');
      this.set('currentPage', lastPage - 1);
      return this._updateList();
    },
    async getDetails(url) {
      let currentDetails = this.get('currentDetails');
      if (!currentDetails || currentDetails.url !== url) {
        let detailData = await Ember.$.get(`/details?url=${encodeURIComponent(url)}`)
        this.set('currentDetails', detailData);
      }
    }
  }
});
