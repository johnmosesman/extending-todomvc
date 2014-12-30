import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,

  actions: {
    editTitle: function() {
      this.set('isEditing', true);
    },

    updateTitle: function() {
      this.set('isEditing', false);

      // Allow the action to bubble up to the lists/show route
      return true;
    }
  }
});
