import './AdminRequest.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Link } from '@mui/material';
import Header from '../Header';

function AdminRequest() {
  const [requests, setRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/requests/getAllRequest`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request not found');
      }

      const allRequests = await response.json();

      // Filter out requests that are marked as deleted
      const activeRequests = allRequests.filter((request) => !request.isDeleted);
      setRequests(activeRequests);

      console.log('Successfully fetched user information');
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const confirmDeleteRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/requests/deleteRequest/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Try to parse error response
        throw new Error(`Failed to delete request: ${errorResponse.message}`);
      }

      // After successful deletion, fetch the updated list of requests
      fetchRequests();
      setShowDeleteConfirmation(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error deleting request:', error.message);
    }
  };

  const handleDeleteRequest = (requestId) => {
    setRequestToDelete(requestId);
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteRequest = () => {
    setRequestToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
       <div>
        <Header />
      </div>
      <div className="request-img2">
        <div
          style={{
            backgroundImage: 'url("/tisa_logo.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Table Section */}
          <table
            style={{
              width: '80%',
              margin: 'auto',
              marginTop: '50px',
              border: '3px solid black',
            }}
          >
            <thead>
              <tr>
                <th className="request-table">RequestID</th>
                <th className="request-table">UserID</th>
                <th className="request-table">Username</th>
                <th className="request-table">Document_Status</th>
                <th className="request-table">Summary_Details</th>
                <th className="request-table">Delete_Request</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request?.docid}>
                  <td className="request-table2">{request?.docid}</td>
                  <td className="request-table2">{request?.user?.id}</td>
                  <td className="request-table2">{request?.user?.username}</td>
                  <td className="request-table2">{request?.track}</td>
                  <td className="request-table2">
                    <Button variant="contained" onClick={() => handleViewDetails(request)}>
                      VIEW_DETAILS
                    </Button>
                  </td>
                  <td className="request-table2">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'red' }}
                      onClick={() => handleDeleteRequest(Number(request.docid))}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       {/* Popup Modal for Verification */}
          <Modal open={showPopup} onClose={handleClosePopup}>
            <div className="popup3">
              {/* Display input values for verification */}
              <h1>Request Summary Details</h1>
              {selectedRequest && (
                <>
                  <p className='request-p'>Lastname: {selectedRequest.lastname}</p>
                  <p className='request-p'>Firstname: {selectedRequest.firstname}</p>
                  <p className='request-p'>Middlename: {selectedRequest.middlename}</p>
                  <p className='request-p'>Suffix: {selectedRequest.suffix}</p>
                  <p className='request-p'>Birthdate: {selectedRequest.birthdate}</p>
                  <p className='request-p'>Age: {selectedRequest.age}</p>
                  <p className='request-p'>Purok: {selectedRequest.purok}</p>
                  <p className='request-p'>Purpose: {selectedRequest.purpose}</p>
                  <p className='request-p'>Document Type: {selectedRequest.doctype}</p>
                  <p className='request-p'>Type: {selectedRequest.type}</p>
                  <p className='request-p'>Number of Copies: {selectedRequest.numcopies}</p>
                  <p className='request-p'>Email: {selectedRequest.email}</p>
                  <p className='request-p'>Contact Number: {selectedRequest.contactnum}</p>
                </>
              )}
              <Link to="/adminrequest">
                {/* Close button */}
                <Button
                  variant="contained"
                  onClick={handleClosePopup}
                  style={{
                    color: '#FFFFFF',
                    background: '#213555',
                    borderRadius: '10px',
                    width: '150px',
                    fontWeight: 'bold',
                    marginTop: '20px',
                    marginLeft:'120px'
                  }}
                >
                  Done
                </Button>
              </Link>
            </div>
          </Modal>
           {/* Delete Confirmation Modal */}
      <Modal open={showDeleteConfirmation} onClose={cancelDeleteRequest}>
        <div className="popup3">
          <h1>Delete Confirmation</h1>
          <p>Are you sure you want to delete this request?</p>
          <Link to="/adminrequests">
          <Button
            variant="contained"
            onClick={() => confirmDeleteRequest(requestToDelete)}
            style={{
              color: '#FFFFFF',
              background: '#213555',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
              marginRight: '10px',
            }}
          >
            Yes
          </Button>
          </Link>
          <Button
            variant="contained"
            onClick={cancelDeleteRequest}
            style={{
              color: '#FFFFFF',
              background: '#FF0000',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
            }}
          >
            No
          </Button>
        </div>
      </Modal>
       {/* Success Modal */}
       <Modal open={showSuccessModal} onClose={handleCloseSuccessModal}>
        <div className="popup3">
          <h1>Deletion Successful</h1>
          <p>The request has been successfully deleted.</p>
          <Button
            variant="contained"
            onClick={handleCloseSuccessModal}
            style={{
              color: '#FFFFFF',
              background: '#213555',
              borderRadius: '10px',
              width: '150px',
              fontWeight: 'bold',
              marginTop: '20px',
              marginLeft:'50px'
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
        </div>
      </div>
    </div>
  );
}

export default AdminRequest;
