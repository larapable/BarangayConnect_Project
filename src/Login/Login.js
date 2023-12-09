import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Submitting:", {
      username,
      password,
    });

    if (!username || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login-signup/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful
        console.log("Login successful");
        // Store username in localStorage
        const userObj = await response.json();
        localStorage.setItem("user", JSON.stringify(userObj));
        
        navigate("/home");
      } else {
        // Handle login error
        const data = await response.json();
        console.error("Login failed");
        alert("An error occurred during login. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        "Your account does not exist or your account is not verified. Please check your email for verification instructions."
      );
    }
  };

  return (
    <div>
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
            <img src={"headerlogo.png"} alt="Logo" className="top-left-icon" />
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
              <Link to="/home">
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
              </Link>
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
            <Link to="/signup">
              <Button
                variant="contained"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

