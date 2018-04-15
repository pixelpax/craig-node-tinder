import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  posts: [],
  currentPage: 1,

  currentDetails: null,
  zoomIndex: null,

  async _updateList() {
    const pageSize = 20;
    let currentPage = this.get('currentPage');
    let newPosts = await this.store.query('post', {pageNumber: currentPage, pageSize});
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
    async getDetails(post) {
      let url = post.get('url');
      let currentDetails = this.get('currentDetails');
      if (!currentDetails || currentDetails.url !== url) {
        let detailData = await Ember.$.get(`/details?url=${encodeURIComponent(url)}`)
        this.set('currentDetails', detailData);
      }
    },
    zoomImage(index) {
      if (this.get('zoomIndex') === index) {
        this.set('zoomIndex', null);
      } else {
        this.set('zoomIndex', index);
      }
    },

    onBookmark(post) {
      post.toggleProperty('bookmarked');
      Ember.$.put(`/post/${post.pid}/bookmark`, {bookmarked: post.get('bookmarked')})
    }
  }
});
