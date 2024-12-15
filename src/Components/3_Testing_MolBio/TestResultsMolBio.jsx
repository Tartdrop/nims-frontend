import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../3A_Testing/TestResults.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const TestingList = () => {
    const { userId } = useParams();
    const [requests, setRequests] = useState([]);
    const [forReleaseRequests, setForReleaseRequests] = useState([]);
    const [releasedRequests, setReleasedRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [expandedRequest, setExpandedRequest] = useState(null);
    const requestListRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch "for release" requests
                const forReleaseResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/for-release`);
                if (!forReleaseResponse.ok) {
                    throw new Error('Failed to fetch for release requests');
                }
                const forReleaseData = await forReleaseResponse.json();
                setForReleaseRequests(forReleaseData);

                // Fetch "released" requests
                const releasedResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/released`);
                if (!releasedResponse.ok) {
                    throw new Error('Failed to fetch released requests');
                }
                const releasedData = await releasedResponse.json();
                setReleasedRequests(releasedData);

                // Fetch test results for all requests (both "for release" and "released")
                const allRequests = [...forReleaseData, ...releasedData];
                const resultsPromises = allRequests.map(request =>
                    fetch(`${process.env.REACT_APP_API_URL}getResult/${request.requestId}`).then(res => res.json())
                );

                const results = await Promise.all(resultsPromises);
                const mappedResults = {};
                results.forEach(result => {
                    mappedResults[result.requestId] = result;
                });
                setTestResults(mappedResults);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
        <div className="testresults-all-container">
            <div className="testresults-container">
                <div className="testresults-title">
                    Molecular Biology Test Results
                    <div className="trackmyrequest-popup">
                        ⓘ
                        <div className="popup-container">Drag the sides of the container to scroll!</div>
                    </div>
                </div>
                
                <div className="testresults-cont">
                    {/* For Release Section */}
                    <div className="testresults-1st-container">
                        <h2>For Release</h2>
                        {forReleaseRequests.length > 0 ? (
                            <div className="testresults-list" ref={requestListRef}>
                                {forReleaseRequests
                                    .filter((request) => request.molBio) // Filter out requests without `chem`
                                    .map((request) => {
                                    const result = testResults[request.requestId];
                                    return (
                                        <div key={request.requestId} className="release-request-row">
                                            <div 
                                                className={`release-testresults-summary ${expandedRequest === request.requestId ? 'expanded' : ''}`} 
                                                onClick={() => toggleRequestDetails(request.requestId)}
                                            >
                                                <div className="control-number">{request.controlNumber}</div>
                                            </div>

                                            {expandedRequest === request.requestId && result && (
                                                <div className="testresults-details">
                                                    <div className="test-results-details">
                                                
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
                            <div className="empty-4th-container">
                                <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                                <h1 className="msg-noreqres1">No requests for release at the moment.</h1>
                            </div>
                        )}
                    </div>

                    {/* Released Section */}
                    <div className="testresults-2nd-container">
                        <h2>Released</h2>
                        {releasedRequests.length > 0 ? (
                            <div className="released-list" ref={requestListRef}>
                                {releasedRequests
                                    .filter((request) => request.molBio) // Filter out requests without `chem`
                                    .map((request) => {
                                    const result = testResults[request.requestId];
                                    return (
                                        <div key={request.requestId} className="release-request-row">
                                            <div 
                                                className={`release-testresults-summary ${expandedRequest === request.requestId ? 'expanded' : ''}`} 
                                                onClick={() => toggleRequestDetails(request.requestId)}
                                            >
                                                <div className="control-number">{request.controlNumber}</div>
                                            </div>

                                            {expandedRequest === request.requestId && result && (
                                                <div className="testresults-details">
                                                    <div className="test-results-details">
                                            
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
                            <div className="empty-4th-container">
                                <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                                <h1 className="msg-noreqres1">No released requests at the moment.</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestingList;
