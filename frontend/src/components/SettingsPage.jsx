// src/components/pages/SettingsPage.jsx
import { useState } from 'react';
import './SettingsPage.css';
import axiosInstance from '../axiosConfig';

const SettingsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleProfileImageChange = (e) => setProfileImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await axiosInstance.put(`api/users/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <label>
          Profile Image:
          <input type="file" onChange={handleProfileImageChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default SettingsPage;
