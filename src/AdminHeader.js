import { Grid, Menu, MenuItem, Link } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function AdminHeader() {
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);

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

  const logout = () => {
    localStorage.removeItem("user");
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
                  to="/directory"
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

              {/* <MenuItem onClick={handleMenuClose}>
                <NavLink to="/userviewannouncement"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration:"none",
                  }}
                  
                >
                  ANNOUNCEMENTS
                </NavLink>
              </MenuItem> */}

              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/forum"
                  style={{
                    color: "#213555",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  FORUM
                </NavLink>
              </MenuItem>

              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/emergency"
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
            <NavLink to="/login" className="header-link" onClick={logout}>
              LOGOUT
            </NavLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
