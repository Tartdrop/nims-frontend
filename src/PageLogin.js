import React from "react";
import Login from './Components/1_BeforeLogin/Login';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageLogin() {
    return(
        <div>
            <Login />
            <BG/>
            <Footer />
        </div>
    )
}

export default PageLogin