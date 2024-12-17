import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import logo_icon from '../Assets/BlueLogo.png';
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const Login = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const url = new URL(`${process.env.REACT_APP_API_URL}login`);
            url.searchParams.append('identifier', identifier);
            url.searchParams.append('password', password);

            const response = await fetch(url, {
                method: 'POST',
            });

            if (response.ok) {
                navigate(`/tfa/${identifier}`);
            } else {
                alert('Your password is incorrect or this account does not exist.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgetPassword = () => {
        navigate('/forget');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className='login-all-container'>
            <div className='login-all-left'>
                <div className='login-container'>
                    <div className="logo">
                        <img src={logo_icon} alt="Logo" />
                    </div>
                    <div className="login-em-pass">
                        <div className="login-input">
                            <input
                                className="font-link"
                                type="email"
                                value={identifier}
                                placeholder="Email"
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>

                        <div className="login-input">
                            <input
                                className="font-link"
                                type={visible ? "text" : "password"}
                                value={password}
                                id="password"
                                placeholder="Password"
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
                    </div>

                    <div className="login-button">
                        <button className="text-button" onClick={handleLogin} disabled={loading}>
                            {loading ? 'Loading...' : 'Log In'}
                        </button>
                    </div>

                    <div className="login-last-row-text">
                        <button className="forget center button-text" onClick={handleForgetPassword}>
                            Forget Password?
                        </button>
                        <button className="register center button-text" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
