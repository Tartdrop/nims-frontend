import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ForReleaseList.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const ForReleasing = () => {
    const {userId} = useParams();
    const [requests, setRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [expandedRequest, setExpandedRequest] = useState(null);
    const navigate = useNavigate();
    const requestListRef = useRef(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch requests for release
                const requestsResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/for-release`);
                if (!requestsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const requestsData = await requestsResponse.json();
                setRequests(requestsData);

                // Fetch results for each request
                const resultsPromises = requestsData.map(request => 
                    fetch(`${process.env.REACT_APP_API_URL}getResult/${request.requestId}`)
                        .then(res => res.json())
                );
                
                const results = await Promise.all(resultsPromises);
                
                // Map results to request IDs
                const mappedResults = {};
                results.forEach(result => {
                    mappedResults[result.requestId] = result;
                });

                console.log('Mapped results:', mappedResults);
                setTestResults(mappedResults);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleRelease = async (requestId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}requests/approveRelease/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error('Failed to release request');
            }

            // Refresh the data after successful release
            const updatedRequestsResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/for-release`);
            const updatedRequestsData = await updatedRequestsResponse.json();
            setRequests(updatedRequestsData);

            // Update results for remaining requests
            const resultsPromises = updatedRequestsData.map(request => 
                fetch(`${process.env.REACT_APP_API_URL}getResult/${request.requestId}`)
                    .then(res => res.json())
            );
            
            const results = await Promise.all(resultsPromises);
            const mappedResults = {};
            results.forEach(result => {
                mappedResults[result.requestId] = result;
            });
            
            setTestResults(mappedResults);

            // Optional: Add success message
            alert('Request released successfully');

        } catch (error) {
            console.error('Error releasing request:', error);
            alert('Failed to release request. Please try again.');
        }
    };

    const handleReject = async (requestId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}requests/reject/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to release request');
            }

            // Refresh the data after successful release
            const updatedRequestsResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/for-release`);
            const updatedRequestsData = await updatedRequestsResponse.json();
            setRequests(updatedRequestsData);

            // Update results for remaining requests
            const resultsPromises = updatedRequestsData.map(request => 
                fetch(`${process.env.REACT_APP_API_URL}getResult/${request.requestId}`)
                    .then(res => res.json())
            );
            
            const results = await Promise.all(resultsPromises);
            const mappedResults = {};
            results.forEach(result => {
                mappedResults[result.requestId] = result;
            });
            
            setTestResults(mappedResults);

            // Optional: Add success message
            alert('Request has been rejected');

        } catch (error) {
            console.error('Error releasing request:', error);
            alert('Failed to release request. Please try again.');
        }
        // Implement reject logic
        console.log('Rejecting request:', requestId);
    };

    const toggleRequestDetails = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    return (
        <div className="forrelease-all-container">
            <div className='forrelease-container'>
                <div className="forrelease-title">
                    For Release
                    <div className="pendingrequest-popup">
                        ⓘ
                        <div className="popup-container">Drag the sides of the container to scroll!</div>
                    </div>
                </div>
                <div className="forrelease-1st-container">
                    {requests.length > 0 ? (
                        <div className="forrelease-list"ref={requestListRef}>
                            {requests.map((request) => {
                                const result = testResults[request.requestId];
                                return (
                                    <div key={request.requestId} className="release-request-row">
                                        <div 
                                            className={`release-request-summary ${expandedRequest === request.requestId ? 'expanded' : ''}`} 
                                            onClick={() => toggleRequestDetails(request.requestId)}
                                        >
                                            <div className="control-number">
                                                {request.controlNumber}
                                            </div>
                                            <div className="test-results-summary">
                                                {request.microbio && (
                                                    <div className="microbio-summary">
                                                        Microbiological: {result?.completeMicrobio ? 'Completed' : 'Pending'}
                                                    </div>
                                                )}
                                                {request.chem && (
                                                    <div className="chem-summary">
                                                        Chemical: {(result?.completeChemElisa || result?.completeChemMicrobial) ? 'Completed' : 'Pending'}
                                                    </div>
                                                )}
                                                {request.molBio && (
                                                    <div className="molbio-summary">
                                                        Molecular Biology: {result?.completeMolBio ? 'Completed' : 'Pending'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="action-buttons">
                                                <button 
                                                    className="release-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRelease(request.requestId);
                                                    }}
                                                >
                                                    Release
                                                </button>
                                                <button 
                                                    className="reject-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReject(request.requestId);
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>

                                        {expandedRequest === request.requestId && result && (
                                            <div className="request-details">
                                                <div className="test-results-details">
                                                    {/* Microbio Results */}
                                                    {request.microbio && result.microbioTestResults && result.microbioTestResults.length > 0 && (
                                                        <div className="microbio-results">
                                                            <h3>Microbiology Results</h3>
                                                            {Object.entries(result.microbioTestResults[0])
                                                                .filter(([key, value]) => 
                                                                    !key.includes('Date') && 
                                                                    !key.includes('Id') && 
                                                                    !key.includes('sample') &&
                                                                    value !== null
                                                                )
                                                                .map(([key, value]) => {
                                                                    // Format the key for display
                                                                    const formattedKey = key
                                                                        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                                                        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                                                                    return (
                                                                        <div key={key} className="result-item">
                                                                            <strong>{formattedKey}:</strong>
                                                                            <span className="result-line-1"></span>
                                                                            <span className="result-value">{value}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                        </div>
                                                    )}
                                                    
                                                    {/* Chemical Results */}
                                                    {request.chem && (
                                                        <div className="chemical-results">
                                                            <h3>Chemical Test Results</h3>
                                                            {/* ELISA Results */}
                                                            {result.chemElisaTestResults && result.chemElisaTestResults.length > 0 && (
                                                                <div className="elisa-results">
                                                                    <h4>ELISA Tests</h4>
                                                                    {Object.entries(result.chemElisaTestResults[0])
                                                                        .filter(([key, value]) => 
                                                                            !key.includes('Date') && 
                                                                            !key.includes('Id') && 
                                                                            !key.includes('sample') &&
                                                                            value !== null
                                                                        )
                                                                        .map(([key, value]) => {
                                                                            const formattedKey = key
                                                                                .replace(/([A-Z])/g, ' $1')
                                                                                .replace(/^./, str => str.toUpperCase());
                                                                            return (
                                                                                <div key={key} className="result-item">
                                                                                    <strong>{formattedKey}:</strong>
                                                                                    <span className="result-line-2"></span>
                                                                                    <span className="result-value">{value}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                </div>
                                                            )}
                                                            {/* Microbial Results */}
                                                            {result.chemMicrobialTestResults && result.chemMicrobialTestResults.length > 0 && (
                                                                <div className="microbial-results">
                                                                    <h4>Microbial Tests</h4>
                                                                    {Object.entries(result.chemMicrobialTestResults[0])
                                                                        .filter(([key, value]) => 
                                                                            !key.includes('Date') && 
                                                                            !key.includes('Id') && 
                                                                            !key.includes('sample') &&
                                                                            value !== null
                                                                        )
                                                                        .map(([key, value]) => {
                                                                            const formattedKey = key
                                                                                .replace(/([A-Z])/g, ' $1')
                                                                                .replace(/^./, str => str.toUpperCase());
                                                                            return (
                                                                                <div key={key} className="result-item">
                                                                                    <strong>{formattedKey}:</strong>
                                                                                    <span className="result-line-3"></span>
                                                                                    <span className="result-value">{value}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {/* Molecular Biology Results */}
                                                    {request.molBio && result.molBioTestResults && result.molBioTestResults.length > 0 && (
                                                        <div className="molbio-results">
                                                            <h3>Molecular Biology Results</h3>
                                                            {Object.entries(result.molBioTestResults[0])
                                                                .filter(([key, value]) => 
                                                                    !key.includes('Date') && 
                                                                    !key.includes('Id') && 
                                                                    !key.includes('sample') &&
                                                                    value !== null
                                                                )
                                                                .map(([key, value]) => {
                                                                    const formattedKey = key
                                                                        .replace(/([A-Z])/g, ' $1')
                                                                        .replace(/^./, str => str.toUpperCase());
                                                                    return (
                                                                        <div key={key} className="result-item">
                                                                            <strong>{formattedKey}:</strong>
                                                                            <span className="result-line-4"></span>
                                                                            <span className="result-value">{value}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-3rd-container">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>
                                There are no requests for release at the moment.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForReleasing;
