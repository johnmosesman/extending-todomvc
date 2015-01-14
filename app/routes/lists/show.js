import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('list', params.list_id);
  },

  renderTemplate: function() {
    this.render('lists/show', { controller: 'lists/show' } );   // 1

    this.render('todos', {  // 2)
      into: 'lists/show',   // 3)
      outlet: 'todos',      // 4)
    });
  },

  actions: {
    createTodo: function() {
      var newTodoTitle = this.controllerFor(this.routeName).get('newTodoTitle');

      if (Ember.isBlank(newTodoTitle)) { return false; }

      var list = this.modelFor(this.routeName);   // 1)

      var todo = this.store.createRecord('todo', {
        title: newTodoTitle,
        list: list   // 2)
      });

      this.controllerFor(this.routeName).set('newTodoTitle', '');

      todo.save().then(function(todo) {
        list.get('todos').addObject(todo);  // 3)*
        list.save();
      });
    },

    deleteTodo: function(id) {
      var list = this.modelFor(this.routeName);

      this.store.find('todo', id).then(function(todo) {   // 1)
        list.get('todos').removeObject(todo);   // 2)
        list.save();

        todo.destroyRecord();   // 3)
      });
    },

    deleteList: function() {
      var list = this.modelFor(this.routeName);
      list.destroyRecord();

      this.transitionTo('lists');
    },

    updateTitle: function() {
      var model = this.modelFor(this.routeName);

      if (Ember.isBlank(model.get('title'))) {
        model.rollback();
      }
      else {
        model.save();
      }
    }
  }
});
