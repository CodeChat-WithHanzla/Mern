import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtected = ({ children }) => {
    const navigate = useNavigate();
    const { captainData } = useContext(CaptainDataContext);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !captainData) {
            navigate('/captain-login');
        }
    }, [navigate, captainData]);

    return <>{children}</>;
};

export default CaptainProtected;