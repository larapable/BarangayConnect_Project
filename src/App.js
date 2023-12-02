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
import EmergencyAlertChoices from "./Emergency/EmergencyAlertChoices";
import SubmitReportForm from "./Emergency/SubmitReportForm"
import EmergencyAlertList from "./Emergency/EmergencyAlertList"
import Requests from "./Request/Requests"
import ProfileView from "./Profile/ProfileView";
import ProfileEdit from "./Profile/ProfileEdit";
import BarangayDirectory from "./Directory/BarangayDirectory" 
import AdminCalendar from "./Calendar/AdminCalendar"
import EventList from "./Calendar/EventList"
import AdminRequest from "./Request/AdminRequest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<CommunityCalendar />} />
      <Route path="/announcements" element={<AnnUser />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/emergency" element={<EmergencyAlertChoices />} />
      <Route path="/submitreport" element={<SubmitReportForm />} />
      <Route path="/emergencyalertlist" element={<EmergencyAlertList />} />
      <Route path="/backhome" element={<Home />} />
      <Route path="/directory" element={<BarangayDirectory />} />
      <Route path="/business" element={<BLUser />} />
      <Route path="/announcements" element={<AnnUser />}/>
      <Route path="/forum" element={<Forum />}/>
      <Route path="/requests" element={<Requests />}/>
      <Route path="/business" element={<BLUser/>}/>
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/calendar" element={<CommunityCalendar />} />
      <Route path="/admincalendar" element={<AdminCalendar />} />
      <Route path="/adminrequest" element={<AdminRequest />} />
      <Route path="/admincalendar/eventlist" element={<EventList />} />
      <Route path="/" element={<EmergencyAlertChoices />} />
      
    </Routes>
  );
}

export default App;
