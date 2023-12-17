// EmergencyAlertList.js

import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './EmergencyAlertList.css'; // Import the CSS file

const EmergencyAlertList = () => {
    const [hotlines, setHotlines] = useState([]);
    const [incidentDetails, setIncidentDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch hotline numbers from the backend when the component mounts
        fetchHotlineData();
        // Fetch incident details from the backend when the component mounts
        fetchEmergencyData();
    }, []);

    const fetchHotlineData = async () => {
        try {
            const response = await fetch('http://localhost:8080/hotlines/getAllHotlineNumbers');
            if (!response.ok) {
                throw new Error(`Failed to fetch hotline data: ${response.status}`);
            }
            const data = await response.json();
            setHotlines(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchEmergencyData = async () => {
        try {
            const response = await fetch('http://localhost:8080/emergency/getAllEmergency');
            if (!response.ok) {
                throw new Error(`Failed to fetch emergency data: ${response.status}`);
            }
            const data = await response.json();
            setIncidentDetails(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const AlertBox = ({ typeOfIncident, date, location, detailedIncident }) => (
        <div className='alerts'>
            <div>
                <strong>A L E R T !</strong>
            </div>
            <div>
                Type of Incident: {typeOfIncident}
            </div>
            <div>
                Date: {date}
            </div>
            <div>
                Location: {location}
            </div>
            <div>
                Detailed Incident: {detailedIncident}
            </div>
        </div>
    );

    return (
        <div>
            <div>
                {/* Header */}
                <Header />
                <div style={{ display: 'flex' }}>
                    {/* Left side: Hotline List */}
                    <div className='hotlinelist'>
                        <h2 style={{ color: '#fff' }}>Emergency Hotlines:</h2>
                        <input
                            type="text"
                            placeholder="Search hotlines"
                            value={searchTerm}
                            onChange={handleSearch}
                            className='searchhotline'
                        />
                        {hotlines
                            .filter((hotline) =>
                                hotline.title.toLowerCase().includes(searchTerm.toLowerCase()) && hotline.isdelete == 0
                            )
                            .map((hotline) => (
                                <div key={hotline.hotlineId} style={{ marginTop: '20px' }}>
                                    <div className='hotlinenumbers'>
                                        <div style={{ fontWeight: 'bolder' }}>
                                            {hotline.title} <br />
                                        </div>
                                        <div style={{ color: 'red' }}>
                                            Number: {hotline.hotlinenumber}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Right side: Incident Details */}
                    <div style={{ overflowY: 'auto', height: '875px' }}>
                        <div style={{ fontWeight: 'bolder' }}>
                            <h1 className='alert-label'>A L E R T !</h1>
                            {incidentDetails.length > 0 ? (
                                incidentDetails.map((incident) => (
                                    <AlertBox
                                        key={incident.emergencyId}
                                        typeOfIncident={incident.typeOfIncident}
                                        date={incident.date}
                                        location={incident.exactLocation}
                                        detailedIncident={incident.incidentDetails}
                                    />
                                ))
                            ) : (
                                <p>No incident reports available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyAlertList;
