import React, { useState, useEffect } from 'react';
import './Home.css'
import CompletedTasks from './completed-tasks';// Import the CompletedTasks component


const IndexPage = () => {
  
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]); 
  const [comple, setComple] = useState(false); // State for completed tasks

  const addTask = async () => {
    console.log('called')
    if (taskInput.trim() !== '') {
      // Create a new task object
      const newTask = {
        completed: false,
        task: taskInput
      };
  
      try {
        // Send a POST request to the server
        const response = await fetch('api/new-tasks', {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: {
            'Content-Type': 'application/json'
          }
          
        });
        console.log("response",response)
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
      }

        const data = await response.json();
        console.log(data)
  
        // Update the tasks state if the request is successful
        setTasks([...tasks, taskInput]);
        setTaskInput('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };
  




  const completeTask = async (taskId) => {
    
    console.log(taskId);
    
    try {
        const response = await fetch(`api/new-completedtask/${taskId}`, { // Use the correct endpoint URL
            method: 'PUT', // Use PATCH method to update the task
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: false }) // Send completed status as true
        });

        if (!response.ok) {
            throw new Error('Failed to complete task');
        }

        // Update the task completion status locally
        const updatedTasks = tasks.map((task) => {
            if (task._id === taskId) {
                return { ...task, completed: true }; // Update the completed status
            }
            return task;
        });

        setTasks(updatedTasks); // Update the tasks state

        // Update the completed tasks state
        const completedTask = tasks.find((task) => task._id === taskId);
        setCompletedTasks([...completedTasks, completedTask]);
        
        // Update the comple state to trigger re-rendering
        setComple(true);
    } catch (error) {
        console.error('Error completing task:', error);
    }
};

  



  const deleteTask = (taskIndex) => {
    const remainingTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(remainingTasks);
  };



  const toggleCompletedTasks = () => {
    setComple(!comple); // Toggle the value of comple
  };


  const fetchTasks = async () => {
    try {
      const response = await fetch('api/fetched-task');
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const responseData = await response.json();
      const tasksData = responseData.tasks;
      setTasks(tasksData);
      console.log(tasksData)
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


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
            {task.task}
            <button className='inputfield' onClick={() => completeTask(task._id)}>Complete</button>
            <button className='inputfield' onClick={() => deleteTask(task._id)}>Delete</button>
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
