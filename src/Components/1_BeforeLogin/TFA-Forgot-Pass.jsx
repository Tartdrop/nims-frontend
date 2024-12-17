import React, { useState, useEffect } from 'react';
import './TFA.css';
// import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom';

// Userfront.init("jb7ywq8b");

const TFAForgot = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(null);

    const handleVerifyOTP = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}verify-otp-password?email=${email}&otp=${verificationCode}`, {
                method: 'POST'
            });
    
            if (response.ok) {
              console.log("Successful");
              navigate(`/change-pass/${email}`, { replace: true })
            } else {
                // Unsuccessful verification
                alert('The OTP you have provided is incorrect or expired');
            }
        } catch (error) {
            alert('Failed connection to the');
        }
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    return (
        <div className='tfa-all-container'>
            <div className='tfa-all-left'>
            <form className="verification" onSubmit={handleVerifyOTP}>
                <div className='tfa-container'>
                    <div className='t-c-container'>
                        <p className="t-c-c-title">
                            Two-Factor
                        </p>
                        <p className="t-c-c-title">
                            Authentication
                        </p>
                        <p className="t-c-c-text">
                            Enter the code from your provided email below.
                        </p>
                        
                    </div>
                    <div className="tfa-email">                              
                        <div className="tfa-input">
                            <input 
                                className="font-link"
                                type="text" 
                                value={verificationCode}
                                placeholder="Authentication Code"
                                onChange={handleVerificationCodeChange}
                            />
                        </div>
                    </div>

                    <div className="login-button">
                        <button className="text-button" value="Verify OTP">Verify OTP</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default TFAForgot;