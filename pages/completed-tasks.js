// pages/completed-tasks.js
import React from 'react';
import CompletedTask from '../components/CompletedTask';

const CompletedTasks = ({ completedTasks }) => {
  console.log('Completed Tasks:', completedTasks); // Log the completedTasks prop

  if (!completedTasks || completedTasks.length === 0) {
    return <h1>No completed tasks to show</h1>;
  }

  return (
    <div>
      <h1>Completed Tasks</h1>
      {completedTasks.map((task, index) => (
        <CompletedTask key={index} task={task} />
      ))}
    </div>
  );
};

export default CompletedTasks;
