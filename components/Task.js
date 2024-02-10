// components/Task.js
import React from 'react';

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <div>
      <span>{task}</span>
      <button onClick={onComplete}>Complete</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Task;
