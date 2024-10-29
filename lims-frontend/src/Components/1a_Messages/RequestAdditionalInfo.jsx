import React, { useState } from 'react';
import './XMessages.css'; // Import the CSS file
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

Userfront.init("jb7ywq8b");

const RequestAddInfo = () => {
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value);
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className='messages-all-container'>
            <div className='messages-container'>
                <div className="req-text">
                    <p className="left-text">Request</p>
                    <p className="left-text">Additional</p>
                    <p className="left-text">Information</p>
                </div>
                    <p className="left-text-small">Type your comments down below</p>
                <textarea
                    value={additionalInfo}
                    onChange={handleAdditionalInfoChange}
                    placeholder="Enter additional information"
                    className="input-text" // Add the input-text class here
                />
                <div className="messages-button">
                    <button className="messages-button-text" onClick={handleBack}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestAddInfo;
