'use strict';

var Model = require('tungstenjs/adaptors/backbone').Model;
var ItemModel = Model.extend({
  exposedEvents: ['change:completed'],
  toggle: function() {
    this.set({
      completed: !this.get('completed')
    });
  }
}, {
  debugName: 'TodoItemModel'
});
module.exports = ItemModel;