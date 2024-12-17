import './Home.css';
import Userfront from "@userfront/core";
import { useNavigate, useParams } from 'react-router-dom';
import white_logo_icon from '../Assets/WhiteLogo.png';
import pending_icon from '../Assets/PendingRequests.png';
import release_icon from '../Assets/ForRelease.png';
import database_icon from '../Assets/Database.png';
import { useEffect, useState } from 'react';

Userfront.init("jb7ywq8b");

const HomeRecRel = () => {
  const { userId } = useParams();
  const [userType, setUserType] = useState(null); // State to hold userType
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve responseData from local storage
    const responseData = localStorage.getItem('responseData');
    
    // If responseData exists, parse it to get userType
    if (responseData) {
      const [type] = responseData.split('/'); // Assuming responseData is like "staff/10"
      setUserType(type);
    }
  }, []);

  const handlePendingRequests = () => {
    navigate(`/pending-requests/${userId}`);
  };

  const handleForRelease = () => {
    navigate(`/for-release/${userId}`);
  };

  const handleDatabase = () => {
    navigate(`/receive-release-database/${userId}`);
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
          <h3>Welcome to the Receive and Release Portal, Staff!</h3>
        </div>

        <div className="options-container">
          <div className="option-card" onClick={handlePendingRequests}>
            <img src={pending_icon} alt="Pending Requests" />
            <h2>Pending Requests</h2>
          </div>
          <div className="option-card" onClick={handleForRelease}>
            <img src={release_icon} alt="For Release" />
            <h2>For Release</h2>
          </div>
          <div className="option-card" onClick={handleDatabase}>
            <img src={database_icon} alt="Database" />
            <h2>Database</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeRecRel;
