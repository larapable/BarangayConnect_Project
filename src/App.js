// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
    </Routes>
  );
}

export default App;
