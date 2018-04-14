import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  hasPic: DS.attr('boolean'),
  pid: DS.attr('boolean'),
  price: DS.attr('number'),
  title: DS.attr('string'),
  url: DS.attr('string')
});
