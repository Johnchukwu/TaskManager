
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/pages/RegisterPage';
import Dashboard from './components/Dashboard';
import TaskList from './components/Dashboard/TaskList';
import AddTask from './components/Dashboard/AddTask';
import Chat from './components/Chat/Chat';
import Calendar from './components/Calender/Calender';
import Timetable from './components/Timetable/Timetable';
import Login from './components/pages/LoginPage';
import Logout from './components/Logout';
import SettingsPage from './components/SettingsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/settings" element={<SettingsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
