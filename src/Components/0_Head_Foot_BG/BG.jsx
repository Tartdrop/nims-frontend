import React from "react";
import bg from '../Assets/Background.png';

const BG = () => {
    React.useEffect(() => {
        // This effect sets the body to not be scrollable when the BG component is mounted
        document.body.style.overflow = 'hidden';
        return () => {
            // This resets the body to be scrollable again when the BG component unmounts
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div style={{
            position: 'fixed', 
            top: '-10px',
            left: '-10px',
            height: '110vh', 
            width: '108vw', 
            overflow: 'hidden', 
            zIndex: -1,
        }}>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(5px)',
                height: '100%',
                width: '100%',
            }} />
        </div>
    );
};

export default BG;
