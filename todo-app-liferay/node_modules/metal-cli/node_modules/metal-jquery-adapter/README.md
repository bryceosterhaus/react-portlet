metal-jquery-adapter
===================================

A module that can create jQuery plugins for Metal.js components.

##Usage

Just call JqueryAdapter.register with the jquery method name you want to use for the plugin and the component's constructor. For example:

```javascript
JqueryAdapter.register('modal', Modal);

// Now you can call the plugin like this:
$('#Modal').modal({headerContent: 'My Header'});

// You can also call functions after initalizing the plugin for the first time:
$('#Modal').modal('show');

// And listen to events from the Metal.js component directly on the jQuery element:
$('#Modal').on('metal-modal:buttonClicked', function(event, data) {
  console.log('Button was clicked: ', data.button);
});
```
