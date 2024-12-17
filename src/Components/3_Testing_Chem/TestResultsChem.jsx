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
    
        let isDragging = false;
        let startY = 0;
        let initialScrollTop = 0;
    
        const onMouseDown = (e) => {
            e.preventDefault(); // Prevents text selection
            isDragging = true;
            startY = e.pageY;
            initialScrollTop = requestList.scrollTop;
            requestList.classList.add('grabbing');
        };
    
        const onMouseMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.pageY - startY;
            requestList.scrollTop = initialScrollTop - deltaY; // Adjust scrolling
        };
    
        const onMouseUpOrLeave = () => {
            isDragging = false;
            requestList.classList.remove('grabbing');
        };
    
        // Attach event listeners
        requestList.addEventListener('mousedown', onMouseDown);
        requestList.addEventListener('mousemove', onMouseMove);
        requestList.addEventListener('mouseup', onMouseUpOrLeave);
        requestList.addEventListener('mouseleave', onMouseUpOrLeave);
    
        // Cleanup on component unmount
        return () => {
            requestList.removeEventListener('mousedown', onMouseDown);
            requestList.removeEventListener('mousemove', onMouseMove);
            requestList.removeEventListener('mouseup', onMouseUpOrLeave);
            requestList.removeEventListener('mouseleave', onMouseUpOrLeave);
        };
    }, []);

    return (
        <div className="testresults-all-container">
            <div className="testresults-container">
                <div className="testresults-title">
                    Chemistry Test Results
                    <div className="testresults-popup">
                        ⓘ
                        <div className="popup-container-1">Drag the sides of each container to scroll!</div>
                    </div>
                </div>
                <div className="testresults-cont">
                    {/* For Release Section */}
                    <div className="testresults-1st-container">
                        <h2>For Release</h2>
                        {forReleaseRequests.length > 0 ? (
                            <div className="testresults-list" ref={requestListRef}>
                                {forReleaseRequests
                                    .filter((request) => request.chem) // Filter out requests without `chem`
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
                                    .filter((request) => request.microbio) // Filter out requests without `chem`
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
