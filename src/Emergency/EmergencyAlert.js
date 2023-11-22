import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmergencyAlertChoices from './EmergencyAlertChoices';
import SubmitReportForm from './SubmitReportForm';
import EmergencyAlertList from './EmergencyAlertList';
import Home from './Home';

const EmergencyAlert = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmergencyAlertChoices />} />
        <Route path="/submitreport" element={<SubmitReportForm />} />
        <Route path="/emergencyalertlist" element={<EmergencyAlertList />} />
        <Route path="/backhome" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default EmergencyAlert;
