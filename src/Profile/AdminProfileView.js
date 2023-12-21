import React, { useState, useRef, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import AdminHeader from "../AdminHeader";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function AdminProfileView() {
  const uploadedImage = useRef(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/login-signup/getInfoById/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        setUserData(data);
        setError(null);
        console.log("Successfully fetched user information");

        // Check if the photoPath is null or empty
        if (data.photoPath) {
          // Set the image path to the uploadedImage ref
          const imagePath = `../${data.photoPath}`;
          uploadedImage.current.src = imagePath;
        } else {
          // Set the placeholder image to the uploadedImage ref
          uploadedImage.current.src = placeholderImage;
        }
      } catch (error) {
        setUserData(null);
        setError(error.message || "An error occurred");
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const placeholderImage = "../profile.png";
  const details = [
    "Username",
    "Password",
    "Email",
    "First Name",
    "Last Name",
    "Address",
    "Gender",
    "Birthday",
    "Mobile Number",
    "Marital Status",
    "Citizenship",
    "Religion",
    "Verified",
  ];
  // Sample values for each detail
  const data = [
    userData?.username || "",
    userData?.password || "",
    userData?.email || "",
    userData?.fname || "",
    userData?.lname || "",
    userData?.address || "",
    userData?.gender || "",
    userData?.dateOfBirth || "",
    userData?.mobileNumber || "",
    userData?.maritalStatus || "",
    userData?.citizenship || "",
    userData?.religion || "",
    userData?.isVerified ? "Yes" : "No",
  ];

  return (
    <div className="profile-screen">
      <div>
        <AdminHeader />
      </div>
      <Grid container style={{ flex: 1 }}>
        <div className="profilePicture-area">
          <div>
            <img
              ref={uploadedImage}
              className="image-style"
              src={uploadedImage.current?.src || placeholderImage}
              alt="Profile"
            />
            <div className="center-style">
              <p
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "50px",
                }}
              >
                {userData?.fname || ""} {userData?.lname || ""}
              </p>
            </div>
          </div>
        </div>
        <div className="details-area">
          <div className="center-style">
            <h1
              style={{
                fontSize: "50px",
                color: "#213555",
              }}
            >
              Hi There, Admin!
            </h1>
          </div>
          <div>
            {details.map((label, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ textAlign: "left", marginLeft: "250px" }}>
                  <p
                    style={{
                      color: "#213555",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    {label} :
                  </p>
                </div>
                <div style={{ textAlign: "center", marginRight: "250px" }}>
                  {label === "Password" ? (
                    <>
                      <p
                        style={{
                          color: "#213555",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginBottom: "0px",
                        }}
                      >
                        {showPassword
                          ? data[index]
                          : "*".repeat(data[index].length)}
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </p>
                    </>
                  ) : (
                    <p
                      style={{
                        color: "#213555",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginBottom: "10px",
                      }}
                    >
                      {data[index]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="center-style">
            <Link to={`/profileList/${userId}/editProfile`}>
              <Button
                variant="contained"
                style={{
                  color: "#FFFFFF",
                  background: "#213555",
                  borderRadius: "10px",
                  width: "150px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </div>
  );
}
