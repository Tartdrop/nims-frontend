import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../3A_Testing/ForTesting.css';
import './ForTestingMolBio.css';
import blue_logo_icon from '../Assets/BlueLogo.png';

const ForTestingMolBio = () => {
    const { userId, requestId } = useParams();
    const [requests, setRequests] = useState([]);
    const [expandedSample, setExpandedSample] = useState(null);
    const [expandedMolBio, setExpandedMolBio] = useState(null);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [testResults, setTestResults] = useState({});
    const [saveStatus, setSaveStatus] = useState('');
    const [analysisDateUpdates, setAnalysisDateUpdates] = useState({});
    const [showPopup] = useState(false);
    const requestListRef = useRef(null);
    const [testRemarks, setTestRemarks] = useState({});
    const [activeButtons, setActiveButtons] = useState({}); // Track which button is active

    useEffect(() => {
        const requestList = requestListRef.current;
        if (!requestList) return;
    
        let isDown = false;
        let startY;
        let scrollTop;
    
        const handleMouseDown = (e) => {
            // Ignore dragging for input fields
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
        const userType = localStorage.getItem('userType');
        setUserType(userType);
        
        const fetchData = async () => {
            try {
                const requestsResponse = await fetch(`${process.env.REACT_APP_API_URL}requests/for-testing`);
                if (!requestsResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const requestsData = await requestsResponse.json();
                setRequests(requestsData);

                // Fetch test results
                const [microbioRes, chemElisaRes, chemMicrobialRes, molBioRes] = await Promise.all([
                    fetch(`${process.env.REACT_APP_API_URL}microbioTestResults`),
                    fetch(`${process.env.REACT_APP_API_URL}chemElisaTestResults`),
                    fetch(`${process.env.REACT_APP_API_URL}chemMicrobialTestResults`),
                    fetch(`${process.env.REACT_APP_API_URL}molBioTestResults`)
                ]);

                const [microbioData, chemElisaData, chemMicrobialData, molBioData] = await Promise.all([
                    microbioRes.json(),
                    chemElisaRes.json(),
                    chemMicrobialRes.json(),
                    molBioRes.json()
                ]);

                // Map results to requests
                const mappedResults = {};

                // Map microbio results
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

                // Map chem ELISA results
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

                // Map chem microbial results
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

                // Map mol bio results
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

    const handleRemarkChange = (requestId, testType, value) => {
        setTestRemarks(prev => ({
            ...prev,
            [requestId]: {
                ...prev[requestId],
                [`${testType}Remarks`]: value
            }
        }));
    };

    const toggleMolBio = (controlNumber) => {
        setExpandedMolBio(prevExpanded => 
            prevExpanded === controlNumber ? null : controlNumber
        );
    };

    const canAccessMolBio = (userType) => {
        return ['TESTER', 'MOLBIOTESTER'].includes(userType.toUpperCase());
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
    
            // Microbio
            if (request.microbio) {
                const microbioData = {};
                if (currentResults.eColi) {
                    microbioData.eColi = currentResults.eColi;
                    microbioData.eColiAnalysisDate = analysisDateUpdates[`${request.requestId}_eColi_analysis_date`] || null;
                }
                if (currentResults.eColiAndeColi0O157) {
                    microbioData.eColiAndeColi0O157 = currentResults.eColiAndeColi0O157;
                    microbioData.eColiAndeColi0O157AnalysisDate = analysisDateUpdates[`${request.requestId}_eColiAndeColi0O157_analysis_date`] || null;
                }
                if (currentResults.standardPlateCount) {
                    microbioData.standardPlateCount = currentResults.standardPlateCount;
                    microbioData.standardPlateCountAnalysisDate = analysisDateUpdates[`${request.requestId}_standardPlateCount_analysis_date`] || null;
                }
                if (currentResults.staphylococcusAureus) {
                    microbioData.staphylococcusAureus = currentResults.staphylococcusAureus;
                    microbioData.staphylococcusAureusAnalysisDate = analysisDateUpdates[`${request.requestId}_staphylococcusAureus_analysis_date`] || null;
                }
                if (currentResults.salmonellaSp) {
                    microbioData.salmonellaSp = currentResults.salmonellaSp;
                    microbioData.salmonellaSpAnalysisDate = analysisDateUpdates[`${request.requestId}_salmonellaSp_analysis_date`] || null;
                }
                if (currentResults.campylobacter) {
                    microbioData.campylobacter = currentResults.campylobacter;
                    microbioData.campylobacterAnalysisDate = analysisDateUpdates[`${request.requestId}_campylobacter_analysis_date`] || null;
                }
                if (currentResults.cultureAndSensitivityTest) {
                    microbioData.cultureAndSensitivityTest = currentResults.cultureAndSensitivityTest;
                    microbioData.cultureAndSensitivityTestAnalysisDate = analysisDateUpdates[`${request.requestId}_cultureAndSensitivityTest_analysis_date`] || null;
                }
                if (currentResults.coliformCount) {
                    microbioData.coliformCount = currentResults.coliformCount;
                    microbioData.coliformCountAnalysisDate = analysisDateUpdates[`${request.requestId}_coliformCount_analysis_date`] || null;
                }
                if (currentResults.yeastAndMolds) {
                    microbioData.yeastAndMolds = currentResults.yeastAndMolds;
                    microbioData.yeastAndMoldsAnalysisDate = analysisDateUpdates[`${request.requestId}_yeastAndMolds_analysis_date`] || null;
                }
    
                if (Object.keys(microbioData).length > 0) {
                    console.log('Sending microbio data:', microbioData);
                    const response = await fetch(`${process.env.REACT_APP_API_URL}microbioTestResults/${sampleId}`, {
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
    
            // Chem (ELISA and microbial)
            if (request.chem) {
                const elisaData = {};
                if (currentResults.chloramphenicol) {
                    elisaData.chloramphenicol = currentResults.chloramphenicol;
                    elisaData.chloramphenicolAnalysisDate = analysisDateUpdates[`${request.requestId}_chloramphenicol_analysis_date`] || null;
                }
                if (currentResults.nitrofuranAoz) {
                    elisaData.nitrofuranAoz = currentResults.nitrofuranAoz;
                    elisaData.nitrofuranAozAnalysisDate = analysisDateUpdates[`${request.requestId}_nitrofuranAoz_analysis_date`] || null;
                }
                if (currentResults.beta_agonists) {
                    elisaData.beta_agonists = currentResults.beta_agonists;
                    elisaData.beta_agonistsAnalysisDate = analysisDateUpdates[`${request.requestId}_beta_agonists_analysis_date`] || null;
                }
                if (currentResults.corticosteroids) {
                    elisaData.corticosteroids = currentResults.corticosteroids;
                    elisaData.corticosteroidsAnalysisDate = analysisDateUpdates[`${request.requestId}_corticosteroids_analysis_date`] || null;
                }
                if (currentResults.olaquindox) {
                    elisaData.olaquindox = currentResults.olaquindox;
                    elisaData.olaquindoxAnalysisDate = analysisDateUpdates[`${request.requestId}_olaquindox_analysis_date`] || null;
                }
                if (currentResults.nitrufuranAmoz) {
                    elisaData.nitrufuranAmoz = currentResults.nitrufuranAmoz;
                    elisaData.nitrufuranAmozAnalysisDate = analysisDateUpdates[`${request.requestId}_nitrufuranAmoz_analysis_date`] || null;
                }
                if (currentResults.stilbenes) {
                    elisaData.stilbenes = currentResults.stilbenes;
                    elisaData.stilbenesAnalysisDate = analysisDateUpdates[`${request.requestId}_stilbenes_analysis_date`] || null;
                }
                if (currentResults.ractopamine) {
                    elisaData.ractopamine = currentResults.ractopamine;
                    elisaData.ractopamineAnalysisDate = analysisDateUpdates[`${request.requestId}_ractopamine_analysis_date`] || null;
                }
    
                if (Object.keys(elisaData).length > 0) {
                    console.log('Sending ELISA data:', elisaData);
                    const response = await fetch(`${process.env.REACT_APP_API_URL}chemTestElisaResults/${sampleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(elisaData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to save ELISA results: ${errorText}`);
                    }
                }
    
                const chemMicrobialData = {};
                if (currentResults.betaLactams) {
                    chemMicrobialData.betaLactams = currentResults.betaLactams;
                    chemMicrobialData.betaLactamsAnalysisDate = analysisDateUpdates[`${request.requestId}_betaLactams_analysis_date`] || null;
                }
                if (currentResults.tetracyclines) {
                    chemMicrobialData.tetracyclines = currentResults.tetracyclines;
                    chemMicrobialData.tetracyclinesAnalysisDate = analysisDateUpdates[`${request.requestId}_tetracyclines_analysis_date`] || null;
                }
                if (currentResults.sulfonamides) {
                    chemMicrobialData.sulfonamides = currentResults.sulfonamides;
                    chemMicrobialData.sulfonamidesAnalysisDate = analysisDateUpdates[`${request.requestId}_sulfonamides_analysis_date`] || null;
                }
                if (currentResults.aminoglycosides) {
                    chemMicrobialData.aminoglycosides = currentResults.aminoglycosides;
                    chemMicrobialData.aminoglycosidesAnalysisDate = analysisDateUpdates[`${request.requestId}_aminoglycosides_analysis_date`] || null;
                }
                if (currentResults.macrolides) {
                    chemMicrobialData.macrolides = currentResults.macrolides;
                    chemMicrobialData.macrolidesAnalysisDate = analysisDateUpdates[`${request.requestId}_macrolides_analysis_date`] || null;
                }
                if (currentResults.quinolones) {
                    chemMicrobialData.quinolones = currentResults.quinolones;
                    chemMicrobialData.quinolonesAnalysisDate = analysisDateUpdates[`${request.requestId}_quinolones_analysis_date`] || null;
                }
    
                if (Object.keys(chemMicrobialData).length > 0) {
                    console.log('Sending chemical microbial data:', chemMicrobialData);
                    const response = await fetch(`${process.env.REACT_APP_API_URL}chemMicrobialTestResults/${sampleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(chemMicrobialData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to save chemical microbial results: ${errorText}`);
                    }
                }
            }
    
            // MolBio remains unchanged
            if (request.molBio) {
                const molBioData = {};
                if (currentResults.dog) {
                    molBioData.dog = currentResults.dog;
                    molBioData.dogAnalysisDate = analysisDateUpdates[`${request.requestId}_dog_analysis_date`] || null;
                }
                if (currentResults.cat) {
                    molBioData.cat = currentResults.cat;
                    molBioData.catAnalysisDate = analysisDateUpdates[`${request.requestId}_cat_analysis_date`] || null;
                }
                if (currentResults.chicken) {
                    molBioData.chicken = currentResults.chicken;
                    molBioData.chickenAnalysisDate = analysisDateUpdates[`${request.requestId}_chicken_analysis_date`] || null;
                }
                if (currentResults.buffalo) {
                    molBioData.buffalo = currentResults.buffalo;
                    molBioData.buffaloAnalysisDate = analysisDateUpdates[`${request.requestId}_buffalo_analysis_date`] || null;
                }
                if (currentResults.cattle) {
                    molBioData.cattle = currentResults.cattle;
                    molBioData.cattleAnalysisDate = analysisDateUpdates[`${request.requestId}_cattle_analysis_date`] || null;
                }
                if (currentResults.horse) {
                    molBioData.horse = currentResults.horse;
                    molBioData.horseAnalysisDate = analysisDateUpdates[`${request.requestId}_horse_analysis_date`] || null;
                }
                if (currentResults.goat) {
                    molBioData.goat = currentResults.goat;
                    molBioData.goatAnalysisDate = analysisDateUpdates[`${request.requestId}_goat_analysis_date`] || null;
                }
                if (currentResults.sheep) {
                    molBioData.sheep = currentResults.sheep;
                    molBioData.sheepAnalysisDate = analysisDateUpdates[`${request.requestId}_sheep_analysis_date`] || null;
                }
                if (currentResults.swine) {
                    molBioData.swine = currentResults.swine;
                    molBioData.swineAnalysisDate = analysisDateUpdates[`${request.requestId}_swine_analysis_date`] || null;
                }
    
                if (Object.keys(molBioData).length > 0) {
                    console.log('Sending mol bio data:', molBioData);
                    const response = await fetch(`${process.env.REACT_APP_API_URL}molBioTestResults/${sampleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(molBioData),
                    });
    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Failed to save mol bio results: ${errorText}`);
                    }
                }
            }
    
            alert('Changes saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes: ' + error.message);
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const handlePositiveClick = (requestId, testType) => {
        handleRemarkChange(requestId, testType, 'positive');
        setActiveButtons((prevState) => ({
            ...prevState,
            [requestId]: {
                ...prevState[requestId],
                [testType]: 'positive', // Set the testType for this requestId to 'positive'
            },
        }));
    };
    
    const handleNegativeClick = (requestId, testType) => {
        handleRemarkChange(requestId, testType, 'negative');
        setActiveButtons((prevState) => ({
            ...prevState,
            [requestId]: {
                ...prevState[requestId],
                [testType]: 'negative', // Set the testType for this requestId to 'negative'
            },
        }));
    };

    const isActive = (requestId, testType, status) => 
        activeButtons[requestId]?.[testType] === status;

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
                            Molecular Biology Tests
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

                    {requests.filter((request) => request.molBio).length > 0 ? (
                        <div className="fortesting-list" ref={requestListRef}>
                        {requests
                                .filter((request) => request.molBio) // Filter out requests without `chem`
                                .map((request, index) => (
                            <div key={index} className="request-item">
                                <div className="fortesting-header">
                                    <span className="fortesting-controlnumber">{request.controlNumber}</span>
                                    <div className="lineseparator-left">|</div>
                                    <span className="fortesting-tests">
                                        {request.molBio ? (
                                            canAccessMolBio(userType) ? (
                                                <button 
                                                    className="test-btn" 
                                                    onClick={() => toggleMolBio(request.controlNumber)}
                                                >
                                                    Show Molecular Biology Tests
                                                </button>
                                            ) : (
                                                <div>
                                                    <button 
                                                        className="test-btn-disabled" 
                                                        disabled
                                                        title="You don't have permission to access this section"
                                                    >
                                                        Show Molecular Biology Tests
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            "no testing...."
                                        )}
                                        {expandedMolBio === request.controlNumber && (
                                            <div className="molbio-list">
                                                {request.dog && (
                                                    <div className="test-result-item-3">
                                                        <strong>Dog:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.dog || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'dog', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'dog', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'dog', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'dog', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'dog', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'dog')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'dog', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_dog_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'dog', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.cat && (
                                                    <div className="test-result-item-3">
                                                        <strong>Cat:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.cat || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'cat', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'cat', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'cat', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'cat', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'cat', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'cat')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'cat', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button> 
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_cat_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'cat', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.chicken && (
                                                    <div className="test-result-item-3">
                                                        <strong>Chicken:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.chicken || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'chicken', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'chicken', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'chicken', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'chicken', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'chicken', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'chicken')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'chicken', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_chicken_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'chicken', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.buffalo && (
                                                    <div className="test-result-item-3">
                                                        <strong>Buffalo:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.buffalo || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'buffalo', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'buffalo', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'buffalo', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'buffalo', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'buffalo', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'buffalo')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'buffalo', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_buffalo_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'buffalo', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.cattle && (
                                                    <div className="test-result-item-3">
                                                        <strong>Cattle:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.cattle || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'cattle', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'cattle', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'cattle', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'cattle', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'cattle', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'cattle')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'cattle', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_cattle_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'cattle', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.horse && (
                                                    <div className="test-result-item-3">
                                                        <strong>Horse:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.horse || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'horse', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'horse', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'horse', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'horse', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'horse', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'horse')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'horse', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_horse_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'horse', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.goat && (
                                                    <div className="test-result-item-3">
                                                        <strong>Goat:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.goat || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'goat', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'goat', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'goat', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'goat', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'goat', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'goat')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'goat', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_goat_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'goat', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.sheep && (
                                                    <div className="test-result-item-3">
                                                        <strong>Sheep:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.sheep || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'sheep', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'sheep', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'sheep', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'sheep', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'sheep', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'sheep')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'sheep', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_sheep_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'sheep', e.target.value)}
                                                                className="date-picker"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {request.swine && (
                                                    <div className="test-result-item-3">
                                                        <strong>Swine:</strong>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={testResults[request.requestId]?.swine || ''}
                                                                onChange={(e) => handleTestResultChange(request.requestId, 'swine', e.target.value)}
                                                                className="test-result-input"
                                                            />
                                                            <button
                                                                className={`positive ${isActive(request.requestId, 'swine', 'positive') ? 'active' : ''}`}
                                                                onClick={() => handlePositiveClick(request.requestId, 'swine', 'positive')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'swine', 'positive')
                                                                        ? '#2BC192'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={`negative ${isActive(request.requestId, 'swine', 'negative') ? 'active' : ''}`}
                                                                onClick={() => handleNegativeClick(request.requestId, 'swine')}
                                                                style={{
                                                                    backgroundColor: isActive(request.requestId, 'swine', 'negative')
                                                                        ? '#E85557'
                                                                        : '#5f5f5f71',
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="date"
                                                                value={analysisDateUpdates[`${request.requestId}_swine_analysis_date`] || ''}
                                                                onChange={(e) => handleAnalysisDateChange(request.requestId, 'swine', e.target.value)}
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
                                            Save
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
                            <h1 className='msg-noreqres1'>There are no ongoing Molecular Biology tests. </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForTestingMolBio;