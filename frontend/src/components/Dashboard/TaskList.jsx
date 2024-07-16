// src/components/Dashboard/TaskList.jsx
import  { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.task} ({task.priority})
            <Link to={`/tasks/edit/${task._id}`}>Edit</Link>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
