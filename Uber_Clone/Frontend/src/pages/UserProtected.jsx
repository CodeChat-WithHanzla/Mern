import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
const UserProtected = ({ children }) => {
    const navigate = useNavigate();
    const { userData } = useContext(UserDataContext);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !userData) {
            navigate('/login');
        }
    }, [navigate, userData]);

    return <>{children}</>;
};

export default UserProtected;