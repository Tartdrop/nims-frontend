import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../3A_Testing/ForTesting.css';
import './ForTestingMicrobio.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const ForTestingMicrobio = () => {
    const { userId, requestId } = useParams();
    const [requests, setRequests] = useState([]);
    const [expandedSample, setExpandedSample] = useState(null);
    const [expandedMicrobial, setExpandedMicrobial] = useState(null);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [testResults, setTestResults] = useState({});
    const [saveStatus, setSaveStatus] = useState('');
    const [analysisDateUpdates, setAnalysisDateUpdates] = useState({});
    const [showPopup] = useState(false);
    const requestListRef = useRef(null);
    const [testRemarks, setTestRemarks] = useState({});

    useEffect(() => {
        const requestList = requestListRef.current;
        if (!requestList) return;
    
        let isDown = false;
        let startY;
        let scrollTop;
    
        const handleMouseDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    
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
            const walk = (y - startY) * 2;
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
        const userType = localStorage.getItem('userType');
        setUserType(userType);
        
        const fetchData = async () => {
            try {
                const requestsResponse = await fetch('http://localhost:8080/requests/for-testing');
                if (!requestsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const requestsData = await requestsResponse.json();
                setRequests(requestsData);

                const [microbioRes, chemElisaRes, chemMicrobialRes, molBioRes] = await Promise.all([
                    fetch('http://localhost:8080/microbioTestResults'),
                    fetch('http://localhost:8080/chemElisaTestResults'),
                    fetch('http://localhost:8080/chemMicrobialTestResults'),
                    fetch('http://localhost:8080/molBioTestResults')
                ]);

                const [microbioData, chemElisaData, chemMicrobialData, molBioData] = await Promise.all([
                    microbioRes.json(),
                    chemElisaRes.json(),
                    chemMicrobialRes.json(),
                    molBioRes.json()
                ]);

                const mappedResults = {};

                microbioData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        eColi: result.eColi,
                        eColiAndeColi0O157: result.eColiAndeColi0O157,
                        standardPlateCount: result.standardPlateCount,
                        staphylococcusAureus: result.staphylococcusAureus,
                        salmonellaSp: result.salmonellaSp,
                        campylobacter: result.campylobacter,
                        cultureAndSensitivityTest: result.cultureAndSensitivityTest,
                        coliformCount: result.coliformCount,
                        yeastAndMolds: result.yeastAndMolds
                    };
                });

                chemElisaData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        chloramphenicol: result.chloramphenicol,
                        nitrofuranAoz: result.nitrofuranAoz,
                        beta_agonists: result.beta_agonists,
                        corticosteroids: result.corticosteroids,
                        olaquindox: result.olaquindox,
                        nitrufuranAmoz: result.nitrufuranAmoz,
                        stilbenes: result.stilbenes,
                        ractopamine: result.ractopamine
                    };
                });

                chemMicrobialData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        betaLactams: result.betaLactams,
                        tetracyclines: result.tetracyclines,
                        sulfonamides: result.sulfonamides,
                        aminoglycosides: result.aminoglycosides,
                        macrolides: result.macrolides,
                        quinolones: result.quinolones
                    };
                });

                molBioData.forEach(result => {
                    mappedResults[result.result.requestId] = {
                        ...mappedResults[result.result.requestId],
                        dog: result.dog,
                        cat: result.cat,
                        chicken: result.chicken,
                        buffalo: result.buffalo,
                        cattle: result.cattle,
                        horse: result.horse,
                        goat: result.goat,
                        sheep: result.sheep,
                        swine: result.swine
                    };
                });

                console.log('Mapped test results:', mappedResults);
                setTestResults(mappedResults);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleSample = (controlNumber) => {
        setExpandedSample(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const toggleMicrobial = (controlNumber) => {
        setExpandedMicrobial(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const canAccessMicrobio = (userType) => {
        return ['TESTER', 'MICROBIOTESTER'].includes(userType.toUpperCase());
    };

    const handleTestResultChange = (requestId, testType, value) => {
        setTestResults(prev => ({
            ...prev,
            [requestId]: {
                ...prev[requestId],
                [testType]: value
            }
        }));
    };

    const handleRemarkChange = (requestId, testType, value) => {
        setTestRemarks(prev => ({
            ...prev,
            [requestId]: {
                ...prev[requestId],
                [`${testType}Remarks`]: value
            }
        }));
    };

    const handleAnalysisDateChange = (requestId, testType, date) => {
        setAnalysisDateUpdates(prev => ({
            ...prev,
            [`${requestId}_${testType}_analysis_date`]: date
        }));
    };

    const handleSaveChanges = async (request) => {
        try {
            if (!request.sample || !request.sample.length) {
                throw new Error('No sample ID found for this request');
            }
    
            const sampleId = request.sample[0].sampleId;
            const currentResults = testResults[request.requestId] || {};
            const currentRemarks = testRemarks[request.requestId] || {};
    
            if (request.microbio) {
                const microbioData = {};
                Object.keys(currentResults).forEach(testType => {
                    if (currentResults[testType]) {
                        microbioData[testType] = currentResults[testType];
                        microbioData[`${testType}Remarks`] = currentRemarks[`${testType}Remarks`] || '';
                        microbioData[`${testType}AnalysisDate`] = analysisDateUpdates[`${request.requestId}_${testType}_analysis_date`] || null;
                    }
                });

                if (Object.keys(microbioData).length > 0) {
                    console.log('Sending microbio data:', microbioData);
                    const response = await fetch(`http://localhost:8080/microbioTestResults/${sampleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(microbioData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to save microbio results: ${errorText}`);
                    }
                }
            }
    
            // Repeat similar logic for chem and molBio tests...

            alert('Changes saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes: ' + error.message);
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const handlePositiveClick = (requestId, testType) => {
        handleTestResultChange(requestId, testType, 'Positive');
    };

    const handleNegativeClick = (requestId, testType) => {
        handleTestResultChange(requestId, testType, 'Negative');
    };

    return (
        <div className="fortesting-all-container">
            <div className='fortesting-container'>
                <div className="fortesting-title">
                    For Testing
                    <div className="fortesting-popup">
                        ⓘ
                        <div className="popup-container">Drag the sides of the container to scroll!</div>
                    </div>
                </div>
                {showPopup && (
                    <div className="popup-container">
                        <p>Drag the page to scroll.</p>
                    </div>
                )}
                <div className="fortesting-1st-container">
                    <div className="fortesting-1st-container-header">
                        <div className="fortesting-1st-container-header-title-left">
                            Control Number
                        </div>
                        <div className="lineseparator">|</div>
                        <div className="fortesting-1st-container-header-title">
                            Microbiological Tests
                        </div>
                        <div className="lineseparator">|</div>
                        <div className="fortesting-1st-container-header-title">
                            Sample Information
                        </div>
                        <div className="lineseparator">|</div>
                        <div className="fortesting-1st-container-header-title-right">
                            Save Changes
                        </div>
                    </div>
                    {requests.length > 0 ? (
                        <div className="fortesting-list" ref={requestListRef}>
                        {requests.map((request, index) => (
                            <div key={index} className="request-item">
                                <div className="fortesting-header">
                                    <span className="fortesting-controlnumber">{request.controlNumber}</span>
                                    <div className="lineseparator-left">|</div>
                                    <span className="fortesting-tests">
                                        {request.microbio ? (
                                            canAccessMicrobio(userType) ? (
                                                <button 
                                                    className="test-btn" 
                                                    onClick={() => toggleMicrobial(request.controlNumber)}
                                                >
                                                    Show Microbiological Tests
                                                </button>
                                            ) : (
                                                <div>
                                                    <button 
                                                        className="test-btn-disabled" 
                                                        disabled
                                                        title="You don't have permission to access this section"
                                                    >
                                                        Show Microbiological Tests
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            "no testing...."
                                        )}
                                        {expandedMicrobial === request.controlNumber && (
                                            <div className="microbio-list">
                                                {request.standardPlateCount && (
                                                    <div className="test-result-item-2">
                                                        <strong>Standard/Aerobic Plate Count:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.standardPlateCountRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'standardPlateCount', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'standardPlateCount')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'standardPlateCount')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_standardPlateCount_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'standardPlateCount', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.coliformCount && (
                                                    <div className="test-result-item-2">
                                                        <strong>Coliform count:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.coliformCountRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'coliformCount', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'coliformCount')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'coliformCount')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_coliformCount_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'coliformCount', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.salmonellaSp && (
                                                    <div className="test-result-item-2">
                                                        <strong>Salmonella sp.:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.salmonellaSpRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'salmonellaSp', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'salmonellaSp')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'salmonellaSp')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_salmonellaSp_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'salmonellaSp', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.staphylococcusAureus && (
                                                    <div className="test-result-item-2">
                                                        <strong>Staphylococcus aureus:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.staphylococcusAureusRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'staphylococcusAureus', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'staphylococcusAureus')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'staphylococcusAureus')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_staphylococcusAureus_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'staphylococcusAureus', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.eColi && (
                                                    <div className="test-result-item-2">
                                                        <strong>E.Coli:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.eColiRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'eColi', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'eColi')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'eColi')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_eColi_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'eColi', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.eColiAndeColi0O157 && (
                                                    <div className="test-result-item-2">
                                                        <strong>E. coli and E.Coli 0157:H7:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.eColiAndeColi0O157Remarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'eColiAndeColi0O157', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'eColiAndeColi0O157')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'eColiAndeColi0O157')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_eColiAndeColi0O157_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'eColiAndeColi0O157', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.campylobacter && (
                                                    <div className="test-result-item-2">
                                                        <strong>Campylobacter:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.campylobacterRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'campylobacter', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'campylobacter')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'campylobacter')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_campylobacter_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'campylobacter', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.yeastAndMolds && (
                                                    <div className="test-result-item-2">
                                                        <strong>Yeast and Molds:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.yeastAndMoldsRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'yeastAndMolds', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'yeastAndMolds')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'yeastAndMolds')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_yeastAndMolds_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'yeastAndMolds', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.cultureAndSensitivityTest && (
                                                    <div className="test-result-item-2">
                                                        <strong >Culture and Sensitivity Test:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testRemarks[request.requestId]?.cultureAndSensitivityTestRemarks || ''}
                                                                onChange={(e) => handleRemarkChange(request.requestId, 'cultureAndSensitivityTest', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button className='positive' onClick={() => handlePositiveClick(request.requestId, 'cultureAndSensitivityTest')}>+</button> 
                                                            <button className='negative' onClick={() => handleNegativeClick(request.requestId, 'cultureAndSensitivityTest')}>-</button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_cultureAndSensitivityTest_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'cultureAndSensitivityTest', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </span>
                                    <div className="lineseparator">|</div>
                                    <span className="fortesting-sampleinfo">
                                        <button className="test-btn" onClick={() => toggleSample(request.controlNumber)}>
                                            View Sample Information
                                        </button>
                                        {expandedSample === request.controlNumber && (
                                            <div className="sample-list">
                                                {request.sample.map((sample, index) => (
                                                        <div key={sample.sampleId} className="sample-item">
                                                            <div>
                                                                <strong><u>Sample Type Description {index + 1}</u>:</strong>
                                                                <br />
                                                                <span>→ {sample.sampleTypeDescription}</span>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div><strong><u>Lot Batch No</u>:</strong> <br /> <span>→ {request.lotBatchNo}</span></div>
                                                    <div><strong><u>Sampler Name</u>:</strong> <br /> <span>→ {request.samplerName}</span></div>
                                                    <div><strong><u>Sample Source</u>:</strong> <br /> <span>→ {request.sampleSource}</span></div>
                                                    <div><strong><u>Production Date</u>:</strong> <br /> <span>→ {request.productionDate}</span></div>
                                                    <div><strong><u>Expiry Date</u>:</strong> <br /> <span>→ {request.expiryDate}</span></div>
                                                    <div><strong><u>Sampling Date</u>:</strong> <br /> <span>→ {request.samplingDate}</span></div>
                                            </div>
                                        )}
                                    </span>
                                    <div className="lineseparator-right">|</div>
                                    <span className="fortesting-save">
                                        <button 
                                            className="save-changes-btn"
                                            onClick={() => handleSaveChanges(request)}
                                        >
                                            Save Changes
                                        </button>
                                        {saveStatus && <div className="save-status">{saveStatus}</div>}
                                    </span>
                                </div> 
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="empty-2nd-container-1">
                            <img src={blue_logo_icon} alt="Blue Logo Icon" className="blue-logo-icon" />
                            <h1 className='msg-noreqres1'>There are no ongoing Microbiology tests</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForTestingMicrobio;