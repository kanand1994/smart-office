import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) { setLocalError('Please fill in all fields'); return; }
    const result = await dispatch(loginUser({ email, password }));
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Smart Office Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane.doe@company.com" /></div>
          <div className="form-group"><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password123" /></div>
          {(localError || error) && <div className="error-message">{localError || error}</div>}
          <button type="submit" disabled={isLoading} className="login-btn">{isLoading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};
export default Login;