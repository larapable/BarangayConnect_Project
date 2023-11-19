import './App.css';
import { Grid, Link, Button } from "@mui/material";

function App() {
  return (
    <div>
    <Grid container className="gridItem">
      <Grid item xs={12} sm={12}>
        <div className="logoContainer">
          <img
            src={"headerlogo.png"}
            className="headerlogo"
            alt="headerLogo"
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} className="contbn">
        <div className="nowrap">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Calendar
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Emergency Alert
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Forum
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Announcements
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Requests
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Business Support
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#213555",
              color: "#FFFFFF",
              fontWeight: "bolder",
            }}
          >
            Barangay Directory
          </Button>
        </div>
      </Grid>
    </Grid>
  </div>
  );
}

export default App;
