import React from 'react';
import Labels from './Labels';

const Todo = ({todo, dragStart}) => {

	// function dragFunc(e) {
	// 	console.log(e.dataTransfer);
	// }

	// console.log(dragStart);
	return (
		<div id={todo.id} onDragStart={(e) => dragStart(e)} draggable={true} key={todo.title} className='todo-card-holder'>
			<div className='ui card'>
				<div className='content'>
					<div className='header'>
						{todo.title}
					</div>
					<div className='meta'>
						<span className='date'> {todo.date} </span>
					</div>
					<div className='description'>
						{todo.description}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Todo;
