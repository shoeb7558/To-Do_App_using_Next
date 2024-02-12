import React, { useState, useEffect } from 'react';
import CompletedTasks from './completed-tasks'; // Import the CompletedTasks component

const completedtask = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const response = await fetch('api/completedtask');
                if (!response.ok) {
                    throw new Error('Failed to fetch completed tasks');
                }
                const responseData = await response.json();
                setCompletedTasks(responseData.completedTasks);
            } catch (error) {
                console.error('Error fetching completed tasks:', error);
            }
        };

        fetchCompletedTasks();
    }, []);

    return (
        <div>
            <h1>Completed Tasks</h1>
            <CompletedTasks completedTasks={completedTasks} />
        </div>
    );
};

export default completedtask;
