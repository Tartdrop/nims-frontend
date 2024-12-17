import React, { useState, useEffect } from 'react';
import './RequestDetails.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import white_line_submit from '../Assets/WhiteLineSubmit.png';

const RequestDetails = () => {
    const { userId, requestId } = useParams();
    const [sampleCategory, setSampleCategory] = useState('');
    const [otherTestingPurpose, setOtherTestingPurpose] = useState('');
    const [sampleTypeDescription, setSampleTypeDescription] = useState([""]);
    const [sampleId, setSampleId] = useState([]);
    const [lotBatchNo, setLotBatchNo] = useState("");
    const [sampleSource, setSampleSource] = useState("");
    const [productionDate, setProductionDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [samplingDate, setSamplingDate] = useState("");
    const [samplerName, setSamplerName] = useState("");
    const [testingPurpose, setTestingPurpose] = useState("");
        const [microbio, setMicrobio] = useState(false);
            const [standardPlateCount, setStandardPlateCount] = useState(false);
            const [staphylococcusAureus, setStaphylococcusAureus] = useState(false);
            const [salmonellaSp, setSalmonellaSp] = useState(false);
            const [campylobacter, setCampylobacter] = useState(false);
            const [cultureAndSensitivityTest, setCultureAndSensitivityTest] = useState(false);
                const [gramPositiveAst, setGramPositiveAst] = useState("");
                const [gramNegativeAst, setGramNegativeAst] = useState("");
            const [coliformCount, setColiformCount] = useState(false);
            const [eColi, setEColi] = useState(false);
            const [eColiAndeColi0O157, setEColiAndeColi0O157] = useState(false);
            const [yeastAndMolds, setYeastAndMolds] = useState(false);
        const [chem, setChem] = useState(false);
            const [microbial, setMicrobial] = useState(false);
                const [betaLactams, setBetaLactams] = useState(false);
                const [tetracyclines, setTetracyclines] = useState(false);
                const [sulfonamides, setSulfonamides] = useState(false);
                const [aminoglycosides, setAminoglycosides] = useState(false);
                const [macrolides, setMacrolides] = useState(false);
                const [quinolones, setQuinolones] = useState(false);
            const [elisa, setELISA] = useState(false);
                const [chloramphenicol, setChloramphenicol] = useState(false);
                const [nitrofuranAoz, setNitrofuranAoz] = useState(false);
                const [beta_agonists, setBeta_agonists] = useState(false);
                const [corticosteroids, setCorticosteroids] = useState(false);
                const [olaquindox, setOlaquindox] = useState(false);
                const [nitrufuranAmoz, setNitrufuranAmoz] = useState(false);
                const [stilbenes, setStilbenes] = useState(false);
                const [ractopamine, setRactopamine] = useState(false);
        const [molBio, setMolBio] = useState(false);
            const [speciesIdentification, setSpeciesIdentification] = useState(false);
                const [dog, setDog] = useState(false);
                const [cat, setCat] = useState(false);
                const [chicken, setChicken] = useState(false);
                const [buffalo, setBuffalo] = useState(false);
                const [cattle, setCattle] = useState(false);
                const [horse, setHorse] = useState(false);
                const [goat, setGoat] = useState(false);
                const [sheep, setSheep] = useState(false);
                const [swine, setSwine] = useState(false);
    const [requestData, setRequestData] = useState(null);

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}requests/pendingrequest/${requestId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRequestData(data);
                    setSampleCategory(data.sampleCategory || '');
                    setLotBatchNo(data.lotBatchNo || '');
                    setSampleSource(data.sampleSource || '');
                    setProductionDate(data.productionDate || '');
                    setExpiryDate(data.expiryDate || '');
                    setSamplingDate(data.samplingDate || '');
                    setSamplerName(data.samplerName || '');
                    setTestingPurpose(data.testingPurpose || '');
                    setOtherTestingPurpose(data.otherTestingPurpose || '');
                    setMicrobio(data.microbio || '');
                        setStandardPlateCount(data.standardPlateCount || '');
                        setStaphylococcusAureus(data.staphylococcusAureus || '');
                        setSalmonellaSp(data.salmonellaSp || '');
                        setCampylobacter(data.campylobacter || '');
                        setCultureAndSensitivityTest(data.cultureAndSensitivityTest || '');
                            setGramPositiveAst(data.gramPositiveAst || '');
                            setGramNegativeAst(data.gramNegativeAst || '');
                        setColiformCount(data.coliformCount || '');
                        setEColi(data.eColi || '');
                        setEColiAndeColi0O157(data.eColiAndeColi0O157 || '');
                        setYeastAndMolds(data.yeastAndMolds || '');
                    setChem(data.chem || '');
                        setMicrobial(data.microbial || '');
                            setBetaLactams(data.betaLactams || '');
                            setTetracyclines(data.tetracyclines || '');
                            setSulfonamides(data.sulfonamides || '');
                            setAminoglycosides(data.aminoglycosides || '');
                            setMacrolides(data.macrolides || '');
                            setQuinolones(data.quinolones || '');
                        setELISA(data.elisa || '');
                            setChloramphenicol(data.chloramphenicol || '');
                            setNitrofuranAoz(data.nitrofuranAoz || '');
                            setBeta_agonists(data.beta_agonists || '');
                            setCorticosteroids(data.corticosteroids || '');
                            setOlaquindox(data.olaquindox || '');
                            setNitrufuranAmoz(data.nitrufuranAmoz || '');
                            setStilbenes(data.stilbenes || '');
                            setRactopamine(data.ractopamine || '');
                    setMolBio(data.molBio || '');
                        setSpeciesIdentification(data.speciesIdentification || '');
                            setDog(data.dog || '');
                            setCat(data.cat || '');
                            setChicken(data.chicken || '');
                            setBuffalo(data.buffalo || '');
                            setCattle(data.cattle || '');
                            setHorse(data.horse || '');
                            setGoat(data.goat || '');
                            setSheep(data.sheep || '');
                            setSwine(data.swine || '');

                    const requestResponse = await fetch(`${process.env.REACT_APP_API_URL}request/${requestId}`);
                    if (requestResponse.ok) {
                        const requestData = await requestResponse.json();
                        
                        // Extract sampleIds and sampleTypeDescriptions
                        const sampleIds = requestData.map(item => item.sampleId);
                        const sampleDescriptions = requestData.map(item => item.sampleTypeDescription);
        
                        setSampleId(sampleId || []);
                        setSampleTypeDescription(sampleDescriptions || []);
                        
                        console.log('Sample IDs:', sampleIds);
                        console.log('Sample Descriptions:', sampleDescriptions);
                    } else {
                        console.error('Failed to fetch request data.');
                    }
                } else {
                    console.error('Failed to fetch request data');
                }
            } catch (error) {
                console.error('Error fetching request data:', error);
            }
        };

        fetchRequestData();
    }, [requestId]);

    const navigate = useNavigate();

    const handleApprove = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}requests/approve/${requestId}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                // Prepare the result data
                const resultData = {
                    testerId: parseInt(userId),
                    testerUsername: "",
                    chemElisaTestResults: [],
                    chemMicrobialTestResults: [],
                    molBioTestResults: [],
                    microbioTestResults: []
                };

                console.log('Sending resultData:', resultData);

                const responseResultGen = await fetch(`${process.env.REACT_APP_API_URL}createresult/${requestId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resultData)
                });

                if (responseResultGen.ok) {
                    navigate(`/request-control-number/${userId}/${requestId}`, { replace: true });
                } else {
                    const errorData = await responseResultGen.text();
                    console.error('Server error:', errorData);
                    throw new Error(errorData || 'Failed to create result');
                }
            } else {
                throw new Error('Failed to approve request');
            }
        } catch (error) {
            console.error('Error details:', error);
            alert('Error processing request. Please check console for details.');
        }
    };
    
    const handleReject = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}requests/reject/${requestId}`, {
                method: 'PUT'
            });
    
            if (response.ok) {
                // Handle successful rejection, e.g., show a success message, navigate to a different page
                alert('Request rejected successfully!');
                navigate(`/home/staff/${userId}`, { replace: true }); // Navigate to the staff dashboard
            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to reject request');
                alert('Error rejecting request. Please try again.');
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert('Error rejecting request. Please try again.');
        }
    };
    
    const handleRequestAdditionalInformation = () => {
        navigate(`/request-additional-info/${userId}/${requestId}`, { replace: true });
    };

    const handleSampleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...sampleTypeDescription];
        updatedDescriptions[index] = value;
        setSampleTypeDescription(updatedDescriptions);
    };

    const handleBack = () => {
        navigate(`/pending-requests/${userId}`, { replace: true });
    };

    return (
        <div className="submit-container-all">
            <div className="s-c-a-right">
                <div className="s-c-a-r-title">
                    <div className="s-c-a-r-t-back" onClick={handleBack}>
                    ←
                    </div>
                    Request Details
                    <div className="s-c-a-r-t-requestdetailspopup">
                        ⓘ
                        <div className="s-c-a-r-t-rdp-container">Press the back arrow to go the pending requests page!</div>
                    </div>
                </div>
                <div className='s-c-a-r-container-everything'>
                    <div className='s-c-a-r-c-e-scroll'>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">1. Purpose of Testing</div>
                            <div className="s-c-a-r-c-e-s-n-maincontainer">
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Monitoring" checked={testingPurpose === 'Monitoring'} readOnly/>
                                    <span className="checkmark">NMIS Monitoring Program</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Local_Trade" checked={testingPurpose === 'Local_Trade'} readOnly/>
                                    <span className="checkmark">For Local Trade</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Imported" checked={testingPurpose === 'Imported'} readOnly/>
                                    <span className="checkmark">Imported (COMI Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Export" checked={testingPurpose === 'Export'} readOnly/>
                                    <span className="checkmark">Export (OMIC Issuance)</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="purpose-choices" value="Complaint" checked={testingPurpose === 'Complaint'} readOnly/>
                                    <span className="checkmark">Complaint</span>
                                </label>
                                <div className="s-c-a-r-c-e-s-n-co-others">
                                    <label className="s-c-a-r-c-e-s-n-co-o-choices">
                                        <input 
                                            type="radio" 
                                            name="purpose-choices" 
                                            value="Others" 
                                            checked={testingPurpose === 'Others'}
                                            readOnly
                                        />
                                        <span className="checkmark">Others</span>
                                    </label>
                                </div>
                                <div className="s-c-a-r-c-e-s-n-container-others">
                                    <div className="s-c-a-r-c-e-s-n-co-others">
                                        <div className={`s-c-a-r-c-e-s-n-co-o-input ${testingPurpose === "Others" ? "show" : ""}`}>
                                            <input 
                                                type="text"
                                                value={otherTestingPurpose}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">2. Sample Category</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="sample-category-choices" value="Walk-in" checked={sampleCategory === 'Walk-in'} />
                                    <span className="checkmark">Walk-in</span>
                                </label>
                                <label className="s-c-a-r-c-e-s-n-co-choices">
                                    <input type="radio" name="sample-category-choices" value="Monitoring" checked={sampleCategory === 'Monitoring'} />
                                    <span className="checkmark">Monitoring</span>
                                </label>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">3. Sample Information</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                            <div className="s-c-a-r-c-e-s-n-co-input">
                                {sampleTypeDescription.length === 0 ? (
                                    <p>Loading sample inputs...</p>
                                ) : (
                                    <>
                                        <div>a. Sample Type/Description</div>
                                        <div className="s-c-a-r-c-e-s-n-co-i-samples">
                                            {sampleTypeDescription.map((_, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="text"
                                                        value={sampleTypeDescription[index] || ''}
                                                        onChange={(e) => handleSampleDescriptionChange(index, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>b. Lot/Batch Number</div>
                                    <input type="text" value={lotBatchNo} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>c. Sample Source</div>
                                    <input type="text" value={sampleSource} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>d. Production Date</div>
                                    <input type="date" value={productionDate} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>e. Expiry Date</div>
                                    <input type="date" value={expiryDate} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>f. Sampling Date</div>
                                    <input type="date" value={samplingDate} readOnly />
                                </div>
                                <div className='s-c-a-r-c-e-s-n-co-input'>
                                    <div>g. Sampler Name</div>
                                    <input type="text" value={samplerName} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className='s-c-a-r-c-e-s-numbered'>
                            <div className="s-c-a-r-c-e-s-n-title">4. Test Selection</div>
                            <div className="s-c-a-r-c-e-s-n-container">
                                {microbio && (
                                    <div className="s-c-a-r-c-e-s-n-co-microbio">
                                        <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                            <input 
                                                type="checkbox" 
                                                name="test-selection" 
                                                checked={microbio === true}
                                                disabled
                                            />
                                            <span className="checkmark"><b>Microbiological Tests</b> (7 - 16 Days)</span>
                                        </label>

                                            <div className="s-c-a-r-c-e-s-n-c-notes-req">
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample temperature must be 10°C or below
                                                </div>
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight must be 250g for meat, minimum
                                                </div>
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight must be 50g for cecal content or intact ceccum, minimum;
                                                </div>
                                            </div>

                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                {standardPlateCount && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={standardPlateCount === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Standard Plate Count/ Aerobic Plate Count (Php 150.00)</span>
                                                    </label>
                                                )}
                                                {staphylococcusAureus && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={staphylococcusAureus === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Staphylococcus aureus (Php 350.00)</span>
                                                    </label>
                                                )}
                                                {salmonellaSp && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={salmonellaSp === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Salmonella sp. (Php 350.00)</span>
                                                    </label>
                                                )}
                                                {campylobacter && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={campylobacter === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Campylobacter (Php 1,500.00)</span>
                                                    </label>
                                                )}
                                                {cultureAndSensitivityTest && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices-cst">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={cultureAndSensitivityTest === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Culture and Sensitivity Test (Php 1,500/panel)</span>
                                                    </label>
                                                )}
                                                {cultureAndSensitivityTest && (
                                                    <div className="s-c-a-r-c-e-s-n-co-t-subchoices">
                                                        <div className="s-c-a-r-c-e-s-n-co-t-s-container">
                                                            <div className="s-c-a-r-c-e-s-n-co-t-s-c-text">
                                                                <p>→</p>
                                                                <p>Gram Positive AST</p>
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                value={gramPositiveAst}
                                                                onChange={(e) => setGramPositiveAst(e.target.value)}
                                                                placeholder="Specify Gram Positive AST"
                                                            />
                                                        </div>
                                                        <div className="s-c-a-r-c-e-s-n-co-t-s-container">
                                                            <div className="s-c-a-r-c-e-s-n-co-t-s-c-text">
                                                                <p>→</p>
                                                                <p>Gram Negative AST</p>
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                value={gramNegativeAst}
                                                                onChange={(e) => setGramNegativeAst(e.target.value)}
                                                                placeholder="Specify Gram Negative AST"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {coliformCount && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={coliformCount === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Coliform Count (Php 150.00)</span>
                                                    </label>
                                                )}
                                                {eColi && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={eColi === true} 
                                                            disabled 
                                                        />
                                                        <span className="checkmark">E. Coli (Php 350.00)</span>
                                                    </label>
                                                )}
                                                {eColiAndeColi0O157 && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={eColiAndeColi0O157 === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">E. Coli & E. Coli O157;H7 (Php 700.00)</span>
                                                    </label>
                                                )}
                                                {yeastAndMolds && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="microbiological-choices" 
                                                            checked={yeastAndMolds === true} 
                                                            disabled
                                                        />
                                                        <span className="checkmark">Yeast and Molds (Php 300.00)</span>
                                                    </label>
                                                )}                                
                                            </div>
                                    </div>
                                )}

                                {chem && (
                                    <div className="s-c-a-r-c-e-s-n-co-chem">
                                        <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                            <input 
                                                type="checkbox" 
                                                name="test-selection" 
                                                checked={chem === true}
                                                disabled
                                            />
                                            <span className="checkmark"><b>Chemical/Veterinary Drug Residue Tests</b> (5 - 6 Days)</span>
                                        </label>

                                            <div className="s-c-a-r-c-e-s-n-c-notes-req">
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Samples should not include fat tissues
                                                </div>
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight must be 250g, minimum
                                                </div>
                                            </div>

                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                {microbial && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="chemical-container-choices"
                                                            checked={microbial === true}
                                                            disabled 
                                                        />
                                                        <span className="checkmark"><b>Microbial Inhibition Test</b> (5 Days)</span>
                                                    </label>
                                                )}
                                                {microbial && (
                                                    <div className="s-c-a-r-c-e-s-n-co-tests">
                                                        {betaLactams && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={betaLactams === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Beta-lactams (Php 375.00)</span>
                                                            </label>
                                                        )}
                                                        {tetracyclines && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={tetracyclines === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Tetracyclines (Php 375.00)</span>
                                                            </label>
                                                        )}
                                                        {sulfonamides && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={sulfonamides === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Sulfonamides (Php 375.00)</span>
                                                            </label>
                                                        )}
                                                        {aminoglycosides && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={aminoglycosides === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Aminoglycosides (Php 375.00)</span>
                                                            </label>
                                                        )}
                                                        {macrolides && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={macrolides === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Macrolides (Php 375.00)</span>
                                                            </label>
                                                        )}
                                                        {quinolones && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={quinolones === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Quinolones (Php 375.00)</span>
                                                            </label>
                                                        )}
                                                    </div>
                                                )}
                                                {elisa && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="chemical-container-choices" 
                                                            checked={elisa === true}
                                                            disabled
                                                        />
                                                        <span className="checkmark"><b>ELISA: Enzyme-Linked ImmunoSorbent Assay</b> (6 Days)</span>
                                                    </label>
                                                )}
                                                {elisa && (
                                                    <div className="s-c-a-r-c-e-s-n-co-tests">
                                                        {chloramphenicol && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={chloramphenicol === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Chloramphenicol (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {nitrofuranAoz && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={nitrofuranAoz === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Nitrofuran AOZ (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {beta_agonists && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={beta_agonists === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Beta-agonists (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {corticosteroids && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={corticosteroids === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Corticosteroids (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {olaquindox && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={olaquindox === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Olaquindox (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {nitrufuranAmoz && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={nitrufuranAmoz === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Nitrofuran AMOZ (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {stilbenes && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={stilbenes === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Stilbenes (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {ractopamine && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="chemical-choices" 
                                                                    checked={ractopamine === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Ractopamine (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                    </div>
                                )}

                                {molBio && (
                                    <div className="s-c-a-r-c-e-s-n-co-chem">
                                        <label className="s-c-a-r-c-e-s-n-co-choices-test">
                                            <input 
                                                type="checkbox" 
                                                name="test-selection" 
                                                checked={molBio === true}
                                                disabled
                                            />
                                            <span className="checkmark"><b>Molecular Biology Tests</b> (5 Days)</span>
                                        </label>

                                            <div className="s-c-a-r-c-e-s-n-c-notes-req">
                                                <div className="s-c-a-r-c-e-s-n-c-note"> → Average sample weight is 5g at minimum
                                                </div>
                                            </div>

                                            <div className="s-c-a-r-c-e-s-n-co-tests">
                                                {speciesIdentification && (
                                                    <label className="s-c-a-r-c-e-s-n-co-t-choices">
                                                        <input 
                                                            type="checkbox" 
                                                            name="molbio-container-choices" 
                                                            checked={speciesIdentification === true}
                                                            disabled
                                                        />
                                                        <span className="checkmark"><b>Species Identification</b></span>
                                                    </label>
                                                )}
                                                {speciesIdentification && (
                                                    <div className="s-c-a-r-c-e-s-n-co-tests">
                                                        {dog && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={dog === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Dog (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {cat && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={cat === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Cat (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {chicken && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={chicken === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Chicken (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {buffalo && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={buffalo === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Buffalo (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {cattle && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={cattle === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Cattle (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {horse && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={horse === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Horse (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {goat && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={goat === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Goat (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {sheep && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={sheep === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Sheep (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                        {swine && (
                                                            <label className="s-c-a-r-c-e-s-n-co-t-subtests">
                                                                <input 
                                                                    type="checkbox" 
                                                                    name="molbio-choices" 
                                                                    checked={swine === true} 
                                                                    disabled
                                                                />
                                                                <span className="checkmark">Swine (Php 1,500)</span>
                                                            </label>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='request-details-button'>
                            <button className="approve-review-text-button" onClick={handleApprove}>
                                Approve
                            </button>
                            <button className="reject-review-text-button" onClick={handleReject}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>         
        </div> 
    );
}

export default RequestDetails;