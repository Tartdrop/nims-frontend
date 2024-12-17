import React from "react";
import ForTesting from './Components/3_Testing_MolBio/ForTestingMolBio';
import BG from './Components/0_Head_Foot_BG/BG';
import Footer from './Components/0_Head_Foot_BG/Footer';

function PageForTesting() {
    return(
        <div>
            <ForTesting/>
            <BG/>
            <Footer />
        </div>
    )
}

export default PageForTesting