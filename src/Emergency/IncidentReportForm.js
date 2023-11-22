import React, { useState } from 'react';
import { Button } from '@mui/material';
import Header from '../Header';
import "./IncidentReportForm.css";

const IncidentReportForm = () => {
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
            <Header />
            <div>
                <div style={{ display: 'flex' }}>
                    {/* Left side - Form */}
                    <div style={{ marginTop: '20px' }}>
                        <h1 style={{ color: "#213555", marginLeft: '10px', marginTop: '-5px' }}>REPORT AN ISSUE</h1>
                    </div>
                    <div style={{ border: "2px solid #213555", padding: "3px", width: "520px", height: "auto", marginTop: '70px', marginLeft: '-270px' , marginRight: '5px'}}>
                        <form onSubmit={handleSubmit}>
                            {/* Type of Incident */}
                            <br />
                            <input
                                type="text"
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                placeholder='Type of Incident.....'
                                required={submitted}
                                className='incident-input'
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
                                    className='incident-date'
                                />
                            </label>

                            <label style={{ marginLeft: '10px' }}>
                                Time:
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required={submitted}
                                    className='incident-time'
                                />
                            </label>
                            <br />

                            {/* Exact Location */}
                            <br />
                            <br />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder='Exact Location.....'
                                required={submitted}
                                className='incident-location'
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
                                className='incident-incident-details'
                            />
                            <br />
                            <div className='button-submit'>
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
                    <div>
                        {/* Incident Alert Box */}
                        <div style={{ backgroundColor: '#213555', padding: '10px', borderRadius: '5px', color: '#fff', height: '50px', width: '965px', marginLeft: '3px' }}>
                            <h2 style={{ marginTop: '-3px' }}>A L E R T !</h2>
                        </div>
                        <div style={{ marginLeft: '5px', padding: '10px', border: '2px solid #ccc', borderRadius: '5px', width: '960px', height: '130px', marginTop: '0px', fontSize: '11px'}}>
                            <p style={{ marginTop: '5px' }}><strong>Type of Incident:</strong> {incidentType}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Incident Details:</strong> {incidentDetails}</p>
                        </div>

                        {/* Report Forum Box */}
                        <div style={{ backgroundColor: '#213555', padding: '10px', borderRadius: '5px', color: '#fff', height: '50px', width: '965px', marginLeft: '3px', marginTop: '50px' }}>
                            <h2 style={{ marginTop: '-3px' }}>R E P O R T F O R U M</h2>
                        </div>
                        <div style={{ marginLeft: '5px', padding: '10px', border: '2px solid #ccc', borderRadius: '5px', width: '960px', height: '130px', marginTop: '0px', fontSize: '11px'}}>
                            <p style={{ marginTop: '5px' }}><strong>Type of Incident:</strong> {incidentType}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Incident Details:</strong> {incidentDetails}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentReportForm;
