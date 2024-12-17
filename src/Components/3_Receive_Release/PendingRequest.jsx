import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PendingRequest.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const PendingRequest = () => {
    const {userId} = useParams();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const [testResults, setTestResults] = useState({});
    const requestListRef = useRef(null);

    useEffect(() => {
        // Fetch data from backend on component mount
        fetch(`${process.env.REACT_APP_API_URL}requests/pending`)
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

    useEffect(() => {
        const requestList = requestListRef.current;
        if (!requestList) return;
    
        let isDown = false;
        let startY;
        let scrollTop;
    
        const handleMouseDown = (e) => {
            e.preventDefault();
            isDown = true;
            requestList.classList.add('grabbing');
            startY = e.pageY - requestList.offsetTop;
            scrollTop = requestList.scrollTop;
        };
    
        const handleMouseLeave = (e) => {
            e.preventDefault();
            isDown = false;
            requestList.classList.remove('grabbing');
        };
    
        const handleMouseUp = (e) => {
            e.preventDefault();
            isDown = false;
            requestList.classList.remove('grabbing');
        };
    
        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const y = e.pageY - requestList.offsetTop;
            const walk = (y - startY) * 2; // Adjust scrolling speed
            requestList.scrollTop = scrollTop - walk;
        };
    
        requestList.addEventListener('mousedown', handleMouseDown);
        requestList.addEventListener('mouseleave', handleMouseLeave);
        requestList.addEventListener('mouseup', handleMouseUp);
        requestList.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            requestList.removeEventListener('mousedown', handleMouseDown);
            requestList.removeEventListener('mouseleave', handleMouseLeave);
            requestList.removeEventListener('mouseup', handleMouseUp);
            requestList.removeEventListener('mousemove', handleMouseMove);
        };
    }, [requests.length]);

    return (
        <div className="pendingrequest-all-container">
            <div className='pendingrequest-container'>
                <div className="pendingrequest-title">
                    Pending Requests
                    <div className="pendingrequest-popup">
                        ⓘ
                        <div className="popup-container">Drag the sides of the container to scroll!</div>
                    </div>
                </div>
                <div className="pendingrequest-1st-container">
                    <div className="pendingrequest-1st-container-header">
                        <div className="pendingrequest-1st-container-header-title">
                            Client Classification
                        </div>
                        <div className="lineseparator">
                            |
                        </div>
                        <div className="pendingrequest-1st-container-header-title-middle">
                            Tests Selected
                        </div>
                        <div className="lineseparator">
                            |
                        </div>
                        <div className="pendingrequest-1st-container-header-title">
                            Submission Date
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        <div className="pendingrequests-list" ref={requestListRef}>
                            {requests.map((request, index) => {
                                return (
                                    <div key={index} className="request-container-item">
                                        <button
                                            className="my-requests"
                                            onClick={() => navigate(`/request-details/${userId}/${request.requestId}`)}
                                        >
                                            <div className="req-side">{request.clientClassification}</div>
                                            <p className="req-lineseparator">|</p>
                                            <div className="req-middle">
                                                {[
                                                    request.microbio && 'Microbiological',
                                                    request.chem && 'Chemical',
                                                    request.molBio && 'Micro Biological',
                                                ]
                                                    .filter(Boolean)
                                                    .join(', ')} 
                                            </div>
                                            <p className="req-lineseparator">|</p>
                                            <div className="req-side">{request.submissionDate}</div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-2nd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>
                                There are no pending requests as of the moment.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PendingRequest;