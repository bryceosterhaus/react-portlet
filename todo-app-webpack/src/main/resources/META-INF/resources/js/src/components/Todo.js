import React, { Component } from 'react';

class Todo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			inputValue: '',
			items: []
		};

		this.completeItem = this.completeItem.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
	}

	completeItem(index) {
		return () => {
			const items = this.state.items.map(
				(item, i) => {
					if (i === index) {
						item.completed = !item.completed;
					}

					return item;
				}
			);

			this.setState({items});
		}
	}

	handleInputChange(event) {
		this.setState({inputValue: event.target.value});
	}

	handleInputSubmit(event) {
		if (event.key === 'Enter') {
			const item = {
				name: event.target.value,
				completed: false
			};

			this.setState(
				{
					inputValue: '',
					items: [...this.state.items, item]
				}
			)
		}
	}

	render() {
		const {inputValue, items} = this.state;

		return (
			<div className="todo-app">
				<input
					onChange={this.handleInputChange}
					onKeyPress={this.handleInputSubmit}
					placeholder="Add a to-do"
					value={inputValue}
				/>

				<ol>
					{
						items.map(
							({completed, name}, i) => (
								<li
									className={completed ? 'completed' : ''}
									key={i}
									onClick={this.completeItem(i)}
								>
									{name}
									<span>Completed</span>
								</li>
							)
						)
					}
				</ol>
			</div>
		);
	}
}

export default Todo;