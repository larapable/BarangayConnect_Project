import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Modal } from "@mui/material";
import AdminHeader from "../AdminHeader";
import "./Profile.css";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AdminProfileEdit() {
  const imageUploader = useRef(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const userObj = JSON.parse(localStorage.getItem("user"));
  const username = userObj.username;

  const placeholderImage = "/profile.png";
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
    userData?.isVerified || "",
  ];

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
  const verifiedOptions = ["", "Yes", "No"];

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
        console.log("Image URL:", data.photoPath);
      } catch (error) {
        setUserData(null);
        setError(error.message || "An error occurred");
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserProfile();
  }, [userId]);

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

  const handleFinishClick = (event) => {
    // Check if all fields have values

    setShowConfirmModal(true);
  };

  // Define modal actions
  const handleConfirm = async (event) => {
    console.log("Confirm button clicked");

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

    const verifiedValue = isVerified === "Yes" ? 1 : 0;
    // User info update
    try {
      const response = await fetch(
        `http://localhost:8080/login-signup/updateInfo/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isVerified: verifiedValue,
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

    // Navigate to the profile view
    setShowConfirmModal(false);
    navigate(`/profileList/${userId}`);
  };

  const handleClose = () => {
    // Handle closing the modal
    setShowConfirmModal(false);
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/login-signup/delete/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      console.log("User deleted successfully");
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="profile-screen">
      <div>
        <AdminHeader />
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
                {userData?.fname || ""} {userData?.lname || ""}
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
                <div
                  style={{
                    textAlign: "center",
                    marginRight: "250px",
                  }}
                >
                  {label === "Verified" ? (
                    <select
                      value={isVerified}
                      onChange={(e) => setIsVerified(e.target.value)}
                      style={{
                        color: "#213555",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "15px",
                        width: "245px",
                      }}
                    >
                      {verifiedOptions.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : label === "Password" ? (
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
              onClick={handleFinishClick}
            >
              Finish
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#FFFFFF",
                background: "#F24E1E",
                borderRadius: "10px",
                width: "150px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
              onClick={() => setShowDeleteModal(true)} // Add this line
            >
              Delete Profile
            </Button>

            {/* Confirmation Modal */}
            <Modal open={showConfirmModal}>
              <div className="profile-popup">
                <h2>Save Changes</h2>
                <p>Do you want to save these changes?</p>
                <div>
                  <Button
                    variant="contained"
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginRight: "10px",
                    }}
                    onClick={handleConfirm}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      color: "#FFFFFF",
                      background: "#F24E1E",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                    onClick={() => setShowConfirmModal(false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={showDeleteModal}>
              <div className="delete-popup">
                <h2>Delete User Profile</h2>
                <p>Are you sure you want to delete this Profile?</p>
                <div>
                  <Button
                    variant="contained"
                    style={{
                      color: "#FFFFFF",
                      background: "#F24E1E",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginRight: "10px",
                    }}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>

            {/* Delete Success Modal */}
            <Modal open={showSuccessModal}>
              <div className="delete-popup">
                <h2>Successfully Deleted</h2>
                <p>The user profile has been successfully deleted.</p>
                <div>
                  <Button
                    variant="contained"
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      setShowSuccessModal(false);
                      navigate("/profileList");
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Grid>
    </div>
  );
}
