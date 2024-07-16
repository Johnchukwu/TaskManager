import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import './LoginPage.css';
import ThreeScene from './ThreeScene';
import axiosInstance from '../../axiosConfig';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('api/auth/login', { email, password });
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      toast.error('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-container">
      <ThreeScene />
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
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
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
