import React, { useState, useRef } from "react";
import { Button, Grid } from "@mui/material";
import Header from "../Header";
import "./Profile.css";

export default function AdminProfileView () {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const placeholderImage = "profile.png"; // Replace with your placeholder image URL or local path
  const details = [
    "Username",
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
  ];
  // Sample values for each detail
  const values = [
    "larsss01 ",
    "larajane@gmail.com",
    "Lara",
    "Jane",
    "Jugan Tisa, Cebu, Philippines",
    "Female",
    "January 1, 1990",
    "09999999999",
    "Married",
    "Filipino",
    "Roman Catholic",
  ];
  return (
    <div className="profile-screen">
      <div>
        <Header />
      </div>
      <Grid container style={{ flex: 1 }}>
        <div
          className="profilePicture-area"
        >
          <div>
            <img
              ref={uploadedImage}
              className="image-style"
              src={uploadedImage.current?.src || placeholderImage}
              alt="Profile"
            />
            <div
              style={{
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "50px",
                }}
              >
                Lara Jane
              </p>
            </div>
          </div>
        </div>
        <div
          className="details-area"
        >
          <div className="center-style">
            <h1
              style={{
                fontSize: "50px",
                color: "#213555",
              }}
            >
              Hi There, Tisaanon!
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
                  <p
                    style={{
                      color: "#213555",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    {values[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="center-style">
            <Button
              variant="contained"
              style={{
                color: "#FFFFFF",
                background: "#213555",
                borderRadius: "10px",
                width: "150px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
}
