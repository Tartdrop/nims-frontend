import React, { useState, useEffect } from 'react';
import './TFA-Verify-Reg.css';
// import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom';

// Userfront.init("jb7ywq8b");

const TFAVerification = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [storedEmail, setStoredEmail] = useState(sessionStorage.getItem('userEmail') || '');
    const [verificationCode, setVerificationCode] = useState('');

    // Clear sessionStorage item on component mount
    useEffect(() => {
        sessionStorage.removeItem('userEmail');
    }, []);

    const handleEmailChange = (event) => {
        setStoredEmail(event.target.value);
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}clientverify?email=${storedEmail}&otp=${verificationCode}`, {
              method: 'POST'
          });
  
          if (response.ok) {
              // Successful verification
              console.log('Successful verification.');
              navigate('/registered');
          } else {
              // Unsuccessful verification
              console.log('Unsuccessful verification.');
          }
      } catch (error) {
          console.error('Error verifying user:', error);
      }
  };

    return (
        <div className='tfa-vr-all-container'>
            <div className='tfa-vr-all-left'>
            <form className="vr-verification" onSubmit={handleSubmit}>
                <div className='tfa-vr-container'>
                    <div className='t-vr-c-container'>
                        <p className="t-vr-c-c-title">
                            Two-Factor
                        </p>
                        <p className="t-vr-c-c-title">
                            Authentication
                        </p>
                        <p className="t-vr-c-c-text">
                        Enter the code from your provided email below.
                        </p>
                        
                    </div>
                    <div className="tfa-vr-email">     
                        <div className="tfa-vr-input">
                            <input 
                                className="font-link"
                                type="email" 
                                value={storedEmail}
                                placeholder="Email"
                                onChange={handleEmailChange}
                            />
                        </div>          
                        <div className="tfa-vr-input">
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
                        <button className="text-button" value="Verify Account">Log In</button>
                    </div>
                </div>
                </form>
            </div>
            {/*
            <div className='all-right'>
                <p className="all-right-first-row">
                    Welcome to the
                </p>
                <div className="all-right-second-row">
                    <p className="N">N</p>
                    <p className="M">M</p>
                    <p className="I">I</p>
                    <p className="S">S</p>
                    <p className="spacing">.</p>
                    <p className="laboratory">Laboratory</p>
                    <p className="services">Services</p>
                </div>
                <div className="all-right-third-row">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Vivamus metus arcu, molestie ac tempor at, fringilla eget ligula. 
                        Vestibulum scelerisque viverra tempor. Sed efficitur risus id cursus viverra. 
                        Proin ullamcorper nulla sed nisi ultricies molestie. Ut posuere pulvinar ornare. 
                        Nunc sit amet est sit amet justo mollis fermentum. Fusce sollicitudin eleifend gravida. 
                        Donec non mattis nunc. Mauris sollicitudin viverra elit, eu pretium diam blandit id. 
                        Aenean dolor ipsum, gravida a neque varius, pulvinar pharetra metus. 
                        Donec auctor arcu at malesuada hendrerit. Nunc luctus, magna sed efficitur ornare, 
                        mauris tellus sagittis lacus, sed fermentum tortor leo et tellus. Aliquam erat volutpat. 
                        Ut sapien sem, viverra vel sapien ut, lobortis sollicitudin lacus.
                    </p>
                </div>
            </div>
            */}
        </div>
    );
}

export default TFAVerification;