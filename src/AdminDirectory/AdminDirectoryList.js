import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './AdminDirectoryList.css';

const AdminDirectoryList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newBarangayWorker, setNewBarangayWorker] = useState({ name: '', email: '', age: '', status: '', birthdate: '', position: '', message: '' });
    const [validationMessage, setValidationMessage] = useState('');
    const [workers, setWorkers] = useState([]);
    const [editingWorkers, setEditingWorkers] = useState(null); // Initialize as null

    useEffect(() => {
        // Fetch workers from the backend when the component mounts
        fetch('http://localhost:8080/admindirectorylist/getAllAdminDirectoryList')
            .then(response => response.json())
            .then(data => setWorkers(data))
            .catch(error => console.error('Error fetching workers:', error));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (event, isEditing) => {
        const { name, value } = event.target;

        if (isEditing) {
            // Editing worker
            setEditingWorkers((prevWorker) => ({
                ...prevWorker,
                [name]: value,
            }));
        } else {
            // New worker
            setNewBarangayWorker((prevWorker) => ({
                ...prevWorker,
                [name]: value,
            }));
        }
    };

    const handleSubmitWorker = async () => {
        try {
            // Check if all required fields are filled
            if (!newBarangayWorker.name || !newBarangayWorker.email || !newBarangayWorker.age || !newBarangayWorker.status
                || !newBarangayWorker.birthdate || !newBarangayWorker.position || !newBarangayWorker.message) {
                setValidationMessage('Please fill in all required fields.');
                return;
            }

            // Reset validation message
            setValidationMessage('');

            // Correct the date format to "YYYY-MM-DD"
            const formattedDate = newBarangayWorker.birthdate.split('/').reverse().join('-');

            // Update the birthdate with the corrected format
            newBarangayWorker.birthdate = formattedDate;

            // Make the HTTP request to your Spring Boot backend
            const response = await fetch('http://localhost:8080/admindirectorylist/insertAdminDirectoryList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBarangayWorker),
            });

            // Check if the response is successful
            if (!response.ok) {
                // Handle non-successful response
                const errorMessage = await response.text(); // Get error message from the server
                throw new Error(`Error adding worker: ${response.status} - ${errorMessage}`);
            }

            // Update state to include the new worker from the response
            const data = await response.json();
            setWorkers((prevWorkers) => [...prevWorkers, data]);

            // Clear the form fields after the request completes
            setNewBarangayWorker({
                name: '',
                email: '',
                age: '',
                status: '', // Set default status or any other initial value
                birthdate: '',
                position: '',
                message: '',
            });
        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error.message);
            // Display a user-friendly error message to the user
            setValidationMessage('An error occurred while adding the worker. Please try again.');
        }
    };

    const openEditModal = (id) => {
        const workerToEdit = workers.find((worker) => worker.admindirectorylistId === id);
        setEditingWorkers(workerToEdit || null); // Set to workerToEdit if found, otherwise set to null
    };

    const closeEditModal = () => {
        setEditingWorkers(null);
    };

    const handleEditWorker = async () => {
        try {
            if (editingWorkers && editingWorkers.admindirectorylistId) {
                // Correct the date format to "YYYY-MM-DD"
                const formattedDate = editingWorkers.birthdate.split('/').reverse().join('-');

                // Update the birthdate with the corrected format
                editingWorkers.birthdate = formattedDate;

                // Make the HTTP request to update the worker
                const response = await fetch(
                    `http://localhost:8080/admindirectorylist/updateAdminDirectoryList/${editingWorkers.admindirectorylistId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editingWorkers),
                    }
                );

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Error updating worker: ${response.status} - ${errorMessage}`);
                }

                // Update state with the edited worker data
                setWorkers((prevWorkers) =>
                    prevWorkers.map((worker) =>
                        worker.admindirectorylistId === editingWorkers.admindirectorylistId
                            ? { ...worker, age: editingWorkers.age }
                            : worker
                    )
                );

                closeEditModal();
            }
        } catch (error) {
            console.error('Error updating worker:', error.message);
        }
    };

    const handleDeleteWorker = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/admindirectorylist/deleteAdminDirectoryList/${id}?delete=true`,
                {
                    method: 'DELETE',
                }
            );
    
            if (response.ok) {
                setWorkers((prevWorkers) =>
                    prevWorkers.filter((worker) => worker.admindirectorylistId !== id)
                );
                console.log('Worker deleted successfully.');
    
                // Display a popup to the user
                window.alert('Worker deleted successfully.');
            } else {
                console.error('Error deleting worker:', response.statusText);
                // Display an error popup to the user
                window.alert(`Error deleting worker: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting worker:', error.message);
            // Display an error popup to the user
            window.alert(`Error deleting worker: ${error.message}`);
        }
    };    

    return (
        <div>
            <Header />

            <div className="directory-container">
                <h1 className="add-barangay-heading">
                    Add Barangay Workers
                </h1>

                <h4 className='h4'> Full Name:</h4>
                <textarea
                    type="text"
                    name="name"
                    className="fullname-textarea"
                    value={newBarangayWorker.name}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                />

                <h4 className="h4">Email Address:</h4>
                <textarea
                    type="text"
                    name="email"
                    className="email-textarea"
                    value={newBarangayWorker.email}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                />

                <h4 className="h4">Age:</h4>
                <textarea
                    type="text"
                    name="age"
                    className="age-textarea"
                    value={newBarangayWorker.age}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                />

                <h4 className="h4">Marital Status:</h4>
                <select
                    name="status"
                    className="marital-status-dropdown"
                    value={newBarangayWorker.status}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                </select>


                <h4 className="h4">Birthdate:</h4>
                <input
                    type="date"
                    name="birthdate"
                    className="birthdate-textarea"
                    value={newBarangayWorker.birthdate}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                />

                <h4 className="h4">Position:</h4>
                <textarea
                    type="text"
                    name="position"
                    className="position-textarea"
                    value={newBarangayWorker.position}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                />

                <h4 className="h4">Message:</h4>
                <textarea
                    type="text"
                    name="message"
                    className="message-textarea"
                    value={newBarangayWorker.message}
                    onChange={(event) => handleInputChange(event, false)}
                    required
                />

                {validationMessage && <p className="validation-message">{validationMessage}</p>}
                <button className="submit-button" onClick={handleSubmitWorker}>
                    Submit
                </button>
            </div>

            <div className="workers-container" style={{ maxHeight: '830px', overflowY: 'auto' }}>
                <h1 className="workers-list-heading">Barangay Workers:</h1>
                <input
                    type="text"
                    placeholder="Search workers"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-workers"
                />
                {workers
                    .filter((worker) =>
                        worker.name && worker.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((worker) => (
                        <div key={worker.admindirectorylistId} className="worker-details">
                            <div>
                                <div className="worker-name">{worker.name}</div>
                                <div className="worker-info">
                                    Position: {worker.position}<br />
                                </div>
                            </div>
                            <div className="worker-actions">
                                <button className="worker-edit-button" onClick={() => openEditModal(worker.admindirectorylistId)}>
                                    Edit
                                </button>
                                <button className="worker-delete-button" onClick={() => handleDeleteWorker(worker.admindirectorylistId)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

            </div>

            {editingWorkers && (
                <div className="overlay">
                    <div className="directory-edit-container">
                        <h2>Edit Worker</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={editingWorkers.name}
                            onChange={(event) => handleInputChange(event, true)}
                            className='fullname-textarea'
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={editingWorkers.email}
                            onChange={(event) => handleInputChange(event, true)}
                            className='email-textarea'
                        />
                        <input
                            type="text"
                            name="age"
                            placeholder="Age"
                            value={editingWorkers.age}
                            onChange={(event) => handleInputChange(event, true)}
                            className='age-textarea'
                        />
                        <select
                            name="status"
                            value={editingWorkers.status}
                            onChange={(event) => handleInputChange(event, true)}
                            className='marital-status-dropdown'
                        >
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                        <input
                            type="date"
                            name="birthdate"
                            placeholder="Birthdate"
                            value={editingWorkers.birthdate}
                            onChange={(event) => handleInputChange(event, true)}
                            className='birthdate-textarea'
                        />
                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={editingWorkers.position}
                            onChange={(event) => handleInputChange(event, true)}
                            className='position-textarea'
                        />
                        <textarea
                            type="text"
                            name="message"
                            placeholder="Message"
                            value={editingWorkers.message}
                            onChange={(event) => handleInputChange(event, true)}
                            className='message-textarea'
                        />
                        <button className="save-button" onClick={handleEditWorker}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={closeEditModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDirectoryList;