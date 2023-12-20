import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./AdminBusinessEdit.css";
import {
  Grid,
  Link,
  Menu,
  MenuItem,
  Paper,
  Button,
  TextField,
  InputBase,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminBusinessEdit = () => {
  const [business, setBusiness] = useState({
    busId: 0,
    busTitle: "",
    date: "",
    busContent: "",
    //image
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isBusinessUpdatedDialogOpen, setBusinessUpdatedDialogOpen] =
    useState(false);

  useEffect(() => {
    console.log("Fetching business data for ID:", id);
    fetchBusinessData(id);
  }, [id]);

  const fetchBusinessData = async (busId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/business/getInfoById/${busId}`
      );
      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setBusiness(data);
      } else {
        console.error("Error updating business:", response.statusText);

        if (response.status === 404) {
          console.error("Business not found");
        } else {
          console.error("Unhandled error");
        }
      }
    } catch (error) {
      console.error("Error updating business:", error);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/business/updateBusiness/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(business),
        }
      );

      if (response.ok) {
        setDialogOpen(false);
        setBusinessUpdatedDialogOpen(true); // Set it to true here
      } else {
        console.error("Error updating business:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating business:", error);
    }
  };

  const handleEditBusiness = async () => {
    setDialogOpen(true);
  };

  const handleCancelUpdate = () => {
    setDialogOpen(false);
  };

  const handleHomeButtonClick = () => {
    // Redirect to the home page or the desired location
    navigate("/");
  };

  const handleViewBusinessButtonClick = () => {
    // Redirect to the view announcement page or the desired location
    navigate("/adminviewbusiness");
  };

  const handleCloseBusinessUpdatedDialog = () => {
    setBusinessUpdatedDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prevBusiness) => ({
      ...prevBusiness,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <Grid container>
        {/* Left Container */}
        <Grid item xs={3} className="left-containerb2">
          <h1 className="header-textb2">SUPPORT LOCAL!</h1>

          <img
            src="/support1.png"
            alt="Support Local Business"
            className="image-containerb2"
          />

          <br />
          <p className="descriptionb2">
            Discover the charm in your town by supporting local businesses. From
            unique finds to personalized service, your contributions nurture a
            sense of community and boost the local economy. By shopping locally,
            you help preserve cultural heritage, reduce environmental impact,
            and contribute to vibrant town centers.
          </p>
          <p className="descriptionb2">
            Make a difference today – explore and invest in the businesses that
            make your community special.
          </p>
          <p className="descriptionb2">
            Your support ensures a thriving and lively town for all.
          </p>
        </Grid>

        {/* Right Content */}
        <Grid item xs={9} style={{ backgroundColor: "#ffffff" }}>
          <div className="importantannouncementb2">
            <div className="importantannouncement-boxb2">
              <h1 style={{ color: "#fff", marginLeft: "10px" }}>
                EDIT BUSINESS
              </h1>
            </div>
            <div className="submit-announcementb2">
              <div
                style={{
                  border: "2px solid #213555",
                  padding: "3px",
                  width: "1500px",
                  height: "735px",
                }}
              >
                <br />
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
                    variant="outlined"
                    fullWidth
                    name="busTitle"
                    value={business.busTitle}
                    onChange={handleInputChange}
                    className="title-inputb2"
                  />
                </label>

                <br />
                <br />

                <label
                  style={{
                    marginLeft: "7px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Date:
                  <input
                    variant="outlined"
                    fullWidth
                    type="date"
                    name="date"
                    value={business.date}
                    onChange={handleInputChange}
                    className="announcement-dateb2"
                  />
                </label>

                <br />
                <br />
                <br />

                <textarea
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="busContent"
                  value={business.busContent}
                  onChange={handleInputChange}
                  className="content-detailsb2"
                />
                <br />

                <div className="announcement-submitb2">
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
                    }}
                    onClick={handleEditBusiness}
                  >
                    Save Changes
                  </Button>
                </div>
                {/* Confirmation Dialog */}
                <Dialog
                  open={isDialogOpen}
                  onClose={() => setDialogOpen(false)}
                  PaperProps={{ style: { backgroundColor: "#ffffff" } }}
                >
                  <DialogTitle
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      color: "#000000",
                      fontWeight: "bolder",
                      fontSize: "40px",
                    }}
                  >
                    Are you sure?
                  </DialogTitle>
                  <p
                    style={{
                      fontSize: "23px",
                      color: "#000000",
                      textAlign: "center",
                      marginTop: "0px",
                    }}
                  >
                    This page is asking you to confirm that you want to update
                    this announcement.
                  </p>
                  <DialogActions>
                    <Button
                      onClick={handleConfirmUpdate}
                      style={{
                        backgroundColor: "#213555",
                        marginBottom: "10px",
                        width: "280px",
                        height: "50px",
                        color: "#ffffff",
                      }}
                      className="submit-button-homeb2"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={handleCancelUpdate}
                      style={{
                        backgroundColor: "#F24E1E",
                        marginBottom: "10px",
                        width: "280px",
                        height: "50px",
                        color: "#ffffff",
                      }}
                      variant="contained"
                      className="submit-button-anotherannb2"
                    >
                      No
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={isBusinessUpdatedDialogOpen}
                  onClose={handleCloseBusinessUpdatedDialog}
                  PaperProps={{ style: { backgroundColor: "#ffffff" } }}
                >
                  <DialogTitle
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      color: "#16558f",
                      fontWeight: "bolder",
                      fontSize: "40px",
                    }}
                  >
                    Updated
                  </DialogTitle>
                  <p
                    style={{
                      fontSize: "23px",
                      color: "#000000",
                      textAlign: "center",
                      marginTop: "0px",
                    }}
                  >
                    Your business is successfully updated!
                  </p>

                  <DialogActions>
                    <Button
                      onClick={handleHomeButtonClick}
                      style={{
                        color: "#213555",
                        backgroundColor: "#ffffff",
                        marginBottom: "10px",
                        width: "280px",
                        height: "50px",
                        border: "1px solid #213555",
                      }}
                      variant="contained"
                    >
                      Home
                    </Button>
                    <Button
                      onClick={handleViewBusinessButtonClick}
                      style={{
                        backgroundColor: "#213555",
                        color: "#ffffff",
                        marginBottom: "10px",
                        width: "280px",
                        height: "50px",
                      }}
                      variant="contained"
                    >
                      View Businesses
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminBusinessEdit;
