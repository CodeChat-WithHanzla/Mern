import React from 'react';

const Notification = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const textColor = 'text-white';

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs p-4 rounded-lg shadow-lg ${bgColor} ${textColor} flex justify-between items-center`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
        </div>
    );
};

export default Notification;
