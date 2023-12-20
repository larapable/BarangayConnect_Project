import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./AdminAnnouncementChoices.css";

const AdminAnnouncementChoices = () => {
  return (
    <div style={{ backgroundColor: "#213555" }}>
      <div>
        <Header />
        <img
          src={"fullbg.png"}
          alt="Background Image"
          style={{ width: "100%", height: "88vh", objectFit: "cover" }}
        />
      </div>

      <div className="popup-containera1">
        <div className="popup-boxa1">
          <img src={"BClogo.png"} alt="Logo Pop-up" className="popup-imagea1" />
          <div
            style={{
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Link to="/submitannouncement">
              <Button
                class="button button-submita1"
                variant="contained"
                style={{
                  height: "70px",
                  padding: "15px 150px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Submit Announcement Form
              </Button>
            </Link>
            <br />
            <span class="texta1" style={{ fontWeight: "bolder" }}>
              OR
            </span>
            <br />
            <Link to="/adminviewannouncement">
              <Button
                class="button button-emergencya1"
                variant="contained"
                style={{
                  height: "70px",
                  padding: "15px 150px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                View Announcements
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncementChoices;
