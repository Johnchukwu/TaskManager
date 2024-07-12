import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user data from localStorage
    localStorage.removeItem('user');
    // Redirect to the landing page
    navigate('/');
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
