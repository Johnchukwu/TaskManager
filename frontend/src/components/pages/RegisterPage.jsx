import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './LoginPage.css';  // Reusing the same CSS file for consistency
import ThreeScene from './ThreeScene';
import axiosInstance from '../../axiosConfig';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);

      await axiosInstance.post('api/auth/register', formData);
      toast.success('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error.response?.data || error.message);
      toast.error('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-container">
      <ThreeScene />
      <div className="login-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;