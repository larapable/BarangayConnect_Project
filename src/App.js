// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Login/Start";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Home from "./Home";
import ProfileView from "./Profile/ProfileView";
import ProfileEdit from "./Profile/ProfileEdit";
import CommunityCalendar from "./Calendar/CommunityCalendar";
// import Forum from "./Forum";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/calendar" element={<CommunityCalendar />} />
      {/* <Route path="/forum" element={<Forum />} /> */}
    </Routes>
  );
}

export default App;
