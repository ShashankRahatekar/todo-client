import React, { Fragment } from 'react';
import Todo from './Todo';
const URL = 'https://todolisthackerearth.herokuapp.com';
var HEADERS = {
	// upcoming: { label: 'UPCOMING', todos: [{
	// 	id: 'upcoming1', title: 'Create HTML Template', date: 'Created in 2020', description: 'Create a new HTML template'
	// }] },
	// progress: { label: 'IN PROGRESS', todos: [
	// 	{
	// 		id: 'done2', title: 'Backend for TODO App', date: 'Created in 2020', description: 'Start working on Backend Services for TODO App.'
	// 	},
	// ] },
	// done: { label: 'DONE', todos: [
	// 	{
	// 		id: 'done1', title: 'Post On Instagram', date: 'Created in 2020', description: 'Post on Instagram about new TODO Project'
	// 	}
	// ]},
	// test: { label: 'TEST', todos: []},
};

class Labels extends React.Component {
	constructor(props) {
		super(props);

		this.state = { HEADERS: {} };

		this.addHeader = this.addHeader.bind(this);
	}

	addHeader(ev) {
		// alert('Add Header Called');
		const headerText = window.prompt('');
		if(headerText) {
			HEADERS[headerText.toLowerCase()] = { 
				label: headerText.toUpperCase(), todos: [] 
			};

			this.headers.push({
				'id': headerText.toLowerCase(), 
				'label': headerText.toUpperCase()
			})

			this.dumpData();
		}

		this.setState({ render: true });
	}

	dumpData() {
		let todos = [];
		Object.values(HEADERS).map(head => {
			todos.push(...head.todos);
			return todos;
		})
		console.log(todos);
		fetch(`${URL}/add-data`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				headers: this.headers, 
				todos: todos
			})
		})
	}

	rearrangeData(data) {
		console.log(data);
		var TODOS = {};
		this.headers = data.headers;

		data.headers.map(header => {
			TODOS[header.id] = { label: header.label, todos: [] };
			return TODOS;
		})
		data.todos.map(todo => {
			TODOS[todo.label].todos.push(todo);
			return TODOS;
		})

		console.log('TODOS', TODOS);

		HEADERS = TODOS;
		this.setState({ render: true });
	}

	componentDidMount() {
		// fetch todos from external API (Node.js)
		// https://todolisthackerearth.herokuapp.com/
		fetch(URL).then(response => 
			response.json())
		.then(data => 
			// console.log('data', data)
			// console.log(JSON.parse(data.data))
			this.rearrangeData(JSON.parse(data.data))
		);
	}

	dragStart(key, ev, todo) {
		// console.log(todo);
		this.droppableTodo = todo;
		
		this.targetId = key;
		ev.dataTransfer.setData('task', ev.target.id);
	}

	dragOver(ev) {
		ev.preventDefault();
		// console.log(ev);
	}

	onDrop(ev) {
		ev.preventDefault();

		// console.log(ev.target.id, ev.dataTransfer.getData('task'));
		// console.log(this.targetId, 'this.droppableTodo', this.droppableTodo);
		if( ev.target.id ) {
			HEADERS[ev.target.id].todos.push({...this.droppableTodo, label: ev.target.id});
	
			HEADERS[this.targetId].todos.splice( HEADERS[this.targetId].todos.indexOf(this.droppableTodo), 1 );

			this.setState({render : true});
			this.droppableTodo = null;
			this.targetId = null;

			this.dumpData();
		}
	}

	render() {
		return (
			<div className='ui grid' style={{ width: '100%' }}>
				{
					Object.entries(HEADERS).map(([key, header]) => {
						return (
							<Fragment key={key}>
								<div 
									id={key}
									key={key} 
									className='two wide column todo-header-item' 
									onDragOver = { (ev) => this.dragOver(ev) }
									onDrop = { ev => this.onDrop(ev) }
								>
									{header.label} ({header.todos? header.todos.length: 0})
									{
										header.todos && header.todos.map( (todo, index) => {
											return (
												<Todo 
													key={key +'_'+ todo.title + '_' + index} 
													todo={todo} 
													dragStart = {(ev) => this.dragStart(key, ev, todo)}
												/>
											);
										})
									}
								</div> 
							</Fragment>
						);
					})
				}
				<div className='two wide column'>
					<button onClick={this.addHeader}> + </button>
				</div>
			</div>
		);
	}
}

export default Labels;