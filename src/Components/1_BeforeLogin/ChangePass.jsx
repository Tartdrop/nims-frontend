import React, { useState } from 'react';
import './ChangePass.css';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API calls
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const ChangePass = () => {
    const [password, setPassword] = useState(""); // New state for old password
    const [repeatPassword, setRepeatPassword] = useState(""); // New state for new password
    const [visible, setVisible] = useState(false);
    const [visibleRepeat, setVisibleRepeat] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate("/password-changed", { replace: true })
    };

    return (
        <div className='changepass-all-container'>
            <div className='changepass-all-left'>
                <div className='changepass-container'>
                    <div className='cp-c-container'>
                        <p className="cp-c-c-changepass">
                            Change your
                        </p>
                        <p className="cp-c-c-changepass">
                            Password
                        </p>
                        <p className="cp-c-c-text">
                            Enter your new password below.
                        </p>
                    </div>
                    <div className="changepass-changepass">               
                        <div className="changepass-input">
                            <input 
                                className="font-link"
                                type={visible ? "text" : "password"} 
                                value={password}
                                placeholder="New Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="eyecon" onClick={() => setVisible(!visible)}>
                                <button>
                                    {visible ? (
                                        <img src={eyeOpen} alt="Show Password" />
                                    ) : (
                                        <img src={eyeClose} alt="Hide Password" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="changepass-input">
                            <input 
                                className="font-link"
                                type={visibleRepeat ? "text" : "password"} 
                                value={repeatPassword}
                                placeholder="Repeat Password"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <div className="eyecon" onClick={() => setVisibleRepeat(!visibleRepeat)}>
                                <button>
                                    {visibleRepeat ? (
                                        <img src={eyeOpen} alt="Show Password" />
                                    ) : (
                                        <img src={eyeClose} alt="Hide Password" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
    
                    <div className="login-button">
                        <button 
                            className="text-button" 
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default ChangePass;