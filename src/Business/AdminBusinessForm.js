import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./AdminBusinessForm.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
} from "@mui/material";
import Header from "../Header";
import axios from "axios";

const AdminBusinessForm = () => {
  const [date, setDate] = useState("");
  const [busContent, setBusContent] = useState("");
  const [busTitle, setBusTitle] = useState("");
  //image
  const [selectedImage, setSelectedImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  // Add these lines
  const imageUploader = useRef(null);
  const placeholderImage = "/upload.png"; // Replace with your placeholder image path

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !busContent || !busTitle || !selectedFile) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", busTitle);
      formData.append("description", busContent);
      formData.append("date", date);
      formData.append("image", selectedFile); // Append the image file

      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/business/insertAdminBusinessWithImage",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setDialogOpen(true);
        setSubmitted(true);
      } else {
        console.error("Error submitting business:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting business:", error);
    }
  };

  //image
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmitAnotherReport = () => {
    setDate("");
    setBusContent("");
    setBusTitle("");
    //image
    setDialogOpen(false);
  };

  return (
    <div>
      <Header />
      <Grid container>
        {/* Left Container */}
        <Grid item xs={3} className="left-containerb1">
          <h1 className="header-textb1">SUPPORT LOCAL!</h1>

          <img
            src="/support1.png"
            alt="Support Local Business"
            className="image-containerb1"
          />

          <br />
          <p className="descriptionb1">
            Discover the charm in your town by supporting local businesses. From
            unique finds to personalized service, your contributions nurture a
            sense of community and boost the local economy. By shopping locally,
            you help preserve cultural heritage, reduce environmental impact,
            and contribute to vibrant town centers.
          </p>
          <p className="descriptionb1">
            Make a difference today – explore and invest in the businesses that
            make your community special.
          </p>
          <p className="descriptionb1">
            Your support ensures a thriving and lively town for all.
          </p>
        </Grid>

        {/* Right Content */}
        <Grid item xs={9} style={{ backgroundColor: "#ffffff" }}>
          <div className="importantannouncementb1">
            <div className="importantannouncement-boxb1">
              <h1 style={{ color: "#fff", marginLeft: "10px" }}>
                MAKE YOUR BUSINESS KNOWN!
              </h1>
            </div>
            <div className="submit-announcementb1">
              <div
                style={{
                  border: "2px solid #213555",
                  padding: "3px",
                  width: "1500px",
                  height: "auto",
                }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <br />
                  <label
                    style={{
                      marginLeft: "7px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Title:
                    <input
                      type="text"
                      value={busTitle}
                      onChange={(e) => setBusTitle(e.target.value)}
                      placeholder="Enter Title"
                      required={submitted}
                      className="title-inputb1"
                    />
                  </label>
                  <br />
                  <br />

                  {/* Date */}
                  <label
                    style={{
                      marginLeft: "7px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Date:
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required={submitted}
                      className="announcement-dateb1"
                    />
                  </label>

                  <br />
                  <br />

                  {/* content */}
                  <br />
                  <Grid container>
                    <Grid item xs={8}>
                      <textarea
                        type="text"
                        value={busContent}
                        onChange={(e) => setBusContent(e.target.value)}
                        placeholder="Enter a business"
                        required={submitted}
                        className="content-detailsb1"
                      />
                      <br />
                    </Grid>
                    {/* insert image here */}
                    <Grid item xs={3}>
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
                        <img
                          className="img-container"
                          src={selectedImage || placeholderImage}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            marginLeft: "20%",
                          }}
                        />
                        <Button
                          variant="contained"
                          style={{
                            color: "#213555",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            border: "1px solid #213555",
                            width: "200px",
                            fontWeight: "bold",
                            marginLeft: "45%",
                            marginTop: "5%",
                          }}
                          onClick={() => imageUploader.current.click()}
                        >
                          Upload a Photo
                        </Button>
                      </div>
                    </Grid>
                  </Grid>

                  <div className="announcement-submitb1">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Button
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        fontWeight: "bolder",
                        backgroundColor: "#213555",
                        width: "400px",
                        height: "50px",
                        padding: "15px 30px",
                        borderRadius: "10px",
                        textAlign: "center",
                        fontSize: "large",
                        marginTop: "30px",
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* Dialog for submission confirmation */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{ style: { backgroundColor: "#ffffff" } }}
      >
        {/* <img src={"checkbutton.png"} alt="Check Button" className="submit-checkbutton1" /> */}
        <DialogTitle
          style={{
            margin: "auto",
            textAlign: "center",
            color: "#16558f",
            fontWeight: "bolder",
            fontSize: "40px",
          }}
        >
          Successful!
        </DialogTitle>
        <p
          style={{
            fontSize: "23px",
            color: "#000000",
            textAlign: "center",
            marginTop: "0px",
          }}
        >
          Your local business is successfully submitted!
        </p>
        <DialogActions>
          <Button
            style={{
              backgroundColor: "#ffffff",
              marginBottom: "10px",
              width: "280px",
              height: "50px",
              border: "1px solid #213555",
              color: "#213555",
              "&:hover": {
                backgroundColor: "#213555",
                color: "#ffffff",
              },
            }}
            className="submit-button-anotherannb1"
            onClick={handleSubmitAnotherReport}
            variant="contained"
          >
            Another Business
          </Button>

          <Link to="/adminviewbusiness">
            <Button
              style={{
                backgroundColor: "#213555",
                marginBottom: "10px",
                width: "280px",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#213555",
                },
              }}
              className="submit-button-homeb1"
              onClick={handleDialogClose}
              variant="contained"
            >
              View Businesses
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminBusinessForm;