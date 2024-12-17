import React from "react";
import PendingRequest from './Components/3_Receive_Release/PendingRequest';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PagePendingRequest() {
    return(
        <div>
            <PendingRequest/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PagePendingRequest