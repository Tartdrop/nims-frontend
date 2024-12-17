import React from "react";
import HomeClient from './Components/2_HomePages/HomeClient';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageHomeClient() {
    return(
        <div>
            <HomeClient/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageHomeClient