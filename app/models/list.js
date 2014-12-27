import DS from 'ember-data';

var List = DS.Model.extend({
  title: DS.attr('string')
});

List.reopenClass({
  FIXTURES: [
    { id: 1, title: 'List 1' },
    { id: 2, title: 'List 2' }
  ]
});

export default List