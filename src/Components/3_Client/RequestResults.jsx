import React, { useState, useEffect, useRef } from 'react';
import './RequestResults.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import blue_logo_icon from '../Assets/BlueLogo.png';

const RequestResults = () => {
    const { userId, requestId } = useParams(); // Extract both userId and requestId from URL
    const [requests, setRequests] = useState([]);
    const [testResults, setTestResults] = useState({});
    const [result, setResult] = useState(null); // To store the result for the specific requestId
    const navigate = useNavigate();
    const requestListRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch requests for release
                const requestsResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/released`);
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

                setTestResults(mappedResults);

                // Filter the specific requestId's result
                const specificResult = mappedResults[requestId];
                setResult(specificResult || null);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [requestId]); // Dependency on requestId to refetch if it changes

    const handleBack = () => {
        navigate(`/track-my-request/${userId}`, { replace: true });
    };

    return (
        <div className="submit-container-all">
            <div className="rr-s-c-a-right">
                <div className='s-c-a-r-title'>
                    <div className="s-c-a-r-t-back" onClick={handleBack}>
                        ←
                    </div>
                    Request Results
                </div>
                <div className='rr-s-c-a-r-container-everything'>
                    <div className='rr-s-c-a-r-c-e-scroll'>
                        <div className='s-c-a-r-c-e-s-numbered'>
                        {result && (
                            <div className="result-details">
                                {/* Microbiology Results */}
                                {result.microbioTestResults && result.microbioTestResults.length > 0 && (
                                    <div className="microbiology-results">
                                        <h4>Microbiology Tests</h4>
                                        {Object.entries(result.microbioTestResults[0])
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
                                                    <div key={key} className="s-result-item">
                                                        <strong>{formattedKey}:</strong>
                                                        <span className="s-result-line-1"></span>
                                                        <span className="s-result-value">{value}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}

                                {/* Chemical ELISA Results */}
                                {result.chemElisaTestResults && result.chemElisaTestResults.length > 0 && (
                                    <div className="chemical-elisa-results">
                                        <h4>Chemical ELISA Tests</h4>
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
                                                    <div key={key} className="s-result-item">
                                                        <strong>{formattedKey}:</strong>
                                                        <span className="s-result-line-3"></span>
                                                        <span className="s-result-value">{value}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}

                                {/* Chemical Microbial Results */}
                                {result.chemMicrobialTestResults && result.chemMicrobialTestResults.length > 0 && (
                                    <div className="chemical-microbial-results">
                                        <h4>Chemical Microbial Tests</h4>
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
                                                    <div key={key} className="s-result-item">
                                                        <strong>{formattedKey}:</strong>
                                                        <span className="s-result-line-4"></span>
                                                        <span className="s-result-value">{value}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}

                                {/* Molecular Biology Results */}
                                {result.molBioTestResults && result.molBioTestResults.length > 0 && (
                                    <div className="molecular-biology-results">
                                        <h4>Molecular Biology Tests</h4>
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
                                                    <div key={key} className="s-result-item">
                                                        <strong>{formattedKey}:</strong>
                                                        <span className="s-result-line-2"></span>
                                                        <span className="s-result-value">{value}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                        <div className='request-review-button'>
                            <button className="back-text-button" onClick={handleBack}>
                                Back
                            </button>
                        </div>
                    </div>   
                </div>
            </div>         
        </div> 
    );
}

export default RequestResults;
