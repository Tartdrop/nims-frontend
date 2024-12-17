import React from 'react';
import './XMessages.css';
import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom';

import logo_icon from '../Assets/BlueLogo.png';
import back_button from '../Assets/BackButton.png';

Userfront.init("jb7ywq8b");

const RegisterTY = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/home/staff/${userId}`, { replace: true });
    };

    return (
        <div className='messages-all-container'>
            <div className='messages-container'>
                <div className="messages-logo">
                    <img src={logo_icon} alt="Logo" />
                </div>
                <div className="messages-text">
                    <p className="rs-text">Request Submitted</p>
                    <p className="rs-text">for Compliance Check</p>
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

export default RegisterTY;