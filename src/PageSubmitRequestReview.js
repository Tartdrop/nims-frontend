import React from "react";
import RequestReview from './Components/3_Client/RequestReview';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageSubmitRequestReview() {
    return(
        <div>
            <RequestReview/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageSubmitRequestReview