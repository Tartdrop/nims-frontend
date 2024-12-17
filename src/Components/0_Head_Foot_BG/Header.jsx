import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';
import home_icon from '../Assets/Home.png';
import logo from '../Assets/NMISLogo.png';

const Header = ({ onLogout, userId, userType }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage and reset user state through the onLogout prop
        localStorage.removeItem('responseData');
        onLogout(); // Call the onLogout prop to update the app state
        navigate('/login', { replace: true }); // Redirect to login page
    };

    const navigateHome = () => {
        if (userType && userId) {
            // Navigate to the home URL once userType and userId are available
            console.log('Navigating to: ', `/home/${userType}/${userId}`);
            navigate(`/home/${userType}/${userId}`, { replace: true });
        } else {
            console.log('UserType or UserId is missing. Redirecting to login.');
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className='header'>
            <div className="left-stuff">
                <img src={logo} alt="Logo" />
                <div className="title">National Meat Inspection Service</div>
            </div>

            <div className="right-stuff">
                {userId && userType ? (
                    <div className="l-o">
                        <button onClick={handleLogout} className="logout-button">
                            <span><p className='logout-button-text center'>Log out</p></span>
                        </button>
                    </div>
                ) : (
                    <div className="login-prompt">
                        <p>Please log in.</p>
                    </div>
                )}

                <div className="navhome" onClick={navigateHome}>
                    <button className="home">
                        <span><img src={home_icon} alt="Home" /></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
