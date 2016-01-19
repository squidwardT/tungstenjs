window.data = window.data || {};
window.data.tutorials = window.data.tutorials || [];
window.data.tutorials.push({
  name: 'Views & Context',
  steps: [
    {
      name: 'Adding a child view',
      index: 1,
      description_html: '<p>The standard adaptor for Tungsten.js uses Backbone.js views and models. This adaptor adds a few features to Backbone, including the concept of child views. Child views of the app view are defined via a <code>childViews</code> hash on the view constructor, with the key being the class name of the child view and the value being the constructor for the child view. One thing to note is that these class names must be prefixed with "js-".  The js- class name for the child view must be a descendant element of the current view.  If there are multiple descendant elements for the child view then Tungsten.js will render the view for each element.</p><p>Here, a view constructor has been created with a click event to toggle a class on the block.  However, the view hasn\'t yet been set as a child view.</p><p>Wire the child view up to the application view by giving each block <code>div</code> a "js-" class name and adding that class name, with the <code>BlockView</code> view constructor, to the <code>childViews</code> hash.  The result should be that clicking a block toggles every block\'s background color to red.</p>',
      template: '<div ``class``="block {{#selected}}selected{{/selected}}">Block View</div>\n<div class="block {{#selected}}selected{{/selected}}">Block View</div>\n\n<style> .block { background: lightgray; height: 50px; margin: 10px; width: 90%; text-align: center; line-height: 50px;} .selected { background: red; } </style>',
      js: "var View = tungsten.View, Model = tungsten.Model;\nvar BlockView = View.extend({\n  events: {\n    'click': 'handleClick'\n  },\n  handleClick: function() {\n    this.model.set('selected', !this.model.get('selected'));\n  }\n});\nvar AppView = View.extend({\n  ``childViews: {}``\n});\nnew AppView({\n  el: document.getElementById('app'),\n  template: compiledTemplates.app_view,\n  model: new Model(),\n  dynamicInitialize: true\n});"
    },
    {
      name: 'Template context',
      index: 2,
      description_html: '<p>Variables in Tungsten.js mustache templates are interpolated based on normal mustache mechanics.  The injected data for each template is generated by serializing the application model.</p><p>Here, the model\'s data has been set to an array with two objects, each having a <code>name</code> property.  Two blocks are being generated by looping over this array. Using a mustache variable, add the block names to the template.</p>',
      template: '{{#blocks}}\n  <div class="block js-block {{#selected}}selected{{/selected}}">``Block View``</div>\n{{/blocks}}\n\n<style> .block { background: lightgray; height: 50px; margin: 10px; width: 90%; text-align: center; line-height: 50px;} .selected { background: red; } </style>',
      js: "var View = tungsten.View, Model = tungsten.Model;\nvar BlockView = View.extend({\n  events: {\n    'click': 'handleClick'\n  },\n  handleClick: function() {\n    this.model.set('selected', !this.model.get('selected'));\n  }\n});\nvar AppView = View.extend({\n  childViews: {\n    'js-block': BlockView\n}\n});\nnew AppView({\n  el: document.getElementById('app'),\n  template: compiledTemplates.app_view,\n  model: new Model({blocks: [{name: 'foo'}, {name: 'bar'}]}),\n  dynamicInitialize: true\n});"
    },
    {
      name: 'Child view context',
      index: 3,
      description_html: '<p>Tungsten.js infers the context, the <code>this.model</code> value, of a child view based on the template section tags.  If the section tags around a child view match a property which is another model, for example, the view\'s <code>this.model</code> will be that matching model.  If the section tags around a child view match a property which is a collection, each view which is rendered as the result of iterating through a collection will have its <code>this.model</code> match the appropriate model in the collection.</p><p>In standard Backbone.js, there <a href="http://backbonejs.org/#FAQ-nested" target="_blank">is no standard method for nesting models or collections</a>.  The Backbone adaptor for Tungsten.js uses a fork of <a href="https://github.com/blittle/backbone-nested-models" target="_blank">Backbone Nested Models</a> to add this feature.  To set a nested model or collection, add the property of the nested object (or array of objects if nesting a collection) as the key on the parent model\'s <code>relations</code> hash.  Then set its value as the constructor for the collection or model</p><p>In this example, the click event on each of the blocks works, but since <code>blocks</code> is not a Backbone collection, each view just gets the app model context and so both blocks turn red when clicking on either one.</p><p>Wire up the `blocks` property on the app model so that it\'s a collection.  Doing so should give each child view the context of the model in the collection, so clicking one block will only turn it red, not all the others.</p>',
      template: '{{#blocks}}\n  <div class="block js-block {{#selected}}selected{{/selected}}">Block View | {{name}}</div>\n{{/blocks}}\n\n<style> .block { background: lightgray; height: 50px; margin: 10px; width: 90%; text-align: center; line-height: 50px;} .selected { background: red; } </style>',
      js: "var View = tungsten.View, Model = tungsten.Model;\nvar BlockView = View.extend({\n  events: {\n    'click': 'handleClick'\n  },\n  handleClick: function() {\n    this.model.set('selected', !this.model.get('selected'));\n  }\n});\nvar AppModel = Model.extend({\n  ``relations: {}``\n});\nvar AppView = View.extend({\n  childViews: {\n    'js-block': BlockView\n}\n});\nnew AppView({\n  el: document.getElementById('app'),\n  template: compiledTemplates.app_view,\n  model: new AppModel({blocks: [{name: 'foo'}, {name: 'bar'}]}),\n  dynamicInitialize: true\n});"
    }
  ]
});
