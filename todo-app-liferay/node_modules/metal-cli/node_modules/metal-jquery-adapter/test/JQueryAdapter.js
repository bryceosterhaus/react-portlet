'use strict';

import dom from 'metal-dom';
import Component from 'metal-component';
import JQueryAdapter from '../src/JQueryAdapter';

describe('JQueryAdapter', function() {
	it('should throw error if jQuery is not included', function() {
		var orig$ = $;
		$ = null;
		assert.throws(function() {
			JQueryAdapter.register('testComp', createComponentClass());
		});
		$ = orig$;
	});

	it('should throw error if name is not a string', function() {
		assert.throws(function() {
			JQueryAdapter.register(null, createComponentClass());
		});
		assert.throws(function() {
			JQueryAdapter.register({}, createComponentClass());
		});
	});

	it('should throw error if constructor is not a function', function() {
		assert.throws(function() {
			JQueryAdapter.register('testComp');
		});
		assert.throws(function() {
			JQueryAdapter.register('testComp', {});
		});
	});

	it('should instantiate component when plugin is called for the first time', function() {
		var TestComponent = createComponentClass();
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp();

		var instance = $(element).data('metal-testComp');
		assert.ok(instance instanceof TestComponent);
		assert.strictEqual(element, instance.element);
	});

	it('should instantiate components for each element in the collection', function() {
		var TestComponent = createComponentClass();
		JQueryAdapter.register('testComp', TestComponent);

		dom.append(document.body, '<div class="testComp"></div><div class="testComp"></div>');
		var $elements = $('.testComp');
		$elements.testComp();

		var instance1 = $($elements[0]).data('metal-testComp');
		assert.ok(instance1 instanceof TestComponent);

		var instance2 = $($elements[1]).data('metal-testComp');
		assert.ok(instance2 instanceof TestComponent);
		assert.notStrictEqual(instance1, instance2);
	});

	it('should pass options as the component config when instantiating it', function() {
		var TestComponent = createComponentClass();
		TestComponent.STATE = {
			foo: {
				value: ''
			}
		};
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp({
			foo: 'foo'
		});

		var instance = $(element).data('metal-testComp');
		assert.strictEqual('foo', instance.foo);
	});

	it('should update component state when calling plugin after first time', function() {
		var TestComponent = createComponentClass();
		TestComponent.STATE = {
			foo: {
				value: ''
			}
		};
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp({
			foo: 'foo'
		});
		$(element).testComp({
			foo: 'bar'
		});

		var instance = $(element).data('metal-testComp');
		assert.strictEqual('bar', instance.foo);
	});

	it('should return collection from plugin call when creating or updating instance', function() {
		var TestComponent = createComponentClass();
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		var collection = $(element);

		assert.strictEqual(collection, collection.testComp());
	});

	it('should call method on component if plugin is called with string', function() {
		var TestComponent = createComponentClass();
		TestComponent.prototype.foo = sinon.stub().returns('foo');
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp();

		var result = $(element).testComp('foo');
		assert.strictEqual(1, $(element).data('metal-testComp').foo.callCount);
		assert.strictEqual('foo', result);
	});

	it('should pass all other arguments when calling plugin method', function() {
		var TestComponent = createComponentClass();
		TestComponent.prototype.foo = sinon.stub();
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp();

		$(element).testComp('foo', 'bar', '2');
		var instance = $(element).data('metal-testComp');
		assert.strictEqual(1, instance.foo.callCount);
		assert.deepEqual(['bar', '2'], instance.foo.args[0]);
	});

	it('should throw error if attempting to call method before initialing plugin', function() {
		var TestComponent = createComponentClass();
		TestComponent.prototype.foo = sinon.stub().returns('foo');
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);

		assert.throws(function() {
			$(element).testComp('foo');
		});
	});

	it('should throw error if attempting to call unexisting method', function() {
		var TestComponent = createComponentClass();
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp();

		assert.throws(function() {
			$(element).testComp('foo');
		});
	});

	it('should throw error if attempting to call private method', function() {
		var TestComponent = createComponentClass();
		TestComponent.prototype.foo_ = sinon.stub();
		TestComponent.prototype._bar = sinon.stub();
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		$(element).testComp();

		assert.throws(function() {
			$(element).testComp('foo_');
		});
		assert.throws(function() {
			$(element).testComp('_bar');
		});
	});

	it('should trigger events from component for the plugin element', function() {
		var TestComponent = createComponentClass();
		JQueryAdapter.register('testComp', TestComponent);

		var element = document.createElement('div');
		dom.enterDocument(element);
		var $element = $(element);
		$element.testComp();

		var listener = sinon.stub();
		$element.on('metal-testComp:foo', listener);
		var instance = $(element).data('metal-testComp');
		var eventData = {};
		instance.emit('foo', eventData);

		assert.strictEqual(1, listener.callCount);
		assert.ok(listener.args[0][0] instanceof $.Event);
		assert.strictEqual(eventData, listener.args[0][1]);
	});
});

function createComponentClass() {
	class TestComponent extends Component {
		constructor(opt_config) {
			super(opt_config);
		}
	}
	return TestComponent;
}
