import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SubmitReportForm.css";
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import Header from '../Header';
import axios from 'axios';

const SubmitReportForm = () => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [exactLocation, setExactLocation] = useState('');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!date || !time || !exactLocation || !incidentDetails || !incidentType) {
            setError('Please fill in all fields.');
            return;
        }

        // Reset error state
        setError('');

        // Get user object from localStorage
        const userObj = JSON.parse(localStorage.getItem("user"));

        try {
            // Make the HTTP request to your Spring Boot backend
            const response = await fetch('http://localhost:8080/emergency/insertEmergency', {
                method: 'POST',  // Make sure it's a POST request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    time,
                    exactLocation,
                    incidentDetails,
                    typeOfIncident: incidentType,
                    user: userObj,
                }),
            });


            if (!response.ok) {
                // Handle non-successful response
                const errorMessage = await response.text(); // Get error message from the server
                throw new Error(`Error submitting incident: ${response.status} - ${errorMessage}`);
            }

            // Show the submission dialog
            setDialogOpen(true);
            setSubmitted(true);
        } catch (error) {
            console.error(error.message);
        }
    };


    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSubmitAnotherReport = () => {
        setDate('');
        setTime('');
        setExactLocation('');
        setIncidentDetails('');
        setIncidentType('');
        setDialogOpen(false);
    };

    return (
        <div className='submit-report-body'>
            <Header />
            <div class="text-voice-be-heard ">
                <h1>LET YOUR VOICE BE HEARD!</h1>
            </div>
            <div className='submit-report-image'>
                <img src={"reportissuepic.png"} alt="Background Image" style={{ width: "20%", height: "40vh" }} />
            </div>
            <div class="description-voice-be-heard">
                <p>Help us make our community a better place by reporting any issues <br />
                    or concerns you encounter. Whether it's about public services, safety, <br />
                    infrastructure, or any other matter, we want to hear from you. <br />
                    Your input plays a vital role in addressing and resolving community <br />
                    issues.
                </p>
                <p>
                    Our barangay officials and dedicated team will review your report <br />
                    promptly and take the necessary steps to resolve the issue. Your <br />
                    participation is crucial in maintaining the well-being of our community.
                </p>
                <p>
                    Your community, your app - Barangay Connect!
                </p>
            </div>
            <div className="report-an-issue-text">
                <div className='report-an-issue-text-box'>
                    <h1 style={{ color: "#fff", marginLeft: '10px' }}>REPORT AN ISSUE</h1>
                </div>
                <div className='submit-report-issue'>
                    <div style={{ border: "2px solid #213555", padding: "3px", width: "230%", height: "auto", marginBottom: '20px' }}>
                        <form onSubmit={handleSubmit} method="post">
                            {/* Type of Incident */}
                            <br />
                            <textarea
                                type="text"
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                placeholder='Type of Incident.....'
                                required={submitted}
                                className='incident-type-input'
                            />
                            <br />
                            <br />

                            {/* Date and Time */}
                            <label style={{ marginLeft: '10px' }}>
                                Date:
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required={submitted}
                                    className='incident-date-input'
                                />
                            </label>

                            <label style={{ marginLeft: '10px' }}>
                                Time:
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required={submitted}
                                    className='incident-time-input'
                                />
                            </label>
                            <br />

                            {/* Exact Location */}
                            <br />
                            <br />
                            <textarea
                                type="text"
                                value={exactLocation}
                                onChange={(e) => setExactLocation(e.target.value)}
                                placeholder='Exact Location.....'
                                required={submitted}
                                className='incident-location-input'
                            />
                            <br />
                            <br />

                            {/* Incident Details */}
                            <br />
                            <textarea
                                type="text"
                                value={incidentDetails}
                                onChange={(e) => setIncidentDetails(e.target.value)}
                                placeholder='Incident Details.....'
                                required={submitted}
                                className='incident-details-input'
                            />
                            <br />
                            <div className='report-issue-button'>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <Button
                                    variant="contained"
                                    style={{ color: '#FFFFFF', fontWeight: "bolder", backgroundColor: "#213555", width: '400px', height: '20px', padding: '15px 30px', borderRadius: '10px', textAlign: 'center' }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Dialog for submission confirmation */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} PaperProps={{ style: { backgroundColor: '#E0E0E0' } }}>
                <img src={"checkbutton.png"} alt="Check Button" className="success-pop-up" />
                <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#213555', fontWeight: 'bold', fontSize: '30px' }}>
                    Your Emergency Report has been submitted!
                </DialogTitle>
                <DialogActions>
                    <Button
                        style={{ backgroundColor: "#213555", marginBottom: "10px", width: '300px' }}
                        className="button-another-report"
                        onClick={handleSubmitAnotherReport}
                        variant="contained"
                    >
                        Another Report
                    </Button>

                    <Link to="/backhome">
                        <Button
                            style={{ backgroundColor: "#213555", marginBottom: "10px", width: '300px' }}
                            className="button-back-home"
                            onClick={handleDialogClose}
                            variant="contained"
                        >
                            Back Home
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SubmitReportForm;
