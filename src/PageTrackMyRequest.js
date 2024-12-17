import React from "react";
import TrackMyRequest from './Components/3_Client/TrackMyRequest';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageTrackMyRequest() {
    return(
        <div>
            <TrackMyRequest/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageTrackMyRequest