// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Labels from './components/Labels';
// import Todo from './components/Todo';
import './template/styles.css';
// Create a react component
const App = () => {
  return (
    <div>
      <div className='main-body-div'>
        <div> Todo App!! </div>
        <br/>
        <Labels key='label' />
      </div>
    </div>
  );
};

// Take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector('#root'));
