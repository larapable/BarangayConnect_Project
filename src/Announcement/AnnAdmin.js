import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import uuid from "react-uuid";
import AnnAdminMain from "./AnnAdminMain"
import AnnAdminSidebar from "./AnnAdminSidebar"
import Header from "../Header";
import "./AnnAdmin.css";

export default function AnnAdmin (){

    const [businesses, setBusiness] = useState(JSON.parse(localStorage.getItem("businesses")) || []);
    const [activeBusiness, setActiveBusiness] = useState(false);

    //IF THERE'S AN API ALREADY, YOU DO NOT HAVE TO DO THIS
    useEffect(() => { //whenever theres an updated or added business it will be stored in the localStorage so that everytime you refresh the page, the announcement will remain
        localStorage.setItem("businesses", JSON.stringify(businesses)) //JSON.stringyfy converts any java objects into an actual string
    },[businesses])

    const onAddBusiness = () => {
        const newBusiness = {
          id: uuid(), //create a random id for the new notebook
          title: "Untitled Note",
          content: "",
          date: Date.now(),
        };
    
        setBusiness([newBusiness, ...businesses]);
      };

      const onUpdateBusiness = (updatedBusiness) => { //send onUpdateBusiness from the main with an updated object
        const updatedBusinessArray = businesses.map((business) => {
          if(business.id === activeBusiness){
            return updatedBusiness;
          }
          return business;
        })
        setBusiness(updatedBusinessArray);
      };

      const onDeleteBusiness = (idToDelete) => {
        setBusiness(businesses.filter((business) => business.id !== idToDelete)); //check the current loops/iterations on the id them compares it to idToDelete. If its true it will stay in the array, otherwise it will be removed
      };
    
      const getActiveBusiness = () => { //get the current stored id and find it in the array and return the entire current object
        return businesses.find((business) => business.id === activeBusiness);// loop through each business
      //return business.find((business) => business.id === activeBusiness) || {};
      };


    return(
        <div>
            <Header />
            <Grid container>
        {/* Left Container */}
        <Grid item xs={3.5} className="left-container">
        <AnnAdminSidebar businesses={businesses} 
                  onAddBusiness={onAddBusiness} 
                  onDeleteBusiness={onDeleteBusiness}
                  activeBusiness={activeBusiness}
                  setActiveBusiness={setActiveBusiness}/>
        </Grid>

        {/* Right Content */}
        <Grid item xs={8.5} style={{ backgroundColor: "#ffffff" }}>
        <AnnAdminMain activeBusiness={getActiveBusiness()} onUpdateBusiness={onUpdateBusiness}/> 
          {/*always running, always passing through current active note */}
          {/* The rest of your content goes here */}
        </Grid>
      </Grid>
    </div>
  );
}
