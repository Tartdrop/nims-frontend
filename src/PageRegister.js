import React from "react";
import Register from './Components/1_BeforeLogin/Register';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageRegister() {
    return(
        <div>
            <Register/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageRegister