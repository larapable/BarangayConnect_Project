// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import EmergencyAlertChoices from "./EmergencyAlertChoices";
import SubmitReportForm from "./SubmitReportForm";
import EmergencyAlertList from "./EmergencyAlertList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

        {/* Arziel */}
        <Route path="/emergencyalertchoices" element={<EmergencyAlertChoices />} />
        <Route path="/submitreport" element={<SubmitReportForm />} />
        <Route path="/emergencyalertlist" element={<EmergencyAlertList />} />
        <Route path="/backhome" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
