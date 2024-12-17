import React from "react";
import Guide from './Components/3_Client/Guide';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageGuide() {
    return(
        <div>
            <Guide/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageGuide