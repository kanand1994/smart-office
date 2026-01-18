import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProfileApi } from '../services/fakeApi';
const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  useEffect(() => { fetchProfileApi(token).then(setProfile); }, [token]);
  if (!profile) return <div>Loading...</div>;
  return (
    <div className="page-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <img src={profile.avatar} alt="Avatar" className="profile-avatar" />
        <div><p><strong>Name:</strong> {profile.name}</p><p><strong>Email:</strong> {profile.email}</p></div>
      </div>
    </div>
  );
};
export default Profile;