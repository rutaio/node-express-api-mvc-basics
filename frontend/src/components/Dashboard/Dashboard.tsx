import './Dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Sveiki sugrize, {user?.name}</p>
      </div>
    </div>
  );
};
