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

  async _getDetails(post, index) {
    let url = post.get('url');
    this.set('selectedIndex', index);
    let currentDetails = this.get('currentDetails');
    if (!currentDetails || currentDetails.url !== url) {
      let detailData = await Ember.$.get(`/details?url=${encodeURIComponent(url)}`)
      detailData.attributesString = JSON.stringify(detailData.attributes);
      this.set('currentDetails', detailData);
    }
  },

  selectUp() {
    let nextIndex = this.get('selectedIndex') - 1;
    this._getDetails(this.get('posts').toArray()[nextIndex], nextIndex);
  },

  selectDown() {
    let nextIndex = this.get('selectedIndex') + 1;
    this._getDetails(this.get('posts').toArray()[nextIndex], nextIndex);
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
    async getDetails(post, index) {
      this._getDetails(post, index);
    },
    zoomImage(index) {
      if (this.get('zoomIndex') === index) {
        this.set('zoomIndex', null);
      } else {
        this.set('zoomIndex', index);
      }
    },

    onBookmark(post) {
      Ember.$.ajax({
        url: `/posts/${post.get('pid')}/bookmark`,
        type: 'PUT',
        data: JSON.stringify({bookmarked: !post.get('bookmarked')}),
        contentType: "application/json",
        success: (result) => {
          post.toggleProperty('bookmarked');
        }
      });
    },

    onTrash(post) {
      Ember.$.ajax({
        url: `/posts/${post.get('pid')}/trash`,
        type: 'PUT',
        data: JSON.stringify({bookmarked: !post.get('trash')}),
        contentType: "application/json",
        success: (result) => {
          post.toggleProperty('trash');
        }
      });
    },

    async getBookmarked() {
      let bookmarkedPosts = await this.store.query('post', {bookmarked: true});
      this.set('posts', bookmarkedPosts);
    }
  }
});
