import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import "./AdminBusinessChoices.css";

const AdminBusinessChoices = () => {
  return (
    <div style={{ backgroundColor: "#213555" }}>
      <div>
        {/* Header */}
        <AdminHeader />
        <img
          src={"fullbg.png"}
          alt="Background Image"
          style={{ width: "100%", height: "88vh", objectFit: "cover" }}
        />
      </div>

      <div className="popup-containerb1">
        <div className="popup-boxb1">
          {/* Content inside the pop-up container */}
          <img src={"BClogo.png"} alt="Logo Pop-up" className="popup-imageb1" />
          <div
            style={{
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Link to="/submitbusiness">
              <Button
                class="button button-submit"
                variant="contained"
                style={{
                  height: "70px",
                  padding: "15px 150px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Submit Business Form
              </Button>
            </Link>
            <br />
            <span class="text" style={{ fontWeight: "bolder" }}>
              OR
            </span>
            <br />
            <Link to="/adminviewbusiness">
              <Button
                class="button button-emergency"
                variant="contained"
                style={{
                  height: "70px",
                  padding: "15px 150px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                View Businesses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBusinessChoices;
