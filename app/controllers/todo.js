import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,

  actions: {
    editTitle: function() {
      this.set('isEditing', true);
    },

    updateTitle: function() {
      this.set('isEditing', false);

      var model = this.get('model');

      if (Ember.isBlank(model.get('title'))) {
        model.rollback();
      }
      else {
        model.save();
      }
    }
  }
});