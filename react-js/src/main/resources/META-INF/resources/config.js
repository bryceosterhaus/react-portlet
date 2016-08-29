Loader.addModule(
	{
		dependencies: [],
		name: 'react',
		path: MODULE_PATH + '/react.js'
	}
);

Loader.addModule(
	{
		dependencies: ['react'],
		name: 'react-dom',
		path: MODULE_PATH + '/react-dom.js'
	}
);