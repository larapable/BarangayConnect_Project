import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import uuid from "react-uuid";
import AnnAdminMain from "./AnnAdminMain"
import AnnAdminSidebar from "./AnnAdminSidebar"
import Header from "../Header";
import "./AnnAdmin.css";

export default function AnnAdmin (){

    const [announcements, setAnnouncement] = useState(JSON.parse(localStorage.getItem("announcements")) || []);
    const [activeAnnouncement, setActiveAnnouncement] = useState(false);

  
    useEffect(() => { 
        localStorage.setItem("announcements", JSON.stringify(announcements)) 
    },[announcements])

    const onAddAnnouncementNote = () => {
        const newAnnouncement = {
          id: uuid(),
          title: "Untitled Note",
          content: "",
          date: Date.now(),
        };
    
        setAnnouncement([newAnnouncement, ...announcements]);
      };

      const onUpdateAnnouncementNote = (updatedAnnouncement) => { 
        const updatedAnnouncementArray = announcements.map((announcement) => {
          if(announcement.id === activeAnnouncement){
            return updatedAnnouncement;
          }
          return announcement;
        })
        setAnnouncement(updatedAnnouncementArray);
      };

      const onDeleteAnnouncementNote = (idToDelete) => {
        setAnnouncement(announcements.filter((announcement) => announcement.id !== idToDelete)); 
      };
    
      const getActiveAnnouncementNote = () => { 
        return announcements.find((announcement) => announcement.id === activeAnnouncement);
      };


    return(
        <div>
            <Header />
            <Grid container>
            {/* Left Container */}
            <Grid item xs={3.5} className="left-container">
            <AnnAdminSidebar announcements={announcements} 
                      onAddAnnouncementNote={onAddAnnouncementNote} 
                      onDeleteAnnouncementNote={onDeleteAnnouncementNote}
                      activeAnnouncement={activeAnnouncement}
                      setActiveAnnouncement={setActiveAnnouncement}/>
            </Grid>

            {/* Right Content */}
            <Grid item xs={8.5} style={{ backgroundColor: "#ffffff" }}>
            <AnnAdminMain activeAnnouncement={getActiveAnnouncementNote()} onUpdateAnnouncementNote={onUpdateAnnouncementNote}/> 
            </Grid>
          </Grid>
    </div>
  );
}