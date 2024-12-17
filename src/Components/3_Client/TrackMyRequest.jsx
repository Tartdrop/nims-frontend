import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TrackMyRequest.css';

import blue_logo_icon from '../Assets/BlueLogo.png';

const TrackRequest = () => {
    const { userId } = useParams();
    const [requests, setRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [expandedRequest, setExpandedRequest] = useState(null);
    const navigate = useNavigate();
    const requestListRef = useRef(null);
    const [showPopup] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}requests/clientrequest/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching pending requests:', error);
            });
    }, [userId]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const releasedRequests = requests.filter(req => req.requestStatus === "RELEASED");
                const resultsPromises = releasedRequests.map(request =>
                    fetch(`${process.env.REACT_APP_API_URL}getResult/${request.requestId}`)
                        .then(res => res.json())
                );

                const results = await Promise.all(resultsPromises);
                const mappedResults = {};
                results.forEach(result => {
                    mappedResults[result.requestId] = result;
                });
                setTestResults(mappedResults);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        if (requests.some(req => req.requestStatus === "RELEASED")) {
            fetchResults();
        }
    }, [requests]);

    const formatRequestStatus = (status) => {
        const statusMap = {
            REJECTED: "REJECTED",
            FOR_TESTING: "FOR TESTING",
            FOR_RELEASE: "FOR RELEASE",
            PENDING_REVIEW: "PENDING REVIEW",
            RELEASED: "RELEASED"
        };
        return statusMap[status] || status;
    };

    const toggleRequestDetails = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

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
        <div className="trackmyrequest-all-container">
            <div className='trackmyrequest-container'>
                <div className="trackmyrequest-title">
                    Track My Requests 
                    <div className="trackmyrequest-popup">
                        ⓘ
                        <div className="popup-container">Drag the sides of the container to scroll!</div>
                    </div>
                </div>
                {showPopup && (
                    <div className="popup-container">
                        <p>Drag the page to scroll.</p>
                    </div>
                )}
                <div className="trackmyrequest-1st-container">
                    <div className="trackmyrequest-1st-container-header">
                        <div className="trackmyrequest-1st-container-header-title">
                            Control Number
                        </div>
                        <div className="lineseperator">|</div>
                        <div className="trackmyrequest-1st-container-header-title">
                            Submission Date
                        </div>
                        <div className="lineseperator">|</div>
                        <div className="trackmyrequest-1st-container-header-title">
                            Status
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        <div className="trackmyrequests-list" ref={requestListRef}>
                            {requests.map((request, index) => {
                                return (
                                    <div key={index} className="request-container-item">
                                        <button
                                            className={`request-button ${request.requestStatus.toLowerCase()}`}
                                            onClick={() => {
                                                if (request.requestStatus === "RELEASED") {
                                                    navigate(`/request-results/${userId}/${request.requestId}`);
                                                } else {
                                                    navigate(`/request-review/${userId}/${request.requestId}`);
                                                }
                                            }}
                                        >
                                            <div className="req-side">{request.controlNumber}</div>
                                            <p className="req-lineseparator">|</p>
                                            <div className="req-side">{request.submissionDate}</div>
                                            <p className="req-lineseparator">|</p>
                                            <div className="req-side">{formatRequestStatus(request.requestStatus)}</div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-2nd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>You have no ongoing requests and results.</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackRequest;
