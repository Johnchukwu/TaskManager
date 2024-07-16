import { useState } from 'react';
import axiosInstance from '../../axiosConfig';


const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axiosInstance.post('api/tasks', {
        title,
        description,
        priority,
      }, {
        headers: {
          'x-auth-token': token,
        }
      });

      console.log('Task added successfully', response.data);
    } catch (error) {
      console.error('Error adding task', error);
      setError(error.response?.data?.msg || 'Server Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="important">Important</option>
        <option value="less important">Less Important</option>
      </select>
      <button type="submit">Add Task</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddTask;
