import React from "react";
import RequestSubmitted from './Components/1a_Messages/RequestSubmitted';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageRequestSubmitted() {
    return(
        <div>
            <RequestSubmitted/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageRequestSubmitted