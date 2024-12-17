import React from 'react';
import './Guide.css';
import Userfront from "@userfront/core";
import  guideImg from '../Assets/guideImg.png';

Userfront.init("jb7ywq8b");

const Guide = () => {
    return (
        <div className="guide-all-container">
            <div className='guide-container'>
                <div className='guide-title'>Guide</div>
                <div className="guide-bg">
                    <div className="guide-1st-container">
                        <h1 className='msg-noreqres1'>Samples to be submitted for Laboratory Testing must be hygienically and individually packed, sealed and labelled, and with no unusual odor. To avoid sample deterioration during transport, place the sample inside an ice box with coolant or ice.</h1>
                        <br></br>
                        <h1 className='msg-noreqres1'>For the <b>Physical Tests</b> and <b>Microbiological Tests</b>, sample weight must be a minimum of 250g, and sample temperature must be 10℃ or below upon receipt.</h1>
                        <br></br>
                        <h1 className='msg-noreqres1'>For the <b>Chemical/Veterinary Drug Residue Test</b>, the average sample weight is 250 grams excluding fat tissues.</h1>
                        <br></br>
                        <h1 className='msg-noreqres1'>For the <b>Molecular Biology Test</b>, the average sample weight is a minimum of 5g.‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </h1>
                        
                        <h1 className='msg-noreqres1'>For laboratory tests that entail the <b>Issuance of Official Meat Inspection Certificate</b>, samples must comply with requirements of the importing country.</h1>
                        <br></br><br></br>
                        <table className="lab-test-table">
                            <tbody>
                                <tr>
                                    <th>LABORATORY TEST</th> <th>Laboratory Fees</th> <th>Processing Time</th>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>PHYSICAL TEST</b></td>
                                </tr>
                                <tr>
                                    <td>Organoleptic Test</td> <td>PHP 50.00</td> <td>2 Working Days</td>
                                </tr>
                                <tr>
                                    <td>pH</td> <td>PHP 35.00</td> <td>2 Working Days</td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>MICROBIOLOGICAL TEST</b></td>
                                </tr>
                                <tr>
                                    <td>Standard/Aerobic Plate Count</td> <td>PHP 150.00</td> <td>7 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Coliform Count</td> <td>PHP 150.00</td> <td>10 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Salmonella sp.</td> <td>PHP 350.00</td> <td>10 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Staphylococcus aureus</td> <td>PHP 350.00</td> <td>7 Working Days</td>
                                </tr>
                                <tr>
                                    <td>E.Coli</td> <td>PHP 350.00</td> <td>7 Working Days</td>
                                </tr>
                                <tr>
                                    <td>E. coli and E.Coli 0157:H7</td> <td>PHP 700.00</td> <td>15 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Campylobacter</td> <td>PHP 1,500.00</td> <td>10 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Yeast and Molds</td> <td>PHP 300.00</td> <td>7 Working Days</td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>PARASITOLOGICAL TEST</b></td>
                                </tr>
                                <tr>
                                    <td>Trichinella spp. Identification</td> <td>PHP 150.00</td> <td>3 Working Days</td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>CHEMICAL/VETERINARY DRUG RESIDUE TEST</b></td>
                                </tr>
                                <tr>
                                    <td>Beta-lactams (Microbial Inhibition Test)</td> <td>PHP 375.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Tetracyclines (Microbial Inhibition Test)</td> <td>PHP 375.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Sulfonamides (Microbial Inhibition Test)</td> <td>PHP 375.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Aminoglycosides (Microbial Inhibition Test)</td> <td>PHP 375.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Quinolones (Microbial Inhibition Test)</td> <td>PHP 375.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Macrolides (Microbial Inhibition Test)</td> <td>PHP 375.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Chloramphenicol (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Nitrofurans AOZ (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Nitrofurans AMOZ (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Olaquindox (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Beta-Agonists (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Stilbenes (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Corticosteroids (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Ractopamine (ELISA)</td> <td>PHP 1,500.00</td> <td>6 Working Days</td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><b>MOLECULAR BIOLOGY TEST</b> <br></br>(<i>Species Identification/DNA Test</i>)</td>
                                </tr>
                                <tr>
                                    <td>Goat</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Chicken</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Cattle</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Sheep</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Swine</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Horse</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Buffalo</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Dog</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                                <tr>
                                    <td>Cat</td> <td>PHP 1,500.00</td> <td>5 Working Days</td>
                                </tr>
                            </tbody>
                        </table>

                    <br></br>
                    <img src={guideImg} alt="Guidee" className="guideImg" />
                    <div className="spacing">.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Guide;
