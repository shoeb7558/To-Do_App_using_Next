import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './Home.css'
import CompletedTasks from './completed-tasks';// Import the CompletedTasks component

const IndexPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]); 
  const [comple, setComple] = useState(false); // State for completed tasks

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const completeTask = (taskIndex) => {
    const taskCompleted = tasks[taskIndex];
    const remainingTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(remainingTasks);
    setCompletedTasks([...completedTasks, taskCompleted]);
  };

  const deleteTask = (taskIndex) => {
    const remainingTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(remainingTasks);
  };

  const toggleCompletedTasks = () => {
    setComple(!comple); // Toggle the value of comple
  };

  return (
    <>
    <div className='maindiv'>
      <h1 >Todo App</h1>
      <input className='inputfield'
        type="text"
        placeholder="Enter task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button className='inputfield' onClick={addTask}>Add Task</button>
      <button className='inputfield' onClick={toggleCompletedTasks}>
        {comple ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className='inputfield' onClick={() => completeTask(index)}>Complete</button>
            <button className='inputfield' onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Toggle button for navigating to Completed Tasks page */}
      
      {/* Render CompletedTasks component conditionally based on comple state */}
      {comple && <CompletedTasks completedTasks={completedTasks} />}
    </div>
    </>
  );
};

export default IndexPage;
