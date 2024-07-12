import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const layers = document.querySelectorAll('.layer');
      layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - event.pageX * speed) / 100;
        const y = (window.innerHeight - event.pageY * speed) / 100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="layer background-layer" data-speed="5"></div>
      <div className="layer overlay-layer">
        <header className="landing-header">
          <img src="https://via.placeholder.com/150" alt="Logo" className="logo" />
          <h1>Welcome to Futuristic Task Manager</h1>
          <p>Manage your tasks efficiently and effectively</p>
          <div className="button-container">
            <Link to="/register" className="btn">Get Started</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default LandingPage;
