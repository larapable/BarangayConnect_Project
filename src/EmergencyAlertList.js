import React, { useState } from 'react';
import Header from './Header';
import './EmergencyAlertList.css'; // Import the CSS file

const EmergencyAlertList = () => {

    const hotlines = [
        { id: 1, name: 'Barangay Hall', number: '249-1564' },
        { id: 2, name: 'Barangay Ambulance', number: '254-1445' },
        { id: 3, name: 'Tisa Fire Station', number: '345-7889' },
        { id: 4, name: 'Tisa Police Station', number: '455-1224' },
        { id: 5, name: 'Tisa Health Center', number: '249-1564' },
        { id: 6, name: 'Tisa Traffic Enforcement Service', number: '859-9999' },
        { id: 7, name: 'Tisa Water System', number: '789-4134' },
        // Add more hotlines as needed
    ];

    const [incidentDetails, setIncidentDetails] = useState({
        type: '',
        date: '',
        location: '',
        detailedIncident: '',
        sentDate: '',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [alertText, setAlertText] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

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
                                hotline.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((hotline) => (
                                <div style={{ marginTop: '20px' }}>
                                    <div className='hotlinenumbers'>
                                        <div style={{ fontWeight: 'bolder' }}>
                                            {hotline.name} <br />
                                        </div>
                                        <div style={{ color: 'red' }}>
                                            Number: {hotline.number}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Right side: Incident Details */}
                    <div className='incidentdetails'>
                        <div style={{ fontWeight: 'bolder' }}>
                            <h1 style={{ marginTop: '5px', marginBottom: '5px' }}>A L E R T !</h1>
                            Type of Incident: {incidentDetails.type} <br />
                            Date: {incidentDetails.date} <br />
                            Location: {incidentDetails.location} <br />
                            Detailed Incident: {incidentDetails.detailedIncident} <br />
                            Sent Date: {incidentDetails.sentDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyAlertList;
