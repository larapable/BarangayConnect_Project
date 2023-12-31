// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Start";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Home from "./Dashboard/Home";
import CommunityCalendar from "./Calendar/CommunityCalendar";
import Forum from "./Forum/Forum";
import EmergencyAlertChoices from "./Emergency/EmergencyAlertChoices";
import SubmitReportForm from "./Emergency/SubmitReportForm";
import EmergencyAlertList from "./Emergency/EmergencyAlertList";
import Requests from "./Request/Requests";
import ProfileView from "./Profile/ProfileView";
import ProfileEdit from "./Profile/ProfileEdit";
import AdminIncidentReport from "./AdminEmergency/AdminIncidentReport";
import AdminEmergencyHotline from "./AdminEmergency/AdminEmergencyHotline";
import AdminDirectoryList from "./AdminDirectory/AdminDirectoryList";
import BarangayDirectory from "./Directory/BarangayDirectory";
import AdminCalendar from "./Calendar/AdminCalendar";
import EventList from "./Calendar/EventList";
import AdminProfileList from "./Profile/AdminProfileList";
import AdminProfileView from "./Profile/AdminProfileView";
import AdminProfileEdit from "./Profile/AdminProfileEdit";
import AdminRequest from "./Request/AdminRequest"
import AdminAnnouncementChoices from "./Announcementss/AdminAnnouncementChoices";
import AdminAnnouncementForm from "./Announcementss/AdminAnnouncementForm";
import AdminAnnouncementView from "./Announcementss/AdminAnnouncementView";
import AdminAnnouncementEdit from "./Announcementss/AdminAnnouncementEdit";
import UserAnnouncementView from "./Announcementss/UserAnnouncementView"
import AdminBusinessChoices from "./Business/AdminBusinessChoices";
import AdminBusinessForm from "./Business/AdminBusinessForm";
import AdminBusinessEdit from "./Business/AdminBusinessEdit";
import AdminBusinessView from "./Business/AdminBusinessView";
import UserBusinessView from "./Business/UserBusinessView";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminEmergencyAlertChoices from "./AdminEmergency/AdminEmergencyAlertChoices";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<CommunityCalendar />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/emergency" element={<EmergencyAlertChoices />} />

      <Route path="/submitreport" element={<SubmitReportForm />} />
      <Route path="/emergencyalertlist" element={<EmergencyAlertList />} />
      <Route path="/backhome" element={<Home />} />
      <Route path="/directory" element={<BarangayDirectory />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />

      <Route path="/admincalendar" element={<AdminCalendar />} />
      <Route path="/admincalendar/eventList" element={<EventList />} />

      <Route path="/adminemergency" element={<AdminEmergencyAlertChoices />} />
      <Route path="/adminincidentreport" element={<AdminIncidentReport />} />
      <Route path="/adminemergencyhotline" element={<AdminEmergencyHotline />} />

      <Route path="/admindirectorylist" element={<AdminDirectoryList />} />

      <Route path="/profileList" element={<AdminProfileList />} />
      <Route path="/profileList/:userId" element={<AdminProfileView />} />
      <Route path="/profileList/:userId/editProfile" element={<AdminProfileEdit />} />

      <Route path="/announcement" element={<AdminAnnouncementChoices />} />
      <Route path="/submitannouncement" element={<AdminAnnouncementForm />} />
      <Route path="/adminviewannouncement" element={<AdminAnnouncementView />} />
      <Route path="/admin/announcements/updateAnnouncement/:id" element={<AdminAnnouncementEdit />} />

      <Route path="/userviewannouncement" element={<UserAnnouncementView />} />

      <Route path="/adminrequest" element={<AdminRequest/>}/>

      <Route path="/business" element={<AdminBusinessChoices />} />
      <Route path="/submitbusiness" element={<AdminBusinessForm />} />
      <Route path="/adminviewbusiness" element={<AdminBusinessView />} />
      <Route path="/admin/business/updateBusiness/:id" element={<AdminBusinessEdit />} />
      <Route path="/userviewbusiness" element={<UserBusinessView />} />

      <Route path="/admindashboard" element={<AdminDashboard/>} />
    </Routes>
  );
}

export default App;