// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Start";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Home from "./Dashboard/Home";
import CommunityCalendar from "./Calendar/CommunityCalendar"
import BLUser from "./BusinessLocal/BLUser";
import AnnUser from "./Announcement/AnnUser"
import Forum from "./Forum/Forum"
//import EmergencyAlertChoices from "./EmergencyAlertChoices";
import Requests from "./Request/Requests"
import ProfileView from "./Profile/ProfileView";
import ProfileEdit from "./Profile/ProfileEdit";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<CommunityCalendar/>}/>
      <Route path="/announcements" element={<AnnUser />}/>
      <Route path="/forum" element={<Forum />}/>
      <Route path="/requests" element={<Requests />}/>
      {/* <Route path="/emergency" element={<EmergencyAlertChoices />}/> */}
      <Route path="/business" element={<BLUser/>}/>
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
    </Routes>
  );
}

export default App;
