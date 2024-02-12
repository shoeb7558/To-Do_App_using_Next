import React, { useState, useEffect } from 'react';
import './Home.css'
import CompletedTasks from './completed-tasks';// Import the CompletedTasks component




const IndexPage = () => {
  
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]); 
  const [comple, setComple] = useState(false); // State for completed tasks
  const [editTask, setEditTask] = useState({ id: null, text: '' });

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
    console.log(taskId)
    try {
      const response = await fetch('api/completedtask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskId) // Send completed status as true
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
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  

  



  const deleteTask = async (taskId) => {
    
    try {
        const response = await fetch('api/delete-task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId }), // Send the taskId in the request body
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        // Filter out the deleted task from the tasks state
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
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



  const editTaskHandler = (id, text) => {
    setEditTask({ id, text }); // Set the task to be edited
  };

  const handleEditChange = (e) => {
    setEditTask({ ...editTask, text: e.target.value }); // Update the edited task content
  };

  const updateTask = async (id, updatedText) => {
    try {
      const response = await fetch('api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:id, text: updatedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Update the task locally
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, task: updatedText } : task
      );
      setTasks(updatedTasks);

      // Reset the edit state
      setEditTask({ id: null, text: '' });
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
              {editTask.id === task._id ? (
                <>
                  <input
                    type='text'
                    value={editTask.text}
                    onChange={handleEditChange}
                  />
                  <button
                    onClick={() => updateTask(tasks._id, editTask.text)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {task.task}
                  <button
                    className='inputfield'
                    onClick={() => completeTask(task)}
                  >
                    Complete
                  </button>
                  <button
                    className='inputfield'
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className='inputfield'
                    onClick={() => editTaskHandler(task._id, task.task)}
                  >
                    Edit
                  </button>
                </>
              )}
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
