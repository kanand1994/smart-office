import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchTasksApi } from '../services/fakeApi';
const Tasks = () => {
  const { token } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);
  useEffect(() => { fetchTasksApi(token).then(setTasks); }, [token]);
  return (
    <div className="page-container">
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map(t => <li key={t.id} className="task-item"><strong>{t.title}</strong> - {t.status}</li>)}
      </ul>
    </div>
  );
};
export default Tasks;