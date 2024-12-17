import React from "react";
import ForReleaseList from './Components/3_Receive_Release/ForReleaseList';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageForReleaseList() {
    return(
        <div>
            <ForReleaseList/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageForReleaseList