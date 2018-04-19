import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  hasPic: DS.attr('boolean'),
  pid: DS.attr('string'),
  price: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  bookmarked: DS.attr('boolean'),
  city: DS.attr('string')
});
