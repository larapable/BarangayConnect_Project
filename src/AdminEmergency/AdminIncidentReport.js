import React, { useState } from 'react';
import { Button } from '@mui/material';
import AdminHeader from '../AdminHeader';
import "./AdminIncidentReport.css";

const AdminIncidentReport = () => {
    const [incidentType, setIncidentType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        // For example, you can console.log the inputs for now
        console.log({
            incidentType,
            date,
            time,
            location,
            incidentDetails,
        });
        setSubmitted(true);
    };

    return (
        <div>
            <AdminHeader />
            <div>
                <div style={{ display: 'flex' }}>
                    {/* Left side - Form */}
                    <div style={{ marginTop: '10px' }}>
                        <h1 style={{ color: "#213555", marginLeft: '20px', marginTop: '-5px', fontSize: '40px' }}>REPORT AN ISSUE</h1>
                    </div>
                    <div style={{ border: "2px solid #213555", padding: "3px", width: "820px", height: "790px", marginTop: '70px', marginLeft: '-348px', marginRight: '5px' }}>
                        <form onSubmit={handleSubmit}>
                            {/* Type of Incident */}
                            <br />
                            <textarea
                                type="text"
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                placeholder='Type of Incident.....'
                                required={submitted}
                                className='admin-incident-input'
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
                                    className='admin-date-input'
                                />
                            </label>

                            <label style={{ marginLeft: '10px' }}>
                                Time:
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required={submitted}
                                    className='admin-time-input'
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
                                className='admin-location-input'
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
                                className='admin-details-input'
                            />
                            <br />
                            <div className='incident-button-submit'>
                                <Button
                                    variant="contained"
                                    style={{ color: '#FFFFFF', fontWeight: "bolder", backgroundColor: "#213555", width: '400px', height: '20px', padding: '15px 30px', borderRadius: '10px', textAlign: 'center', fontStyle: 'Arial' }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div>
                        {/* Incident Alert Box */}
                        <div class="alert-label-container">
                            <h2>A L E R T !</h2>
                        </div>

                        <div class="alert-container">
                            <p><strong>Type of Incident:</strong> {incidentType}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Incident Details:</strong> {incidentDetails}</p>
                        </div>


                        {/* Report Forum Box */}
                        <div class="report-label-container">
                            <h2>R E P O R T - F O R U M</h2>
                        </div>

                        <div class="report-container">
                            <p><strong>Type of Incident:</strong> {incidentType}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Incident Details:</strong> {incidentDetails}</p>

                            <button class="delete-button" onclick="deleteReport()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminIncidentReport;
