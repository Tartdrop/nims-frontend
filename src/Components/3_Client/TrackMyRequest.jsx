import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TrackMyRequest.css';

import blue_logo_icon from '../Assets/BlueLogo.png';

const TrackRequest = () => {
    const {userId} = useParams();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend on component mount
        fetch('http://localhost:8080/requests/trackmyrequest/{userId}')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update state with fetched data
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching pending requests:', error);
            });
    }, []);

    return (
        <div className="trackmyrequest-all-container">
            <div className='trackmyrequest-container'>
                <div className='trackmyrequest-title'>Track My Requests</div>
                <div className="trackmyrequest-1st-container">
                    <div className="trackmyrequest-1st-container-header">
                        <div className="trackmyrequest-1st-container-header-title">
                            Username
                        </div>
                        <div className="trackmyrequest-1st-container-header-title">
                            |
                        </div>
                        <div className="trackmyrequest-1st-container-header-title">
                            Submission Date
                        </div>
                        <div className="trackmyrequest-1st-container-header-title">
                            |
                        </div>
                        <div className="trackmyrequest-1st-container-header-title">
                            Status
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        requests.map((request, index) => (
                            <button 
                                key={index} 
                                className="myrequests"
                                onClick={() => navigate(`/request-details/${userId}/${request.requestId}`)}
                            >
                                <div>{request.representativeName}</div>
                                <div>{request.submissionDate}</div>
                                <div>{request.submissionDate}</div>
                            </button>
                        ))
                    ) : (
                        <div className="pendingrequest-2nd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>
                                You have no ongoing requests and results.
                            </h1>
                            <h1 className='msg-noreqres2'>
                                Request through the "Submit a Request" page.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackRequest;