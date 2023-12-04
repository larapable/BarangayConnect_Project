import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './AdminEmergencyHotline.css';

const AdminEmergencyHotline = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newHotline, setNewHotline] = useState({ name: '', number: '' });
    const [hotlines, setHotlines] = useState(() => {
        const storedHotlines = localStorage.getItem('hotlines');
        return storedHotlines ? JSON.parse(storedHotlines) : [];
    });

    const [editingHotline, setEditingHotline] = useState(null);
    const [nextId, setNextId] = useState(1); // Initial ID value

    useEffect(() => {
        localStorage.setItem('hotlines', JSON.stringify(hotlines));
    }, [hotlines]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (event, isEditing) => {
        const { name, value } = event.target;

        if (isEditing) {
            // Editing hotline
            setEditingHotline((prevHotline) => ({
                ...prevHotline,
                [name]: value,
            }));
        } else {
            // New hotline
            setNewHotline((prevHotline) => ({
                ...prevHotline,
                [name]: value,
            }));
        }
    };

    const handleAddHotline = async () => {
        try {
            // Check if all required fields are filled
            if (!newHotline.name || !newHotline.number) {
                console.error('Please fill in all required fields.');
                return;
            }

            // Make the HTTP request to your Spring Boot backend
            const response = await fetch('http://localhost:8080/hotlines/insertHotlineNumbers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newHotline.name,         // Update to use 'title' instead of 'name'
                    hotlinenumber: newHotline.number // Update to use 'hotlinenumber' instead of 'number'
                }),
            });

            // Check if the response is successful
            if (!response.ok) {
                // Handle non-successful response
                const errorMessage = await response.text(); // Get error message from the server
                throw new Error(`Error adding hotline: ${response.status} - ${errorMessage}`);
            }

            // Update state to include the new hotline from the response
            const addedHotline = await response.json();
            setHotlines((prevHotlines) => [
                ...prevHotlines,
                {
                    id: nextId, // Assign the current nextId as the ID
                    name: addedHotline.title,
                    number: addedHotline.hotlinenumber,
                },
            ]);

            // Increment the nextId for the next added hotline
            setNextId((prevId) => prevId + 1);

            // Clear the form fields after the request completes
            setNewHotline({ name: '', number: '' });
        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error.message);
            // Display a user-friendly error message to the user
            console.error('An error occurred while adding the hotline. Please try again.');
        }
    };


    const openEditModal = (id) => {
        const hotlineToEdit = hotlines.find((hotline) => hotline.id === id);
        setEditingHotline(hotlineToEdit);
    };

    const closeEditModal = () => {
        setEditingHotline(null);
    };

    const handleEditHotline = async () => {
        try {
            if (editingHotline && editingHotline.id) {
                // Make the HTTP request to update the hotline
                const response = await fetch(
                    `http://localhost:8080/hotlines/updateAdminHotlineNumbers/${editingHotline.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: editingHotline.name,           // Update to use 'title' instead of 'name'
                            hotlinenumber: editingHotline.number  // Update to use 'hotlinenumber' instead of 'number'
                        }),
                    }
                );
    
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Error updating hotline: ${response.status} - ${errorMessage}`);
                }
    
                // Update state with the edited hotline data
                setHotlines((prevHotlines) =>
                    prevHotlines.map((hotline) =>
                        hotline.id === editingHotline.id
                            ? { ...hotline, name: editingHotline.name, number: editingHotline.number }
                            : hotline
                    )
                );
    
                closeEditModal();
            }
        } catch (error) {
            console.error('Error updating hotline:', error.message);
            // Handle any errors that occurred during the fetch
            window.alert('An error occurred while updating the hotline. Please try again.');
        }
    };
    

    const handleDeleteHotline = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/hotlines/deleteAdminHotlineNumbers/${id}?delete=true`,
                {
                    method: 'DELETE',
                }
            );

            if (response.ok) {
                setHotlines((prevHotlines) =>
                    prevHotlines.filter((hotline) => hotline.id !== id)
                );
                console.log('Hotline deleted successfully.');

                // Display a popup to the user
                window.alert('Hotline deleted successfully.');
            } else {
                console.error('Error deleting hotline:', response.statusText);
                // Display an error popup to the user
                window.alert(`Error deleting hotline: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting hotline:', error.message);
            // Display an error popup to the user
            window.alert(`Error deleting hotline: ${error.message}`);
        }
    };

    return (
        <div>
            <Header />

            <div className="emergency-container">
                <h1 className="add-hotline-heading">
                    Add New Emergency <br /> Hotline Number
                </h1>
                <input
                    type="text"
                    name="name"
                    className="hotline-textarea"
                    placeholder="Title"
                    value={newHotline.name}
                    onChange={(event) => handleInputChange(event, false)}
                />

                <input
                    type="text"
                    name="number"
                    className="hotline-textarea"
                    placeholder="Hotline number"
                    value={newHotline.number}
                    onChange={(event) => handleInputChange(event, false)}
                />

                <button className="clear-button" onClick={() => setNewHotline({ name: '', number: '' })}>
                    Clear
                </button>

                <button className="add-button" onClick={handleAddHotline}>
                    Add
                </button>
            </div>

            <div className="hotlines-container" style={{ maxHeight: '830px', overflowY: 'auto' }}>
                <h1 className="hotline-list-heading">Emergency Hotline:</h1>
                <input
                    type="text"
                    placeholder="Search hotlines"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-hotline"
                />
                {hotlines
                    .filter((hotline) =>
                        hotline.name && hotline.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((hotline) => (
                        <div key={hotline.id} className="hotline-number">
                            <div>
                                <div className="hotline-name">{hotline.name}</div>
                                <div className="hotline-info">Number: {hotline.number}</div>
                            </div>
                            <div className="hotline-actions">
                                <button className="hotline-edit-button" onClick={() => openEditModal(hotline.id)}>
                                    Edit
                                </button>
                                <button className="hotline-delete-button" onClick={() => handleDeleteHotline(hotline.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {editingHotline && (
                <div className="overlay">
                    <div className="hotline-edit-container">
                        <h2>Edit Hotline</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Title"
                            value={editingHotline.name}
                            onChange={(event) => handleInputChange(event, true)}
                            className='edit-title'
                        />
                        <br />
                        <input
                            type="text"
                            name="number"
                            placeholder="Hotline number"
                            value={editingHotline.number}
                            onChange={(event) => handleInputChange(event, true)}
                            className='edit-number'
                        />
                        <br />

                        <button className="save-button" onClick={handleEditHotline}>
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

export default AdminEmergencyHotline;
