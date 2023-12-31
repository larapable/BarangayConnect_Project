import { Button, Modal, Paper } from "@mui/material";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const handleSignup = async (event) => {
    // Check if required fields are filled
    if (
      !username ||
      !password ||
      !email ||
      !fname ||
      !lname ||
      !address ||
      !dateOfBirth ||
      !gender
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if password meets requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be a minimum of 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character (including period)."
      );
      return;
    }

    event.preventDefault();
    console.log("Submitting:", {
      username,
      password,
      email,
      fname,
      lname,
      address,
      dateOfBirth,
      gender,
    });

    try {
      const response = await fetch(
        "http://localhost:8080/login-signup/addInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
            fname,
            lname,
            address,
            dateOfBirth,
            gender,
          }),
        }
      );

      if (response.ok) {
        // Signup successful, set isAccountCreated to true
        setIsAccountCreated(true);
        setShowPopup(true);
        console.log("Signup successful");
      } else {
        // Handle signup error
        const data = await response.json();
        
        if (response.status === 500 && data.message){
          // Server error, handle username already exists
          alert(data.message);
        } else {
          // Fallback error message
          alert("An error occurred during signup. Please try again later.");
        }
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again later.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (isAccountCreated) {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="main-div">
        <div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <img
              src={"2logos.png"}
              alt="Logo"
              style={{ width: "800px", height: "auto" }}
            />
          </div>
          <div>
            <Paper elevation={3} className="paper-style">
              <div
                style={{
                  padding: "20px",
                  margin: "30px",
                  borderRight: "5px solid #213555",
                }}
              >
                <div style={{ marginRight: "23px" }}>
                  <h1 className="title">Username:</h1>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="long-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  <h1 className="title">Password:</h1>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="long-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <h1 className="title">Email:</h1>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="long-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "12px" }}>
                <div
                  style={{
                    marginTop: "50px",
                    display: "flex",
                  }}
                >
                  <h1 className="title">Firstname:</h1>
                  <h1 className="title" style={{ marginLeft: "70px" }}>
                    Lastname:
                  </h1>
                </div>
                <div>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="short-input"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    style={{ marginRight: "20px" }}
                  ></input>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="short-input"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  ></input>
                </div>

                <div>
                  <h1 className="title">Address:</h1>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Street Name, Barangay, City"
                    className="long-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                  <h1 className="title">Date of Birth:</h1>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    placeholder="MM/DD/YYYY"
                    className="long-input"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  ></input>
                  <h1 className="title">Gender:</h1>
                  <div style={{ textAlign: "center", color: "#213555" }}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="gender"
                        name="gender-radio"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <FormControlLabel
                          value="Male"
                          control={<Radio sx={{ color: "#213555" }} />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio sx={{ color: "#213555" }} />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </Paper>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleSignup}
                style={{
                  color: "#FFFFFF",
                  background: "#213555",
                  borderRadius: "10px",
                  width: "200px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Signup
              </Button>
            </div>
            {/* Popup Modal for Verification */}
            <Modal open={showPopup} onClose={handleClosePopup}>
              <div className="signup-popup">
                {/* Display input values for verification */}
                <h2>Please Wait for Verification</h2>
                <p>
                  We are currently verifying your information. <br></br>Please
                  wait for the email confirmation.
                  <br></br>
                  Thank you for your patience!
                </p>
                <Link to="/login">
                  {/* Close button */}
                  <Button
                    variant="contained"
                    onClick={handleClosePopup}
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "150px",
                      fontWeight: "bold",
                      marginTop: "20px",
                    }}
                  >
                    Done
                  </Button>
                </Link>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
