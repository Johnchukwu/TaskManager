// src/components/Dashboard/EditTask.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('normal');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTask(response.data.task);
        setPriority(response.data.priority);
      } catch (error) {
        console.error('Error fetching task', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5500/api/tasks/${id}`, {
        task,
        priority,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data);
      navigate('/tasks');
    } catch (error) {
      console.error('Error editing task', error);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task:</label>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} required />
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="less_important">Less Important</option>
          </select>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
