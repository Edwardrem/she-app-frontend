// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

const Navbar = ({ isLoggedin, setIsLoggedin }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreh = localStorage.getItem('refresh-token');
        try {
            await logout({ refresh: refreh });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh-token');
            setIsLoggedin(false);
            navigate('/login');
        }catch (error) {
            console.error('Logout',error);
        }
    };
    
    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedin ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/log">Log Ailments</Link>
                    <Link to="/incidents">Incidents</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );  
    
};    

export default Navbar;