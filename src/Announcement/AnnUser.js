import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "./AnnUser.css";
import Header from "../Header";

export default function AnnUser (){

    return(
      <div>
      <Header />
      <Grid container>
        {/* Left Container */}
        <Grid item xs={3} className="left-container">
          <h1 className="header-text">STAY CONNECTED: Get the Latest Announcements</h1>

          <img
            src="/connected1.png"
            alt="Support Local Business"
            className="image-container"
          />

          <br />
          <p className="description">
          Stay in the loop with our new announcement feature. 
          From exclusive offers to important updates, be the 
          first to know what's happening in your community. 
          Your engagement keeps the conversation alive and 
          enhances the experience for everyone. 
          </p>
          <p className="description">
          Explore the latest announcements and be part of the ongoing 
          story of our vibrant community.
          </p>
          <p className="description">
          Be a part of the community narrative – your engagement shapes our vibrant town story!
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