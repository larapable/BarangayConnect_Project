import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "./BLUser.css";
import Header from "../Header";

export default function BLUser (){

    return(
      <div>
      <Header />
      <Grid container>
        {/* Left Container */}
        <Grid item xs={3} className="left-container">
          <h1 className="header-text">SUPPORT YOUR LOCAL BUSINESS!</h1>

          <img
            src="/support1.png"
            alt="Support Local Business"
            className="image-container"
          />

          <br />
          <p className="description">
            Discover the charm in your town by supporting local businesses. From
            unique finds to personalized service, your contributions nurture a
            sense of community and boost the local economy. By shopping locally,
            you help preserve cultural heritage, reduce environmental impact,
            and contribute to vibrant town centers.
          </p>
          <p className="description">
            Make a difference today – explore and invest in the businesses that
            make your community special.
          </p>
          <p className="description">
            Your support ensures a thriving and lively town for all.
          </p>
        </Grid>

        {/* Right Content */}
        <Grid item xs={9} style={{ backgroundColor: "#213555" }}>
        <Paper elevation={3} className="search-bar-paper">
            <SearchIcon className="search-icon" />
            <InputBase
              placeholder="Search..."
              className="input-base"
            />
            <Button variant="contained" color="primary" className="search-button">
              Search
            </Button>
          </Paper>
          {/* The rest of your content goes here */}
        </Grid>
      </Grid>
    </div>
  );
}