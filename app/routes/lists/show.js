import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('list', params.list_id);
  },

  actions: {
    deleteList: function() {
      var list = this.modelFor(this.routeName);
      list.destroyRecord();

      this.transitionTo('lists');
    }
  }
});
