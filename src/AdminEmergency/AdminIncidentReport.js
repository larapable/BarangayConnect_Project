import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Header from '../Header';
import "./AdminIncidentReport.css";

const AdminIncidentReport = () => {
    const [incidentType, setIncidentType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [submittedIncidentType, setSubmittedIncidentType] = useState(''); // New state variable

    useEffect(() => {
        // Fetch alerts from the backend when the component mounts
        fetchAlerts();

        // Retrieve alerts from local storage
        const storedAlerts = JSON.parse(localStorage.getItem('alerts'));
        if (storedAlerts) {
            setAlerts(storedAlerts);
        }

        // Set the default value for the date to the current date
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const fetchAlerts = async () => {
        try {
            // Fetch alerts from the adminemergency endpoint
            const adminEmergencyResponse = await fetch('http://localhost:8080/adminemergency/admingetAllEmergency');
            if (!adminEmergencyResponse.ok) {
                throw new Error(`Failed to fetch admin emergency alert data: ${adminEmergencyResponse.status}`);
            }
            const adminEmergencyData = await adminEmergencyResponse.json();

            // Fetch alerts from the emergency endpoint
            const emergencyResponse = await fetch('http://localhost:8080/emergency/getAllEmergency');
            if (!emergencyResponse.ok) {
                throw new Error(`Failed to fetch emergency alert data: ${emergencyResponse.status}`);
            }
            const emergencyData = await emergencyResponse.json();

            // Combine and filter out soft-deleted alerts from both endpoints
            const combinedAlerts = [...adminEmergencyData, ...emergencyData];
            const filteredAlerts = combinedAlerts.filter(alert => alert.isdelete !== 1);

            setAlerts(filteredAlerts);
            // Update local storage with fetched alerts
            localStorage.setItem('alerts', JSON.stringify(filteredAlerts));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (adminemergencyId, emergencyId, index, isAdminEmergency) => {
        try {
            const endpoint = isAdminEmergency
                ? `http://localhost:8080/adminemergency/admindeleteEmergency/${adminemergencyId}`
                : `http://localhost:8080/emergency/deleteEmergency/${emergencyId}`;
    
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Remove the deleted alert from the state
                const updatedAlerts = [...alerts];
                updatedAlerts.splice(index, 1);
                setAlerts(updatedAlerts);
    
                console.log(`Alert with ID ${emergencyId} deleted successfully.`);
                console.log(`Alert with ID ${adminemergencyId} deleted successfully.`);
                localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
    
                // Display a popup to the user
                window.alert('Alert deleted successfully.');
            } else {
                console.error(`Error deleting alert: ${response.status}`);
                // Display an error popup to the user
                window.alert(`Error deleting alert: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error deleting alert: ${error.message}`);
            // Display an error popup to the user
            window.alert(`Error deleting alert: ${error.message}`);
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create an object with the incident data
            const incidentData = {
                typeOfIncident: incidentType,
                date: date,
                time: time,
                exactLocation: location,
                incidentDetails: incidentDetails,
            };

            // Make a POST request to your backend endpoint
            const response = await fetch('http://localhost:8080/adminemergency/admininsertEmergency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(incidentData),
            });

            if (response.ok) {
                // Clear the form after successful submission
                setIncidentType('');
                setDate('');
                setTime('');
                setLocation('');
                setIncidentDetails('');
                setSubmitted(false);

                // Fetch updated alerts after submission
                fetchAlerts();

                console.log('Incident report submitted successfully.');
                // You can also display a success message to the user
                window.alert('Incident report submitted successfully.');
            } else {
                console.error(`Error submitting incident report: ${response.status}`);
                // Display an error popup to the user
                window.alert(`Error submitting incident report: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error submitting incident report: ${error.message}`);
            // Display an error popup to the user
            window.alert(`Error submitting incident report: ${error.message}`);
        }
    };

    return (
        <div>
            <Header />
            <div>
                <div style={{ display: 'flex' }}>
                    {/* Left side - Form */}
                    <div style={{ marginTop: '10px' }}>
                        <h1 style={{ color: "#213555", marginLeft: '20px', marginTop: '-5px', fontSize: '38px' }}>REPORT AN ISSUE</h1>
                    </div>
                    <div>
                        <div style={{ border: "2px solid #213555", padding: "3px", width: "820px", height: "auto", marginTop: '70px', marginLeft: '-340px', marginRight: '5px' }}>
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
                    </div>

                    <div>
                        {/* Incident Alert Box */}
                        <div className="alert-label-container">
                            <h2>A L L - A L E R T S</h2>
                        </div>
                        <div className="alertlist-container">
                            <div className="alert-scroll-container">
                                {alerts.map((alert, index) => (
                                    <div key={index} className="alertslist-report-forum">
                                        <p style={{ fontSize: '18px' }}><strong>Type of Incident:</strong> {alert.typeOfIncident}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Date:</strong> {alert.date}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Time:</strong> {alert.time}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Location:</strong> {alert.exactLocation}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Incident Details:</strong> {alert.incidentDetails}</p>
                                    </div>
                                ))}

                                {submitted && (
                                    <div className="alertslist-report-forum">
                                        <p style={{ fontSize: '18px' }}><strong>Type of Incident:</strong> {submittedIncidentType}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Date:</strong> {date}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Time:</strong> {time}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Location:</strong> {location}</p>
                                        <p style={{ fontSize: '18px' }}><strong>Incident Details:</strong> {incidentDetails}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Report Forum Box */}
                        <div className="report-label-container">
                            <h2>R E P O R T - F O R U M</h2>
                        </div>
                        <div className="report-container">
                            {alerts.map((alert, index) => (
                                <div key={index} className='alerts-report-forum'>
                                    <div>
                                        <strong>A L E R T !</strong>
                                    </div>
                                    <div>
                                        Type of Incident: {alert.typeOfIncident}
                                    </div>
                                    <div>
                                        Date: {alert.date}
                                    </div>
                                    <div>
                                        Location: {alert.exactLocation}
                                    </div>
                                    <div>
                                        Detailed Incident: {alert.incidentDetails}
                                    </div>
                                    <button
                                        className="report-delete-button"
                                        onClick={() => handleDelete(alert.adminemergencyId, alert.emergencyId, index, alert.isAdminEmergency)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminIncidentReport;
