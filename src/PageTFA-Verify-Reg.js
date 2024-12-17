import React from "react";
import TFA from './Components/1_BeforeLogin/TFA-Verify-Reg';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageTFAVerify() {
    return(
        <div>
            <TFA/>
            <BG/>
            <Footer/>
        </div>
    )
}

export default PageTFAVerify