import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminBusinessChoices from "./AdminBusinessChoices";
import AdminBusinessForm from "./AdminBusinessForm";
import AdminBusinessView from "./AdminBusinessView";
import AdminBusinessEdit from "./AdminBusinessEdit";
import UserBusinessView from "./UserBusinessView";

const AdminAnnouncement = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminBusinessChoices />} />
        <Route path="/submitbusiness" element={<AdminBusinessForm />} />
        <Route path="/adminviewbusiness" element={<AdminBusinessView />} />
        <Route
          path="/admin/business/updateBusiness/:id"
          element={<AdminBusinessEdit />}
        />
        <Route path="/userviewbusiness" element={<UserBusinessView />} />
        <Route path="/backhome" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AdminAnnouncement;
