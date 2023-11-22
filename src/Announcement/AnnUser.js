import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import uuid from "react-uuid";
import Header from "../Header";
import "./AnnUser.css";


export default function AnnUser(){


    return(
        <div>
          <Header />
          <div className="annbody">
            <div className="background-image"></div>
            <Paper elevation={3} className="search-bar-paper">
              <SearchIcon className="search-icon" />
              <InputBase placeholder="Search..." className="input-base" />
              <Button variant="contained" color="primary" className="search-button">
                Search
              </Button>
            </Paper>
          </div>
    </div>
    );
}