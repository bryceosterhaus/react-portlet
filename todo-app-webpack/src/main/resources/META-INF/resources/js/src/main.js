import React from 'react';
import {render} from 'react-dom';
import Todo from './components/Todo';

window.App = (node) => {
	render(
		<Todo />,
		node
	);
}