import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  hasPic: DS.attr('boolean'),
  pid: DS.attr('string'),
  price: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  bookmarked: DS.attr('boolean'),
  category: DS.attr('string'),
  year: DS.attr('number'),
  miles: DS.attr('number'),
  city: Ember.computed('category', function() {
    let category = this.get('category');
    return category.slice(0, category.indexOf('.'));
  })
});
