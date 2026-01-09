import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        if (role === 'admin' || role === 'main_admin' || role === 'sub_admin') {
            return <Navigate to="/admin" replace />;
        } else if (role === 'teacher') {
            return <Navigate to="/teacher" replace />;
        } else if (role === 'student') {
            return <Navigate to="/student" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
