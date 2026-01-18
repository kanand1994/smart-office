import React from 'react';
import { useSelector } from 'react-redux';
const Dashboard = () => {
  const { user = {} } = useSelector((state) => state.auth || {});
  return (
    <div className="dashboard-container">
      <h1>Welcome back, {user.name || 'User'}!</h1>
      <div className="stats-grid">
        <div className="stat-card"><h3>Department</h3><p>{user.department || 'N/A'}</p></div>
        <div className="stat-card"><h3>Role</h3><p>{user.role || 'N/A'}</p></div>
      </div>
    </div>
  );
};
export default Dashboard;