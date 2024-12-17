import './Home.css';
import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom';
import white_logo_icon from '../Assets/WhiteLogo.png';
import submit_icon from '../Assets/Submit.png';
import track_icon from '../Assets/Track.png';
import guide_icon from '../Assets/Guide.png';
import { useEffect, useState } from 'react';

Userfront.init("jb7ywq8b");

const HomeClient = () => {
  const { userId } = useParams();
  const [userType, setUserType] = useState(null); // State to hold userType
  const navigate = useNavigate();

  const [clientDetails, setClientDetails] = useState({
    username: '',
  });

  useEffect(() => {
    const fetchClientDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}clientview/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setClientDetails(data);
            console.log(data);

        } catch (error) {
            console.error('Error fetching consents:', error);
        }
    };
    fetchClientDetails();
  }, [userId]);

  useEffect(() => {
    // Retrieve responseData from local storage
    const responseData = localStorage.getItem('responseData');
    
    // If responseData exists, parse it to get userType and userId
    if (responseData) {
      const [type] = responseData.split('/'); // Assuming responseData is like "client/8"
      setUserType(type);
    }
  }, []);

  const handleSubmit = () => {
    navigate(`/submit-a-request/${userId}`);
  };
  
  const handleTrack = () => {
    navigate(`/track-my-request/${userId}`);
  };
  
  const handleGuide = () => {
    navigate(`/guide/${userId}`);
  };

  return (
    <div className="home-client">
      <main className="main-content">
        <div className='web-title'>
          <div className="web-title-container">
            <img src={white_logo_icon} alt="white logo icon"/>
            <div className="web-titles">
              <p className="N">N</p>
              <p className="ational">ational</p>
              <p className="M">M</p>
              <p className="ational">eat</p>
              <p className="I">I</p>
              <p className="nspection">nspection</p>
              <p className="S">S</p>
              <p className="ervice">ervice</p>
            </div>
          </div>
        </div>

        <div className="announcement-box">
          <h2>Welcome to the Client Portal, {clientDetails.username}!</h2>
        </div>

        <div className="options-container">
          <div className="option-card" onClick={handleSubmit}>
            <img src={submit_icon} alt="Submit Request" />
            <h2>Submit a Request</h2>
          </div>
          <div className="option-card" onClick={handleTrack}>
            <img src={track_icon} alt="Track My Request" />
            <h2>Track My Request</h2>
          </div>
          <div className="option-card" onClick={handleGuide}>
            <img src={guide_icon} alt="Guide" />
            <h2>Guide</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeClient;
