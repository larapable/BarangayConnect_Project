import React, { useState, useRef } from "react";
import { Button, Grid, Modal } from "@mui/material";
import Header from "../Header";

export default function AdminProfileEdit() {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const placeholderImage = "profile.png";
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
  // Sample values for each detail
  const initialValues = [
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

  const [values, setValues] = useState(initialValues);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  const handleDeletePopup = () => {
    setShowDeletePopup(true);
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };
  const handleDelete = () => {
    setShowConfirmDeletePopup(true);
  };

  const handleCloseConfirmDeletePopup = () => {
    // Close both modals
    setShowDeletePopup(false);
    setShowConfirmDeletePopup(false);
  };

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
                Lara Jane
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
                  color: "#FFFFFF",
                  background: "#213555",
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
                    <input
                      type="text"
                      style={{
                        color: "#213555",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "10px",
                      }}
                      value={values[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ) : (
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
              }}
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
              }}
              onClick={handleDeletePopup}
            >
              Delete Profile
            </Button>
            <Modal open={showDeletePopup} onClose={handleCloseDeletePopup}>
              <div className="delete-popup">
                <h2>Delete User Profile</h2>
                <p>Are you sure you want to delete this Profile?</p>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleDelete}
                    style={{
                      color: "#FFFFFF",
                      background: "#F24E1E",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginRight: "10px",
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleCloseDeletePopup}
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
            <Modal
              open={showConfirmDeletePopup}
              onClose={handleCloseConfirmDeletePopup}
            >
              <div className="delete-popup">
                <h2>Successfully Deleted</h2>
                <p>The user profile has been successfully deleted.</p>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleCloseConfirmDeletePopup}
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "100px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginRight: "10px",
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
