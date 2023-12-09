import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

export default function Test() {
  const [selectedImage, setSelectedImage] = useState();

  const userObj = JSON.parse(localStorage.getItem("user"));

  const handleConfirm = async (event) => {
    event.preventDefault();
    console.log("Confirm button clicked");

    // Image upload
    const fileInput = document.getElementById("fileInput");
    if (fileInput && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("userId", userObj.userId); // userObj.userId is the user's ID
      formData.append("file", fileInput.files[0]); // selectedFile is the file selected by the user

      fetch(`http://localhost:8080/login-signup/uploadProfilePicture`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSelectedImage(URL.createObjectURL(fileInput.files[0]));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        style={{ marginTop: "20px" }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        Upload a Photo
      </Button>
      <Button
        variant="contained"
        style={{ marginTop: "20px" }}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </div>
  );
}
