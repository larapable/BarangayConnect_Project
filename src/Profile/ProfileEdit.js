import React, { useState, useRef, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Header from "../Header";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function ProfileEdit() {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");

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
  ];

  const placeholderImage = "../profile.png";

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

  const [values, setValues] = useState(data);

  const handleInputChange = (index, newValue) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

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

  return (
    <div className="profile-screen">
      <div>
        <Header />
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
                {userData?.username || ""}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              />
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
                        value={values[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
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
                        value={values[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
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
                        value={values[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
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
                        value={values[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
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
