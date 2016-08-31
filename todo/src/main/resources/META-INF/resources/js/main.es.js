import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './components/Todo.es';

export default (node) => {
	ReactDOM.render(
		<Todo />,
		node
	);
}