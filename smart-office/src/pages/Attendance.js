import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAttendanceApi } from '../services/fakeApi';
const Attendance = () => {
  const { token } = useSelector((state) => state.auth);
  const [records, setRecords] = useState([]);
  useEffect(() => { fetchAttendanceApi(token).then(setRecords); }, [token]);
  return (
    <div className="page-container">
      <h2>Attendance</h2>
      <table><thead><tr><th>Date</th><th>Status</th></tr></thead><tbody>
        {records.map((r, i) => <tr key={i}><td>{r.date}</td><td>{r.status}</td></tr>)}
      </tbody></table>
    </div>
  );
};
export default Attendance;