import React from 'react';
import './XMessages.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import logo_icon from '../Assets/BlueLogo.png';
import back_button from '../Assets/BackButton.png';

Userfront.init("jb7ywq8b");

const ForgotNIS = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/login", { replace: true })
    };

    return (
        <div className='messages-all-container'>
            <div className='messages-container'>
                <div className="messages-logo">
                    <img src={logo_icon} alt="Logo" />
                </div>
                <div className="messages-text">
                    <p className="pc-text">Your password</p>
                    <p className="pc-text">has been changed</p>
                    <p className="pc-text">successfully!</p>
                </div>

                <div className="messages-button">
                    <button className="messages-button-text" onClick={handleBack}>
                        <img src={back_button} alt='back'/>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotNIS;