import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom'; 
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleInitial, setMiddleInitial] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [ltoNumber, setLtoNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("(+63)");
    const [clientClassification, setClientClassification] = useState("");
    const [otherClientClassification, setOtherClientClassification] = useState("");

    const navigateAfterLogin = () => {
        navigate("/tfaverify");
    }

    const handleRegister = async () => {
        if (
            !email.trim() ||
            !password.trim() ||
            !firstName.trim() ||
            !lastName.trim() ||
            !companyName.trim() ||
            !ltoNumber.trim() ||
            !contactNumber.trim() ||
            !clientClassification.trim() ||
            contactNumber.trim().length !== 18 
        ) {
            alert("Please fill in all required fields, ensure contact number is 18 characters long, and client classification is provided.");
            return;
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}clients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        firstName: firstName,
                        middleName: middleInitial,
                        lastName: lastName,
                        contactNumber: contactNumber,
                        email: email,
                        password: password,
                        userType: "CLIENT",
                        deletionStatus: "ACTIVE"
                    },
                    client: {
                        companyName: companyName,
                        ltoNo: ltoNumber,
                        classification: clientClassification,
                    }
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed.");
            }
    
            navigateAfterLogin();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    
    const handleForgetPassword = () => {
        navigate("/forget")
    };

    const handleBackToLogin = () => {
        navigate("/login")
    };

    const handleContactNumberChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (!value.startsWith("63")) {
            value = "63" + value;
        }
        if (value.length > 12) {
            value = value.slice(0, 12);
        }
        const formattedValue = `(+63) ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8)}`.trim();
        setContactNumber(formattedValue);
    };

    const handleLtoNumberChange = (e) => {
        setLtoNumber(e.target.value.toUpperCase());
    };

    return (
        <div className='register-all-container'>
            <div className='register-container'>
                <div className="registration">Registration</div>
                <div className="register-form">
                    <div className='register-all-left'>
                        <div className="inputs">
                            <div className='label-container-left'>
                                <div className='l-c-label'>Username</div>
                                <div className="username">
                                    <input 
                                        className="font-link"
                                        type="text" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="register-input-first-row">
                                <div className='label-container-left'>
                                    <div className='l-c-label'>First Name</div>
                                    <div className='first-name'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='label-container-left'>
                                    <div className='l-c-label'>M.I.</div>
                                    <div className='mi'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={middleInitial}
                                            maxLength={1}
                                            onChange={(e) => setMiddleInitial(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='label-container-left'>
                                    <div className='l-c-label'>Last Name</div>
                                    <div className='last-name'>
                                        <input 
                                            className="font-link"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>     
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Company Name</div>
                                <div className="company-name">
                                    <input 
                                        className="font-link"
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="register-input-third-row">
                                <div className='label-container-left'>
                                    <div className='l-c-label'>LTO Number</div>
                                    <div className='lto-number'>
                                    <input 
                                        className="font-link"
                                        type="text"
                                        value={ltoNumber}
                                        onChange={handleLtoNumberChange}
                                        maxLength={12}
                                    />
                                    </div>
                                </div>

                                <div className='label-container-left'>
                                    <div className='l-c-label'>Contact Number</div>
                                    <div className='contact-number'>
                                    <input 
                                        className="font-link"
                                        type="text"
                                        value={contactNumber}
                                        onChange={handleContactNumberChange}
                                        placeholder="+63XXX-XXX-XXXX"
                                        maxLength={18}
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Email</div>
                                <div className="email">
                                    <input 
                                        className="font-link"
                                        type="text" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Password</div>
                                <div className="password">
                                    <input 
                                        className="font-link"
                                        type={visible ? "text" : "password"}
                                        value={password} 
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <div className="eyecon-register" onClick={() => setVisible(!visible)}>
                                        <button>
                                            {visible ? <img src={eyeOpen} alt="Show Password" /> 
                                                    : <img src={eyeClose} alt="Hide Password" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='label-container-left'>
                                <div className='l-c-label'>Repeat Password</div>
                                <div className="retype-password">
                                    <input
                                        className="font-link"
                                        type={repeatPasswordVisible ? "text" : "password"}
                                        value={repeatPassword}
                                        id="repeat-password"
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                    />

                                <div className="eyecon-register" onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}>
                                    <button>
                                        {repeatPasswordVisible ? <img src={eyeOpen} alt="Show Password" /> : <img src={eyeClose} alt="Hide Password" />}
                                    </button>
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>    

                    <div className="register-all-right">
                        <div className='label-container-right'>
                            <div className='l-c-label'>Client Classification</div>
                                <div className="cli-class">
                                    <div className="cli-class-both">
                                        <div className="cli-class-left">
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Importer" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Importer
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Exporter" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Exporter
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Slaughterhouse" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Slaughterhouse
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Poultry Dressing Plant" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Poultry Dressing Plant
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Meat Dealer" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Meat Dealer
                                            </label>
                                        </div>

                                        <div className="cli-class-right">
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Meat Processing Plant" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Meat Processing Plant
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Meat Cutting Plant" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Meat Cutting Plant
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Consumer" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Consumer
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Plant Officer" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Plant Officer
                                            </label>
                                            <label class="cli-class-container">
                                                <input type="radio" name="cli-class" value="Cold Storage Warehouse" onChange={(e) => setClientClassification(e.target.value)}/>
                                                <span class="checkmark"></span>
                                                Cold Storage Warehouse
                                            </label>
                                        </div>
                                    </div>

                                    <div className="cli-class-others">
                                    <label class="cli-class-container">
                                        <input 
                                            type="radio" 
                                            name="cli-class" 
                                            value="Others" 
                                            onChange={(e) => setClientClassification(otherClientClassification || "Others")}
                                        />
                                        <span class="checkmark"></span>
                                        Others:
                                        <input 
                                            type="text"
                                            value={otherClientClassification}
                                            onChange={(e) => {
                                                setOtherClientClassification(e.target.value);
                                                // Update clientClassification only if "Others" is selected
                                                if (clientClassification === "Others" || clientClassification === otherClientClassification) {
                                                    setClientClassification(e.target.value);
                                                }
                                            }}
                                        />
                                    </label>
                                    </div>
                                </div>
                            </div>

                        <div className="register-note">
                            <div className="register-note-text">
                                * Make sure to fill in all the fields
                                before pressing the register button down below *
                            </div>
                            <div className="register-note-text-down"> ↓ </div>
                        </div>

                        <div className="register-button" onClick={handleRegister}>
                            <button className="text-button">Register</button>
                        </div>

                        <div className="register-last-row-text">
                            <button className="center button-text" onClick={handleBackToLogin}>Back To Log In</button>
                            <button className="center button-text" onClick={handleForgetPassword}>Forget Password?</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;