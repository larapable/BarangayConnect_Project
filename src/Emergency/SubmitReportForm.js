import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SubmitReportForm.css";
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import Header from '../Header';

const SubmitReportForm = () => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!date || !time || !location || !incidentDetails || !incidentType) {
            setError('Please fill in all fields.');
            return;
        }

        // Reset error state
        setError('');

        console.log({
            date,
            time,
            location,
            incidentDetails,
            incidentType,
        });

        setDialogOpen(true);
        setSubmitted(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSubmitAnotherReport = () => {
        setDate('');
        setTime('');
        setLocation('');
        setIncidentDetails('');
        setIncidentType('');
        setDialogOpen(false);
    };

    return (
        <div>
            <Header />
            <div class="submit-label-voice">
                <h1>LET YOUR VOICE BE HEARD!</h1>
            </div>
            <div className='submit-report-image'>
                <img src={"reportissuepic.png"} alt="Background Image" style={{ width: "20%", height: "40vh" }} />
            </div>
            <div class="submit-text-voice">
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
            <div className="submit-report-label">
                <div className='submit-report-label-box'>
                    <h1 style={{ color: "#fff", marginLeft: '10px' }}>REPORT AN ISSUE</h1>
                </div>
                <div className='submit-report-issue'>
                    <div style={{ border: "2px solid #213555", padding: "3px", width: "230%", height: "auto" , marginBottom: '20px'}}>
                        <form onSubmit={handleSubmit}>
                            {/* Type of Incident */}
                            <br />
                            <textarea
                                type="text"
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                placeholder='Type of Incident.....'
                                required={submitted}
                                className='submit-incident-input'
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
                                    className='submit-incident-date'
                                />
                            </label>

                            <label style={{ marginLeft: '10px' }}>
                                Time:
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required={submitted}
                                    className='submit-incident-time'
                                />
                            </label>
                            <br />

                            {/* Exact Location */}
                            <br />
                            <br />
                            <textarea
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder='Exact Location.....'
                                required={submitted}
                                className='submit-incident-location'
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
                                className='submit-incident-incident-details'
                            />
                            <br />
                            <div className='submit-button-submit'>
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
                <img src={"checkbutton.png"} alt="Check Button" className="submit-checkbutton" />
                <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#213555', fontWeight: 'bold', fontSize: '30px' }}>
                    Your Emergency Report has been submitted!
                </DialogTitle>
                <DialogActions>
                    <Button
                        style={{ backgroundColor: "#213555", marginBottom: "10px" , width: '300px'}}
                        className="submit-button-anotherreport"
                        onClick={handleSubmitAnotherReport}
                        variant="contained"
                    >
                        Another Report
                    </Button>

                    <Link to="/backhome">
                        <Button
                            style={{ backgroundColor: "#213555", marginBottom: "10px" , width: '300px'}}
                            className="submit-button-backhome"
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
