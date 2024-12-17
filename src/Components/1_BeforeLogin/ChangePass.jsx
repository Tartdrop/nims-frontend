import React, { useState } from 'react';
import './ChangePass.css';
import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API calls
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const ChangePass = () => {
    const { email } = useParams();
    const [password, setPassword] = useState(""); // New state for old password
    const [repeatPassword, setRepeatPassword] = useState(""); // New state for new password
    const [visible, setVisible] = useState(false);
    const [visibleRepeat, setVisibleRepeat] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Inline password validation
        if (password === repeatPassword && password !== "") {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}change-password?email=${email}&newPassword=${password}`, {
                    method: 'POST'
                });
    
                if (response.ok) {
                    console.log("Successful");
                    navigate("/password-changed", { replace: true });
                } else {
                    // Unsuccessful verification
                    alert('Unsuccessful');
                }
            } catch (error) {
                alert('Failed connection to the server: ' + error.message);
            }
        } else {
            alert("Please verify that the password you have input is correct");
        }
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