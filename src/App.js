import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Components/0_Head_Foot_BG/Header";
import PageLogin from "./PageLogin";
import PageForget from "./PageForget";
    import PageTFAForgot from "./PageTFA-Forgot-Pass";
    import PageForgotNIS from "./PageNotInSystem";
    import PageChangePass from "./PageChangePass";
        import PagePasswordChanged from "./PagePasswordChanged";
import PageRegister from "./PageRegister";
import PageTFA from "./PageTFA";
import PageTFAVerify from "./PageTFA-Verify-Reg";
import PageRegisterTY from "./PageThankYou";
import PageHomeClient from "./PageHomeClient";
import PageHomeRecRel from "./PageHomeRecRel";
    import PageHomeTestingChem from "./PageHomeTestingChem";
    import PageHomeTestingMicrobio from "./PageHomeTestingMicrobio";
    import PageHomeTestingMolBio from "./PageHomeTestingMolBio";
import PageRequestSubmitted from "./PageRequestSubmitted"; 
import PageSubmitRequestNew from "./PageSubmitRequestNew";
import PageSubmitRequestReview from "./PageSubmitRequestReview";
import PageSubmitRequestResults from "./PageSubmitRequestResults";
import PageTrackMyRequest from "./PageTrackMyRequest";
import PagePendingRequest from "./PagePendingRequest";
import PageForReleaseList from "./PageForReleaseList";
import PageShowControlNumber from "./PageShowControlNumber";
import PageRequestAddInfo from "./PageRequestAddInfo";
import PageRequestDetailsNew from "./PageRequestDetailsNew";
    import PageViewDatabaseTChem from "./PageViewDatabaseTChem";
    import PageViewDatabaseTMicrobio from "./PageViewDatabaseTMicrobio";
    import PageViewDatabaseTMolBio from "./PageViewDatabaseTMolBio";
import PageViewDatabaseRR from "./PageViewDatabaseRR";
    import PageForTestingChem from "./PageForTestingChem";
    import PageForTestingMicrobio from "./PageForTestingMicrobio";
    import PageForTestingMolBio from "./PageForTestingMolBio";
import PageGuide from "./PageGuide";
    import PageTestResultsChem from "./PageTestResultsChem";
    import PageTestResultsMicrobio from "./PageTestResultsMicrobio";
    import PageTestResultsMolBio from "./PageTestResultsMolBio";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { user } from "@userfront/core";
import { clear } from "localforage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedUserType = localStorage.getItem("userType");
    
        console.log("Restored userId:", storedUserId);
        console.log("Restored userType:", storedUserType);
    
        if (storedUserId && storedUserType) {
            setIsLoggedIn(true);
            setUserId(storedUserId);
            setUserType(storedUserType);
        } else {
            setIsLoggedIn(false);
        }
    }, []);    

    const handleLogin = (id, type) => { 
        setUserId(null);
        setUserType(null);
        localStorage.clear();

        const storedUserId = localStorage.getItem("userId");
        const storedUserType = localStorage.getItem("userType");
    
        console.log("Restored userId:", storedUserId);
        console.log("Restored userType:", storedUserType);
    
        setIsLoggedIn(true);
        setUserId(id);
        setUserType(type);
        localStorage.setItem("userId", id);
        localStorage.setItem("userType", type);
    
        navigate(`/home/${type}/${id}`);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUserType(null);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <Header onLogout={handleLogout} userId={userId} userType={userType} />
            <Routes>
                {/* Public Routes - Accessible only when logged out */}
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                           <PageLogin />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/forget" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageForget />
                        </PublicRoute>
                    } 
                />
                    <Route 
                        path="/tfa-forgot-pass/:email" 
                        element={
                            <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                                <PageTFAForgot />
                            </PublicRoute>
                        } 
                    />
                        <Route 
                            path="/change-pass/:email" 
                            element={
                                <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                                    <PageChangePass />
                                </PublicRoute>
                            } 
                        />
                        <Route 
                            path="/password-changed" 
                            element={
                                <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                                    <PagePasswordChanged />
                                </PublicRoute>
                            } 
                        />
                    <Route 
                        path="/not-in-system" 
                        element={
                            <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                                <PageForgotNIS />
                            </PublicRoute>
                        } 
                    />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageRegister />
                        </PublicRoute>
                    } 
                />
                    <Route 
                        path="/tfaverify" 
                        element={
                            <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                                <PageTFAVerify />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/registered" 
                        element={
                            <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                                <PageRegisterTY />
                            </PublicRoute>
                        } 
                    />
                <Route 
                    path="/tfa/:username" 
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}>
                            <PageTFA onLogin={handleLogin} />
                        </PublicRoute>
                    } 
                />

                {/* Protected Routes - Accessible only when logged in */}
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} userType={userType} userId={userId}/>}>
                    {/* Client Routes */}
                    <Route path="/home/client/:userId" element={<PageHomeClient />} />
                    <Route path="/submit-a-request/:userId" element={<PageSubmitRequestNew />} />
                    <Route path="/request-review/:userId/:requestId" element={<PageSubmitRequestReview />} />
                    <Route path="/request-results/:userId/:requestId" element={<PageSubmitRequestResults />} />
                    <Route path="/request-submitted/:userId" element={<PageRequestSubmitted />} />
                    <Route path="/track-my-request/:userId" element={<PageTrackMyRequest />} />
                    <Route path="/guide/:userId" element={<PageGuide />} />
                    
                    {/* Staff Routes */}
                    <Route path="/home/staff/:userId" element={<PageHomeRecRel />} />
                    <Route path="/pending-requests/:userId" element={<PagePendingRequest />} />
                    <Route path="/request-control-number/:userId/:requestId" element={<PageShowControlNumber />} />
                    <Route path="/request-details/:userId/:requestId" element={<PageRequestDetailsNew />} />
                    <Route path="/approved/:userId" element={<PageShowControlNumber />} />
                    <Route path="/request-additional-info/:userId/:requestId" element={<PageRequestAddInfo />} />
                    <Route path="/for-release/:userId" element={<PageForReleaseList />} />
                    <Route path="/receive-release-database/:userId" element={<PageViewDatabaseRR />} />
                    
                    {/* Chem Tester Routes */}
                    <Route path="/home/chemtester/:userId" element={<PageHomeTestingChem />} />
                    <Route path="/for-testing-chem/:userId" element={<PageForTestingChem />} />
                    <Route path="/test-results-chem/:userId" element={<PageTestResultsChem />} />
                    <Route path="/testing-database-chem/:userId" element={<PageViewDatabaseTChem />} />

                    {/* Microbio Tester Routes */}
                    <Route path="/home/microbiotester/:userId" element={<PageHomeTestingMicrobio />} />
                    <Route path="/for-testing-microbio/:userId" element={<PageForTestingMicrobio />} />
                    <Route path="/test-results-microbio/:userId" element={<PageTestResultsMicrobio />} />
                    <Route path="/testing-database-microbio/:userId" element={<PageViewDatabaseTMicrobio />} />

                    {/* MolBio Tester Routes */}
                    <Route path="/home/molbiotester/:userId" element={<PageHomeTestingMolBio />} />
                    <Route path="/for-testing-molbio/:userId" element={<PageForTestingMolBio />} />
                    <Route path="/test-results-molbio/:userId" element={<PageTestResultsMolBio />} />
                    <Route path="/testing-database-molbio/:userId" element={<PageViewDatabaseTMolBio />} />
                </Route>

                {/* Catch-all Route */}
                <Route path="*" element={<PageLogin />} />
            </Routes>
        </>
    );
}

export default App;
