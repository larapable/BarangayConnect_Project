import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './UserAnnouncementView.css';
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase } from "@mui/material";
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';


const AdminAnnouncementView = ({ announcement, handleEdit }) => {
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

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

    const handleSearch = () => { //add search here

    };


    return (
        <div>
        <Header />
        <Grid container>
            {/* Left Container */}
            <Grid item xs={3} className="left-container4">
            <h1 className="header-text4">ANNOUNCE WITH IMPACT!</h1>

            <img
                src="/announcementpic.png"
                alt="Support Local Business"
                className="image-container4"
            />

            <br />
            <p className="description4">
                As stewards of our community's well-being, your role is paramount.
                Leverage the Announcements section to keep residents informed,
                share emergency alerts, and showcase exciting community initiatives.
                Informed administrators make for empowered communities.
            </p>
            <p className="description4">
                Explore this feature to its fullest potential and witness the positive
                impact it can have on community engagement and cohesion.
            </p>
            <p className="description4">
                Your community, your tool - Barangay Connect!
            </p>
            <p className="description4">
                Let's make our community stronger, together!
            </p>
            </Grid>

            {/* Right Content */}
            <Grid item xs={9} style={{ backgroundColor: "#213555" }}>
            <Paper elevation={3} className="search-bar-paper4">
                <SearchIcon className="search-icon4" />
                <InputBase
                placeholder="Search..."
                className="input-base4"
                />
                <Button variant="contained" color="primary" className="search-button4">
                Search
                </Button>
            </Paper>

            {/* Display Announcements */}
                {announcements.map((announcement) => (
                        <Paper key={announcement.announcementId} elevation={3} className="announcement-paper4">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Paper
                                style={{
                                    backgroundColor: '#d34622',
                                    color: 'black',
                                    borderRadius: '10px',
                                    padding: '5px',
                                    marginTop: '5px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    marginTop: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src="/megaphone.png" 
                                    alt="Small Icon"
                                    style={{ marginRight: '10px', width: '50px', height: '50px' }} 
                                />
                                <h1 style={{ color: 'white', fontSize: '40px', fontWeight: 'bold', marginBottom: '10px', marginTop: '10px' }}>
                                    {announcement.announcementTitle}
                                </h1>
                                </Paper>
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
            </Grid>
        </Grid>
        </div>
    );
};

export default AdminAnnouncementView;
