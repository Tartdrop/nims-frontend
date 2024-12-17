import React from "react";
import RequestResults from './Components/3_Client/RequestResults';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageSubmitRequestResults() {
    return(
        <div>
            <RequestResults/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageSubmitRequestResults