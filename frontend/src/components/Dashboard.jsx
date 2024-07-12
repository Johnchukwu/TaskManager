
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FaTasks, FaPlus, FaComments, FaCalendarAlt, FaClock, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src="https://via.placeholder.com/150" alt="User Profile" />
        <h2>{user.username}</h2>
        <Link to="/tasks" className="nav-link">
          <FaTasks className="nav-icon" /> Task List
        </Link>
        <Link to="/add-task" className="nav-link">
          <FaPlus className="nav-icon" /> Add Task
        </Link>
        <Link to="/chat" className="nav-link">
          <FaComments className="nav-icon" /> Chat
        </Link>
        <Link to="/calendar" className="nav-link">
          <FaCalendarAlt className="nav-icon" /> Calendar
        </Link>
        <Link to="/timetable" className="nav-link">
          <FaClock className="nav-icon" /> Timetable
        </Link>
        <Link to="/settings" className="nav-link">
          <FaCog className="nav-icon" /> Settings
        </Link>
        <Link to="/logout" className="nav-link logout-link">
          <FaSignOutAlt className="nav-icon" /> Logout
        </Link>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {user.username}</h1>
        </header>
        {/* Main content goes here */}
      </main>
    </div>
  );
};

export default Dashboard;
