// src/components/Layout/Sidebar.jsx

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard/tasks">Tasks</Link></li>
        <li><Link to="/dashboard/tasks/add">Add Task</Link></li>
        <li><Link to="/dashboard/chat">Chat</Link></li>
        <li><Link to="/dashboard/calendar">Calendar</Link></li>
        <li><Link to="/dashboard/timetable">Timetable</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
