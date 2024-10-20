import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './OnlineUsersComponent.css';  // Import CSS file

const socket = io(process.env.REACT_APP_SOCKET_URL);

const OnlineUsersComponent = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);  // State for controlling the dropdown

    useEffect(() => {
        // Emit the userJoined event when the component mounts
        const user = {
            userId: localStorage.getItem('userId'),
            fullName: localStorage.getItem('fullName'),
        };
        socket.emit('userJoined', user);

        // Listen for the onlineUsers event to get the list of online users
        socket.on('onlineUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off('onlineUsers');
        };
    }, []);

    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);  // Toggle the dropdown
    };

    return (
        <div className="online-users-component">
            <div className="header" onClick={toggleDropdown}>
                <span className="green-dot"></span>
                <h3 className="active-users-heading">Active Users ({onlineUsers.length})</h3>
                <span className={`dropdown-icon ${isExpanded ? 'expanded' : ''}`}>&#9660;</span> {/* Triangle icon */}
            </div>

            {isExpanded && (
                <ul className="users-list">
                    {onlineUsers.map((user, index) => (
                        <li key={index}>
                            <span className="user-dot"></span>  {/* Small dot next to each user */}
                            {user.fullName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OnlineUsersComponent;
