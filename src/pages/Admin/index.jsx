import { Navigate } from 'react-router-dom';

const AdminIndex = () => {
  return <Navigate to="/admin/events" replace />;
};

export default AdminIndex;