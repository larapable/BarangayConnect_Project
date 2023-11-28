import React, { useState, useRef, useEffect } from "react";
import { Button, Grid, Input } from "@mui/material";
import Header from "../Header";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function ProfileEdit() {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [religion, setReligion] = useState("");

  const [selectedImage, setSelectedImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const username = localStorage.getItem("username");
  const placeholderImage = "../profile.png";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/login-signup/getInfoByUsername/${username}`,
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
        console.log("Image URL:", data.photoPath);
      } catch (error) {
        setUserData(null);
        setError(error.message || "An error occurred");
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserProfile();
  }, [username]);

  // Sample values for each detail
  const data = [
    userData?.username || "",
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
  ];

  const editableFields = [
    "Mobile Number",
    "Marital Status",
    "Citizenship",
    "Religion",
  ];
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

  const maritalStatusOptions = ["", "Single", "Married", "Divorced", "Widowed"];
  const citizenshipOptions = [
    "",
    "Filipino",
    "American",
    "Chinese",
    "Japanese",
    "Korean",
    "Indian",
    "British",
    "Canadian",
    "Australian",
    "Black American",
    "Other",
  ];
  const religionOptions = [
    "",
    "Roman Catholic",
    "Islam",
    "Protestant",
    "Iglesia ni Cristo",
    "Seventh Day Adventist",
    "Jehovah's Witness",
    "Bible Baptist Church",
    "Born Again Christian",
    "Philippine Independent Church",
    "Other",
  ];

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  // const handleImageChange = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", selectedFile); // selectedFile is the file selected by the user

  //     const response = await fetch(
  //       `http://localhost:8080/login-signup/uploadImage/${username}`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Success:", data);
  //     // Update the user data in your application...
  //     setSelectedImage(data.photoPath);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleFinishClick = async (event) => {
    console.log("Finish button clicked");

    // Check if all fields have values
    if (!mobileNumber || !maritalStatus || !citizenship || !religion) {
      alert("All fields must have values");
      event.preventDefault();
      return;
    }

    // Image upload
    try {
      const formData = new FormData();
      formData.append("image", selectedFile); // selectedFile is the file selected by the user

      const response = await fetch(
        `http://localhost:8080/login-signup/uploadImage/${username}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      localStorage.setItem("photoPath", response.photoPath);
      const data = await response.json();
      console.log("Success:", data);
      // Update the user data in your application...
      setSelectedImage(data.photoPath);
    } catch (error) {
      console.error("Error:", error);
    }

    // User info update
    try {
      const response = await fetch(
        `http://localhost:8080/login-signup/updateUserInfo/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNumber,
            maritalStatus,
            citizenship,
            religion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user info");
      }
      console.log("User info updated successfully");
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="profile-screen">
      <div>
        <Header />
      </div>
      <Grid container style={{ flex: 1 }}>
        <div className="profilePicture-area">
          <div>
            <img
              className="image-style"
              src={selectedImage || placeholderImage}
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
                {userData?.username || ""}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  textAlign: "center",
                  display: "none",
                }}
              />
              <div style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  style={{
                    color: "#213555",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    width: "200px",
                    fontWeight: "bold",
                  }}
                  onClick={() => imageUploader.current.click()}
                >
                  Upload a Photo
                </Button>
              </div>
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
                <div
                  style={{
                    textAlign: "center",
                    marginRight: "250px",
                  }}
                >
                  {editableFields.includes(label) ? (
                    label === "Marital Status" ? (
                      <select
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        style={{
                          color: "#213555",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "15px",
                          width: "245px",
                        }}
                      >
                        {maritalStatusOptions.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : label === "Citizenship" ? (
                      <select
                        value={citizenship}
                        onChange={(e) => setCitizenship(e.target.value)}
                        style={{
                          color: "#213555",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "15px",
                          width: "245px",
                        }}
                      >
                        {citizenshipOptions.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : label === "Religion" ? (
                      <select
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        style={{
                          color: "#213555",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "15px",
                          width: "245px",
                        }}
                      >
                        {religionOptions.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="0999-999-9999"
                        style={{
                          color: "#213555",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "15px",
                        }}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    )
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
            <Link to="/profile">
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
                onClick={handleFinishClick}
              >
                Finish
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </div>
  );
}
