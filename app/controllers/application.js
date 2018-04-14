import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    pullPosts() {
      Ember.$.post('http://localhost:4100/fetch-posts', {})
    }
  }
});
