import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {
    this._super(controller, model);
    controller._updateList();
    $(document).keypress(e => {
      if(e.key==='s') {
        controller.selectDown();
      } else if (e.key==='w') {
        controller.selectUp();
      }
    })
  }
});
