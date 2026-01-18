import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">Smart Office</div>
        <div className="nav-links">
          {['/dashboard','/profile','/attendance','/tasks'].map(path => (
            <Link key={path} to={path} className={location.pathname===path?'active':''}>{path.replace('/','').toUpperCase()}</Link>
          ))}
        </div>
        <div className="nav-user">
          <span>{user?.name || 'User'}</span><button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};
export default Layout;