import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './XMessages.css';
import logo_icon from '../Assets/BlueLogo.png';

const ControlNumber = () => {
    const { userId, requestId } = useParams(); // Extract userId and requestId from URL params
    const navigate = useNavigate();
    const [controlNumber, setControlNumber] = useState(''); // State for the control number
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch the control number from the backend
        const fetchControlNumber = async () => {
            try {
                const response = await fetch(`http://localhost:8080/requests/ctrlnumber/${requestId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch control number');
                }
                const data = await response.text(); // Assuming the control number is plain text
                setControlNumber(data); // Update state with control number
            } catch (err) {
                setError(err.message); // Handle any errors
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchControlNumber();
    }, [requestId]);

    const handleBack = () => {
        navigate(`/home/staff/${userId}`, { replace: true }); // Navigate back to the staff home
    };

    return (
        <div className="messages-all-container">
            <div className="messages-container">
                <div className="messages-logo">
                    <img src={logo_icon} alt="Logo" />
                </div>
                <div className="messages-text">
                    <p className="es-text">Control Number:</p>
                    <br />
                    {loading ? (
                        <p className="bigger-text">Loading...</p>
                    ) : error ? (
                        <p className="error-text">{error}</p>
                    ) : (
                        <p className="bigger-text">{controlNumber}</p>
                    )}
                </div>
                <div className="messages-button">
                    <button className="messages-button-text" onClick={handleBack}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlNumber;
