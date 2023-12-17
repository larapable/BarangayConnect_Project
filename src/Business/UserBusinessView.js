import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import "./AdminBusinessView.css";
import SearchIcon from "@mui/icons-material/Search";
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
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const AdminBusinessView = ({ business, handleEdit }) => {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const uploadedImage = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 3;
  const startIndex = (currentPage - 1) * businessesPerPage;
  const endIndex = startIndex + businessesPerPage;

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/business/getAllBusiness"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch business details");
        }

        const businessesData = await response.json();
        setBusinesses(businessesData.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusinesses();
  }, []);

  if (!businesses) {
    return <p>Loading...</p>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBusinesses = businesses
    .filter((business) =>
      business.busTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(businesses.length / businessesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (busId) => {
    navigate(`/admin/business/updateBusiness/${busId}`);
  };

  const handleDelete = (busId) => {
    setBusinessToDelete(busId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async (confirmed) => {
    setDeleteConfirmationOpen(false);

    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/business/deleteBusiness/${businessToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setBusinesses((prevBusinesses) =>
            prevBusinesses.filter(
              (business) => business.busId !== businessToDelete
            )
          );
        } else {
          console.error("Error deleting business:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting business:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <Grid container>
        <Grid item xs={3} className="left-containerb3">
          <h1 className="header-textb3">SUPPORT LOCAL!</h1>

          <img
            src="/support1.png"
            alt="Support Local Business"
            className="image-containerb3"
          />

          <br />
          <p className="descriptionb3">
            Discover the charm in your town by supporting local businesses. From
            unique finds to personalized service, your contributions nurture a
            sense of community and boost the local economy. By shopping locally,
            you help preserve cultural heritage, reduce environmental impact,
            and contribute to vibrant town centers.
          </p>
          <p className="descriptionb3">
            Make a difference today – explore and invest in the businesses that
            make your community special.
          </p>
          <p className="descriptionb3">
            Your support ensures a thriving and lively town for all.
          </p>
        </Grid>

        <Grid item xs={9} style={{ backgroundColor: "#213555", height: "1300px" }}>
          <Paper elevation={3} className="search-bar-paperb3">
            <SearchIcon className="search-iconb3" />
            <InputBase
              placeholder="Search..."
              className="input-baseb3"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              variant="contained"
              color="primary"
              className="search-buttonb3"
            >
              Search
            </Button>
          </Paper>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Button
              onClick={handlePrevPage}
              style={{
                color: "#213555",
                marginRight: "10px",
                borderRadius: "50px",
                backgroundColor: "#ffffff",
              }}
              variant="contained"
            >
              <span style={{ fontSize: "20px" }}>←</span>
            </Button>
            <Button
              onClick={handleNextPage}
              style={{
                color: "#ffffff",
                marginLeft: "10px",
                borderRadius: "50px",
              }}
              variant="contained"
            >
              <span style={{ fontSize: "20px" }}>→</span>
            </Button>
          </div>

          {filteredBusinesses.map((business) => (
            //add paper here when hovered
            
            <Paper
              key={business.busId}
              elevation={3}
              className="announcement-paperb3"
            >
              {/* when hovered, image will appear */}
              <Grid className="imageContainer" data-motto={business.photoPath}></Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Paper 
                    style={{
                        backgroundColor: "#3BC2E0",
                        color: "black",
                        borderRadius: "10px",
                        padding: "5px",
                        marginTop: "5px",
                        marginBottom: "10px",
                        width: "100%",
                        marginTop: "5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                >
                <h1
                  style={{
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {business.busTitle}
                </h1>
                </Paper>
                
              </div>
              <p
                style={{
                  color: "#000000",
                  fontSize: "20px",
                  marginTop: "5px",
                  marginBottom: "20px",
                }}
              >
                {business.busContent}
              </p>
              <Paper
                style={{
                  backgroundColor: "#FFDE59",
                  color: "black",
                  borderRadius: "10px",
                  padding: "5px",
                  marginTop: "5px",
                  marginBottom: "10px",
                  maxWidth: "120px",
                  marginTop: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AccessTimeIcon style={{ marginRight: "5px" }} />
                {business.date}
              </Paper>

              {/* image here */}
              {/* <img
                src={business.photoPath}
                alt="Business Image"
                style={{ width: "100px", height: "auto" }}
                onError={(e) => console.error("Error loading image", e)}
              /> */}
            </Paper>
          ))}

          <Dialog
            open={deleteConfirmationOpen}
            onClose={() => handleDeleteConfirmation(false)}
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
              This page is asking you to confirm that you want to delete this
              announcement.
            </p>
            <DialogActions>
              <Button
                onClick={() => handleDeleteConfirmation(true)}
                style={{
                  color: "#213555",
                  backgroundColor: "#ffffff",
                  marginBottom: "10px",
                  width: "280px",
                  height: "50px",
                  border: "1px solid #213555",
                }}
                variant="contained"
                className="submit-button-homeb3"
              >
                Yes
              </Button>
              <Button
                onClick={() => handleDeleteConfirmation(false)}
                style={{
                  backgroundColor: "#213555",
                  color: "#ffffff",
                  marginBottom: "10px",
                  width: "280px",
                  height: "50px",
                }}
                variant="contained"
                className="submit-button-anotherannb3"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminBusinessView;
