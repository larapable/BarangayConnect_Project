import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './AdminAnnouncementEdit.css';
import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase, Dialog, DialogTitle, DialogActions } from "@mui/material";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


const AdminAnnouncementEdit = () => {

    const [announcement, setAnnouncement] = useState({
        announcementId: 0,
        announcementTitle: '',
        date: '',
        announcementContent: '',
      });

      const { id } = useParams();
      const [isDialogOpen, setDialogOpen] = useState(false);

      useEffect(() => {
        console.log('Fetching announcement data for ID:', id);
        fetchAnnouncementData(id);
      }, [id]);

      const fetchAnnouncementData = async (announcementId) => {
        try {
          const response = await fetch(`http://localhost:8080/announcements/${announcementId}`);
          console.log('Response:', response);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data);
            setAnnouncement(data);
          } else {
            console.error('Error updating announcement:', response.statusText);
      
            // Optionally, handle specific error cases
            if (response.status === 404) {
              console.error('Announcement not found');
            } else {
              console.error('Unhandled error');
            }
          }
        } catch (error) {
          console.error('Error updating announcement:', error);
        }
      };
    
      const handleConfirmUpdate = async () => {
        try {
          // Make the HTTP request to update the announcement using fetch
          const response = await fetch(`http://localhost:8080/announcements/updateAnnouncement/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(announcement),
          });
      
          if (response.ok) {
            setDialogOpen(false);
            // Optionally, redirect to the view page or perform other actions
          } else {
            console.error('Error updating announcement:', response.statusText);
            // Handle error
          }
        } catch (error) {
          console.error('Error updating announcement:', error);
          // Handle error
        }
      };
      
      const handleEditAnnouncement = async () => {
        setDialogOpen(true);
      };

      const handleCancelUpdate = () => {
        setDialogOpen(false);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement((prevAnnouncement) => ({
          ...prevAnnouncement,
          [name]: value,
        }));
      };

      return(
        <div>
        <Header />
        <Grid container>
            {/* Left Container */}
            <Grid item xs={3} className="left-container2">
            <h1 className="header-text2">ANNOUNCE WITH IMPACT!</h1>

            <img
                src="/announcementpic.png"
                alt="Support Local Business"
                className="image-container2"
            />

            <br />
            <p className="description2">
                As stewards of our community's well-being, your role is paramount.
                Leverage the Announcements section to keep residents informed,
                share emergency alerts, and showcase exciting community initiatives.
                Informed administrators make for empowered communities.
            </p>
            <p className="description2">
                Explore this feature to its fullest potential and witness the positive
                impact it can have on community engagement and cohesion.
            </p>
            <p className="description2">
                Your community, your tool - Barangay Connect!
            </p>
            <p className="description2">
                Let's make our community stronger, together!
            </p>
            </Grid>

            {/* Right Content */}
            <Grid item xs={9} style={{ backgroundColor: '#ffffff' }}>
              <div className="importantannouncement2">
                <div className='importantannouncement-box2'>
                    <h1 style={{ color: "#fff", marginLeft: '10px' }}>EDIT ANNOUNCEMENT</h1>
                </div>
                <div className='submit-announcement2'>
                <div style={{ border: "2px solid #213555", padding: "3px", width: "1500px", height: "735px" }}>
                <br />
                <br />
                <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>
                    Title:
                  <input
                    variant="outlined"
                    fullWidth
                    name="announcementTitle"
                    value={announcement.announcementTitle}
                    onChange={handleInputChange}
                    className='title-input2'
                  />
                </label >

                <br />
                <br />

                <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>
                    Date:
                  <input
                    variant="outlined"
                    fullWidth
                    type="date"
                    name="date"
                    value={announcement.date}
                    onChange={handleInputChange}
                    className='announcement-date2'
                  />
                </label>

                <br />
                <br />
                <br />
                

                <textarea
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="announcementContent"
                  value={announcement.announcementContent}
                  onChange={handleInputChange}
                  className='content-details2'
                />
                <br />

                <div className='announcement-submit2'>
                <Button
                  variant="contained"
                  style={{ color: '#FFFFFF', fontWeight: "bolder", backgroundColor: "#213555", width: '400px', height: '50px', padding: '15px 30px', borderRadius: '10px', textAlign: 'center', fontSize: 'large' }}
                  onClick={handleEditAnnouncement}
                >
                  Save Changes
                </Button>
                </div>
              {/* Confirmation Dialog */}
              <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ style: { backgroundColor: '#ffffff' } }}>
              <img src={"/questionmark.png"} alt="Check Button" className="submit-checkbutton2" style={{marginTop: "20px"}}/>
                  <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#213555', fontWeight: 'bold', fontSize: '30px' }}>
                    Are you sure you want to update this announcement?
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleCancelUpdate} 
                            style={{ backgroundColor: "#FF0000", marginBottom: "10px" , width: '300px'}}
                            variant="contained"
                            className="submit-button-anotherann2">
                      No
                    </Button>
                    <Button onClick={handleConfirmUpdate}
                            style={{ backgroundColor: "#213555", marginBottom: "10px" , width: '300px', color: "white"}}
                            className="submit-button-home2">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
};

export default AdminAnnouncementEdit;