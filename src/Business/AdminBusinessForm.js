import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./AdminBusinessForm.css";
import { Button, Dialog, DialogTitle, DialogActions, Grid } from '@mui/material';
import Header from '../Header';
import axios from 'axios';

const AdminBusinessForm = () => {


    const [date, setDate] = useState('');
    const [busContent, setBusContent] = useState(''); 
    const [busTitle, setBusTitle] = useState(''); 
    //image

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date || !busContent || !busTitle) { //image
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/business/insertAdminBusiness', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    busContent,
                    busTitle,
                    //image
                }),
            });
    
            if (response.ok) {
                setDialogOpen(true);
                setSubmitted(true);
            } else {
                console.error('Error submitting business:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting business:', error);
        }
    };

    

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSubmitAnotherReport = () => {
        setDate('');
        setBusContent('');
        setBusTitle('');
        //image
        setDialogOpen(false);
    };

    return (
        <div>  
        <Header />
        <Grid container>
            {/* Left Container */}
            <Grid item xs={3} className="left-containerb1">
            <h1 className="header-textb1">SUPPORT LOCAL!</h1>

            <img
                src="/support1.png"
                alt="Support Local Business"
                className="image-containerb1"
            />

            <br />
            <p className="descriptionb1">
                Discover the charm in your town by supporting local businesses. 
                From unique finds to personalized service, your contributions 
                nurture a sense of community and boost the local economy. 
                By shopping locally, you help preserve cultural heritage, 
                reduce environmental impact, and contribute to vibrant town centers.
            </p>
            <p className="descriptionb1">
                Make a difference today – explore and invest in the 
                businesses that make your community special.
            </p>
            <p className="descriptionb1">
                Your support ensures a thriving and lively town for all.
            </p>
            </Grid>

            {/* Right Content */}
            <Grid item xs={9} style={{ backgroundColor: "#ffffff" }}>
            <div className="importantannouncementb1">
                <div className='importantannouncement-boxb1'>
                    <h1 style={{ color: "#fff", marginLeft: '10px' }}>MAKE YOUR BUSINESS KNOWN!</h1>
                </div>
                <div className='submit-announcementb1'>
                    <div style={{ border: "2px solid #213555", padding: "3px", width: "1500px", height: "750px" }}>
                        <form onSubmit={handleSubmit}>

                            {/* Title */}
                            <br />
                            <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>
                                Title:
                                <input
                                    type="text"
                                    value={busTitle}
                                    onChange={(e) => setBusTitle(e.target.value)}
                                    placeholder='Enter Title'
                                    required={submitted}
                                    className='title-inputb1'
                                />
                            </label >
                            <br />
                            <br />

                            {/* Date */}
                            <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>
                                Date:
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required={submitted}
                                    className='announcement-dateb1'
                                />
                            </label>

                            <br />
                            <br />

                            {/* content */}
                            <br />
                            <textarea
                                type="text"
                                value={busContent}
                                onChange={(e) => setBusContent(e.target.value)}
                                placeholder='Enter a business'
                                required={submitted}
                                className='content-detailsb1'
                            />
                            <br />

                            {/* insert image here */}

                            <div className='announcement-submitb1'>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                <Button
                                    variant="contained"
                                    style={{ color: '#FFFFFF', fontWeight: "bolder", backgroundColor: "#213555", width: '400px', height: '50px', padding: '15px 30px', borderRadius: '10px', textAlign: 'center', fontSize: 'large' }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            
            </div>
            </Grid>
        </Grid>
        {/* Dialog for submission confirmation */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} PaperProps={{ style: { backgroundColor: '#ffffff' } }}>
                {/* <img src={"checkbutton.png"} alt="Check Button" className="submit-checkbutton1" /> */}
                <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#16558f', fontWeight: 'bolder', fontSize: '40px' }}>
                    Successful!
                </DialogTitle>
                <p style={{fontSize: "23px", color: '#000000', textAlign: 'center', marginTop: "0px"}}>Your announcement is successfully submitted!</p>
                <DialogActions>
                    <Button
                        style={{ backgroundColor: "#ffffff", marginBottom: "10px" , width: '280px', height: '50px', border: '1px solid #213555', color: "#213555",
                        '&:hover': {
                            backgroundColor: '#213555',
                            color: '#ffffff',
                          },
                    }}
                        className="submit-button-anotherannb1"
                        onClick={handleSubmitAnotherReport}
                        variant="contained"
                    >
                        Another Business
                    </Button>

                    <Link to="/adminviewbusiness"> 
                        <Button
                            style={{ backgroundColor: "#213555", marginBottom: "10px" , width: '280px', height: '50px',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#213555',
                              },
                        }}
                            className="submit-button-homeb1"
                            onClick={handleDialogClose}
                            variant="contained"
                        >
                            View Businesses
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminBusinessForm;






