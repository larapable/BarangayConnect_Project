import React, { useState } from 'react';
import Header from '../Header';
import "./BarangayDirectory.css";

const BarangayDirectory = [
    {
        id: 1,
        name: 'John Doe',
        position: 'Barangay Captain',
        image: '1-official.jpeg', // replace with the actual image file path
        email: 'john.doe@example.com',
        age: 35,
        maritalStatus: 'Married',
        birthdate: '1988-05-15',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 2,
        name: 'James Reid',
        position: 'Barangay Secretary',
        image: '2-official.jpeg', // replace with the actual image file path
        email: 'jane.smith@example.com',
        age: 28,
        maritalStatus: 'Single',
        birthdate: '1995-11-20',
        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        id: 3,
        name: 'Jane Smith',
        position: 'Barangay Secretary',
        image: '3-official.jpeg', // replace with the actual image file path
        email: 'jane.smith@example.com',
        age: 28,
        maritalStatus: 'Single',
        birthdate: '1995-11-20',
        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        id: 4,
        name: 'Johnny Bravo',
        position: 'Barangay Secretary',
        image: '4-official.jpeg', // replace with the actual image file path
        email: 'jane.smith@example.com',
        age: 28,
        maritalStatus: 'Single',
        birthdate: '1995-11-20',
        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    // Add more officials as needed
];

const OfficialsList = () => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedOfficial, setSelectedOfficial] = useState(null);

    const handleViewDetails = (official) => {
        setSelectedOfficial(official);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailsModal(false);
    };

    return (
        <div>
          <Header />
          <div className="intro-section">
            <h1>ILA - ILA KITA!</h1>
            <p>
              "We extend a warm welcome to our esteemed Barangay Officials! This directory has been created to enhance our community's connectivity and efficiency. It's designed with features tailored to facilitate your responsibilities and communication. From providing easy access to your contact information to streamlining residents' inquiries and feedback, this platform is here to support and empower you in serving our community. We value your dedication, and we're committed to making your tasks more manageable and transparent. Welcome, and thank you for your continuous dedication to our barangay!"
            </p>
          </div>
    
          <div className="officials-container">
            {BarangayDirectory.map((official) => (
              <div key={official.id} className="official-card">
                <img
                  src={official.image}
                  alt={official.name}
                  className="official-image"
                />
                <div>
                  <p className="official-name">{official.name}</p>
                  <p className="official-position">{official.position}</p>
                  <button
                    className="view-details-button"
                    onClick={() => handleViewDetails(official)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
    
          {showDetailsModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h1 style={{justifyContent: 'center', display: 'flex', alignContent: 'center'}}>D E T A I L S</h1>
                <div className="details-container">
                  <p>Full Name: {selectedOfficial.name}</p>
                  <p>Email Address: {selectedOfficial.email}</p>
                  <p>Age: {selectedOfficial.age}</p>
                  <p>Marital Status: {selectedOfficial.maritalStatus}</p>
                  <p>Birthdate: {selectedOfficial.birthdate}</p>
                  <p>Postion: {selectedOfficial.position}</p>
                  <p>Message: {selectedOfficial.message}</p>
                  <button
                    className="close-button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

export default OfficialsList;
