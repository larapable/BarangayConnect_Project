import { Grid, Menu, MenuItem, Link, Button, Modal } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAboutClick = (event) => {
    setAboutAnchorEl(event.currentTarget);
  };

  const handleCalendarClick = (event) => {
    setCalendarAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAboutAnchorEl(null);
    setCalendarAnchorEl(null);
  };

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("admin");
    setLogoutOpen(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Header */}
      <Grid container className="grid">
        <Grid item sm={5}>
          <div className="conlogo">
            <img
              src={"/headerlogo.png"}
              className="headlogo"
              alt="headerLogo"
            />
          </div>
        </Grid>

        <Grid item sm={1} className="btn">
          <div className="noowrap">
            <NavLink to="/admindashboard" className="header-link">
              DASHBOARD
            </NavLink>
          </div>
        </Grid>

        <Grid item sm={1} className="btn">
          <div className="noowrap">
            <NavLink to="/admincalendar" className="header-link">
              CALENDAR
            </NavLink>
          </div>
        </Grid>

        <Grid item sm={1.5} className="btn">
          <div className="noowrap">
            <NavLink to="/business" className="header-link">
              BUSINESS SUPPORT
            </NavLink>
          </div>
        </Grid>

        <Grid item sm={1} className="btn">
          <div className="noowrap">
            <Link
              to="about"
              className="header-link"
              aria-controls="info-menu"
              aria-haspopup="true"
              onClick={handleAboutClick}
            >
              INFO HUB
              <ExpandMoreIcon
                style={{ marginLeft: "5px", verticalAlign: "middle" }}
              />
            </Link>
            <Menu
              id="info-menu"
              anchorEl={aboutAnchorEl}
              keepMounted
              open={Boolean(aboutAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/profileList"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  PROFILE
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/admindirectorylist"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  BARANGAY DIRECTORY
                </NavLink>
              </MenuItem>
            </Menu>
          </div>
        </Grid>

        <Grid item sm={1} className="btn">
          <div className="noowrap">
            <Link
              to="services"
              className="header-link"
              aria-controls="services-menu"
              aria-haspopup="true"
              onClick={handleCalendarClick}
            >
              SERVICES
              <ExpandMoreIcon
                style={{ marginLeft: "5px", verticalAlign: "middle" }}
              />
            </Link>
            <Menu
              id="services-menu"
              anchorEl={calendarAnchorEl}
              keepMounted
              open={Boolean(calendarAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/announcement"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  ANNOUNCEMENTS
                </NavLink>
              </MenuItem>

              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/adminemergency"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  EMERGENCY ALERT
                </NavLink>
              </MenuItem>

              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/adminrequest"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  REQUESTS DOCUMENT
                </NavLink>
              </MenuItem>
            </Menu>
          </div>
        </Grid>

        <Grid item sm={1} className="btn">
          <div className="noowrap">
            <NavLink className="header-link" onClick={handleLogoutOpen}>
              LOGOUT
            </NavLink>
          </div>
          <Modal open={logoutOpen} onClose={handleLogoutClose}>
            <div className="logout-popup">
              <h2>Confirm Logout</h2>
              <p>Do you really want to log out?</p>
              <Button
                variant="contained"
                onClick={handleLogoutConfirm}
                style={{
                  color: "#FFFFFF",
                  background: "#213555",
                  borderRadius: "10px",
                  width: "150px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={handleLogoutClose}
                style={{
                  color: "#FFFFFF",
                  background: "#F24E1E",
                  borderRadius: "10px",
                  width: "150px",
                  fontWeight: "bold",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                No
              </Button>
            </div>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}
