
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Task Manager</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get started.
      </p>
    </div>
  );
};

export default Home;
