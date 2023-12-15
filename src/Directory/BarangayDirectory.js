import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import "./BarangayDirectory.css";

const OfficialsList = () => {
  const [officials, setOfficials] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);

  useEffect(() => {
    // Fetch data from the Spring Boot API
    axios.get('http://localhost:8080/admindirectorylist/getAllAdminDirectoryList')
      .then(response => {
        setOfficials(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
        {officials.map((official) => (
          <div key={official.id} className="official-card">
            <img
              src={official.imageName}
              alt={official.imageName}
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
            <h1 style={{ justifyContent: 'center', display: 'flex', alignContent: 'center' }}>D E T A I L S</h1>
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
