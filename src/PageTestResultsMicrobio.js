import React from "react";
import TestResults from './Components/3_Testing_Microbio/TestResultsMicrobio';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageTestResults() {
    return(
        <div>
            <TestResults/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageTestResults