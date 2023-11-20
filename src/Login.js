import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import Signup from "./Signup";
import Home from "../Home";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(false);


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Submitting:", {
      username,
      password,
    });

    try {
      const response = await fetch(
        "http://localhost:8080/login-signup/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        // Login successful
        setIsHomeVisible(true);
        console.log("Login successful");
      } else {
        // Handle login error
        const data = await response.json();
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Your account may not be verified or there is an error occurred during Login. Please try again later.");
    }
  };

  const handleSignupClick = () => {
    setIsSignupVisible(true);
  };

  return (
    <div>
      {isSignupVisible ? (
        <Signup />
      ) : isHomeVisible ? (
        <Home />
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              background: "#829CA6",
              width: "60%",
              height: "100vh",
              borderRight: "3px solid #213555",
            }}
          >
            <div>
              <img
                src={"headerlogo.png"}
                alt="Logo"
                className="top-left-icon"
              />
            </div>
            <div style={{ marginTop: "18%" }}>
              <div style={{ textAlign: "center", color: "#FFFFFF" }}>
                <h1 className="header">Login to your account</h1>
              </div>
              <div style={{ marginLeft: "25%", color: "#FFFFFF" }}>
                <h2>Enter username:</h2>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: "550px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                ></input>
                <h2>Enter password:</h2>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "550px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                ></input>
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  style={{
                    color: "#FFFFFF",
                    background: "#213555",
                    borderRadius: "10px",
                    width: "200px",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              width: "40%",
              textAlign: "center",
            }}
          >
            <div style={{ marginTop: "38%", color: "#213555" }}>
              <h1 className="header">New Here?</h1>
              <p style={{ fontSize: "30px" }}>
                Sign up to stay updated <br></br>
                in the community
              </p>
              <Button
                variant="contained"
                onClick={handleSignupClick}
                style={{
                  color: "#FFFFFF",
                  background: "#213555",
                  borderRadius: "10px",
                  width: "200px",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
