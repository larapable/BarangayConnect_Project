import React, { useState } from "react";
import UserIdInput from "./UserIdInput";

const UserInfoContainer = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserInfo = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/login-signup/getInfoByUsername/${username}`
      );
      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <UserIdInput onFetch={fetchUserInfo} />

      <div>
        {error && <div>Error: {error}</div>}

        {userData && (
          <div>
            <h2>User Information</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.fname}</p>
            <p>Last Name: {userData.lname}</p>
            <p>Address: {userData.address}</p>
            <p>Gender: {userData.gender}</p>
            <p>Date of Birth: {userData.dateOfBirth}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoContainer;
