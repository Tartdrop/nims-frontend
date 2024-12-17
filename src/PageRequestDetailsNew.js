import React from "react";
import RequestDetailsNew from './Components/3_Receive_Release/RequestDetailsNew';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageRequestDetails() {
    return(
        <div>
            <RequestDetailsNew/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageRequestDetails