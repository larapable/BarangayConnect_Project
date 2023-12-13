import { Button, Paper } from "@mui/material";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProfileList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/login-signup/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div
      style={{
        background: "#213555",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Header />
      </div>
      <div
        style={{
          background: `url('buildingbg.png')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            color: "white",
            margin: "60px",
          }}
        >
          PROFILE LIST:
        </h1>
        <div
          style={{
            height: "60vh", // Set a fixed height for the container
            overflowY: "auto", // Enable vertical scrolling
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {users
            .filter((user) => user.isDeleted == 0)
            .map((user) => (
              <Paper
                elevation={3}
                style={{
                  borderRadius: "10px",
                  margin: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  textAlign: "left",
                }}
                className="profile-list-paper"
                key={user.id}
              >
                <div style={{ margin: "0" }}>
                  <h2 style={{ margin: "0" }}>Profile {user.id}</h2>
                  <p style={{ fontSize: "16px", margin: "0", color: "red", fontWeight: "bold" }}>
                    {user.fname} {user.lname}
                  </p>
                </div>
                <Link to={`/profileList/${user.id}`} key={user.id}>
                  <Button
                    variant="contained"
                    style={{
                      margin: "10px",
                      color: "white",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "150px",
                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                  >
                    View Profile
                  </Button>
                </Link>
              </Paper>
            ))}
        </div>
      </div>
    </div>
  );
}