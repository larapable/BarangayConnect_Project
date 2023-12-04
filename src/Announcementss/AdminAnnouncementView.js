import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './AdminAnnouncementView.css';
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const AdminAnnouncementView = ({ announcement, handleEdit }) => {
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);



    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:8080/announcements/getAllAnnouncement');
            if (response.ok) {
                const data = await response.json();
                // Filter out announcements marked as deleted
                const nonDeletedAnnouncements = data.filter((announcement) => announcement.isdelete !== 1);

                // Update the state with non-deleted announcements
                setAnnouncements(nonDeletedAnnouncements.reverse());
            } else {
                console.error('Error fetching announcements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);
    
    const handleSearch = () => { //add search here

    };

    const handleEditClick = (announcementId) => {
        navigate(`/admin/announcements/updateAnnouncement/${announcementId}`);
      };


    //   const handleDelete = async (announcementId) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/announcements/deleteAnnouncement/${announcementId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    
    //         if (response.ok) {
    //             // Remove the deleted announcement from the local state
    //             setAnnouncements((prevAnnouncements) =>
    //                 prevAnnouncements.filter((announcement) => announcement.announcementId !== announcementId)
    //             );
    //         } else {
    //             console.error('Error deleting announcement:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting announcement:', error);
    //     }
    // };

    const handleDelete = (announcementId) => {
        // Open the delete confirmation modal
        setAnnouncementToDelete(announcementId);
        setDeleteConfirmationOpen(true);
      };
    
      const handleDeleteConfirmation = async (confirmed) => {
        setDeleteConfirmationOpen(false);
    
        
        if (confirmed) {
          try {
            const response = await fetch(`http://localhost:8080/announcements/deleteAnnouncement/${announcementToDelete}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              // Remove the deleted announcement from the local state
              setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.filter((announcement) => announcement.announcementId !== announcementToDelete)
              );
            } else {
              console.error('Error deleting announcement:', response.statusText);
            }
          } catch (error) {
            console.error('Error deleting announcement:', error);
          }
        }
      };
    

    return (
        <div>
        <Header />
        <Grid container>
            {/* Left Container */}
            <Grid item xs={3} className="left-container3">
            <h1 className="header-text3">ANNOUNCE WITH IMPACT!</h1>

            <img
                src="/announcementpic.png"
                alt="Support Local Business"
                className="image-container3"
            />

            <br />
            <p className="description3">
                As stewards of our community's well-being, your role is paramount.
                Leverage the Announcements section to keep residents informed,
                share emergency alerts, and showcase exciting community initiatives.
                Informed administrators make for empowered communities.
            </p>
            <p className="description3">
                Explore this feature to its fullest potential and witness the positive
                impact it can have on community engagement and cohesion.
            </p>
            <p className="description3">
                Your community, your tool - Barangay Connect!
            </p>
            <p className="description3">
                Let's make our community stronger, together!
            </p>
            </Grid>

            {/* Right Content */}
            <Grid item xs={9} style={{ backgroundColor: "#213555" }}>
            <Paper elevation={3} className="search-bar-paper3">
                <SearchIcon className="search-icon3" />
                <InputBase
                placeholder="Search..."
                className="input-base3"
                />
                <Button variant="contained" color="primary" className="search-button3">
                Search
                </Button>
            </Paper>

            {/* Display Announcements */}
                {announcements.map((announcement) => (
                        <Paper key={announcement.announcementId} elevation={3} className="announcement-paper3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1 style={{ color: 'red', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px'  }}>
                                    {announcement.announcementTitle}
                                </h1>
                                <div>
                                    <Button onClick={() => { console.log(announcement.announcementId); handleEditClick(announcement.announcementId)}} style={{backgroundColor: '#FFFF66', marginRight: '5px'}}>
                                        <EditIcon color="primary" />
                                    </Button>
                                    <Button onClick={() => handleDelete(announcement.announcementId)} style={{backgroundColor: '#FFFF66'}}>
                                        <DeleteIcon color="error" />
                                    </Button>
                                </div>
                            </div>
                            <p style={{color: "#000000", fontSize: '20px', marginTop: '5px', marginBottom: '20px'}}>{announcement.announcementContent}</p>
                            <Paper
                                style={{
                                    backgroundColor: '#FFDE59',
                                    color: 'black',
                                    borderRadius: '10px',
                                    padding: '5px',
                                    marginTop: '5px',
                                    marginBottom: '10px',
                                    maxWidth: '120px',
                                    marginTop: '5px',  
                                    display: 'flex',  
                                    alignItems: 'center', 
                                }}
                            >
                                <AccessTimeIcon style={{ marginRight: '5px' }} />
                            {announcement.date}
                            </Paper>
                        </Paper>
                    ))}

                    {/* Delete Confirmation Dialog */}
          <Dialog open={deleteConfirmationOpen} onClose={() => handleDeleteConfirmation(false)} PaperProps={{ style: { backgroundColor: '#ffffff' } }}>
          <img src={"/deleteicon.png"} alt="Check Button" className="submit-checkbutton2" style={{marginTop: "20px"}}/>
            <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#213555', fontWeight: 'bold', fontSize: '30px' }}>
                Are you sure you want to delete this announcement?
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => handleDeleteConfirmation(false)} 
                      style={{ backgroundColor: "#FF0000", 
                            marginBottom: "10px", 
                            width: '300px' }} 
                            variant="contained"
                            className="submit-button-anotherann3">
                No
              </Button>
              <Button onClick={() => handleDeleteConfirmation(true)} 
                      style={{ backgroundColor: "#213555", 
                            marginBottom: "10px", 
                            width: '300px', 
                            color: "white" }} 
                            variant="contained"
                            className="submit-button-home3">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
            </Grid>
        </Grid>
        </div>
    );
};

export default AdminAnnouncementView;
