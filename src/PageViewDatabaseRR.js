import React from "react";
import ViewDatabase from './Components/3_Receive_Release/ViewDatabaseRR';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageViewDatabaseRR() {
    return(
        <div>
            <ViewDatabase/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageViewDatabaseRR