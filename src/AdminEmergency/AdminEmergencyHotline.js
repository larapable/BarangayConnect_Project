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

    const handleAddHotline = () => {
        if (newHotline.name && newHotline.number) {
            setHotlines((prevHotlines) => [
                ...prevHotlines,
                {
                    id: prevHotlines.length + 1,
                    name: newHotline.name,
                    number: newHotline.number,
                },
            ]);

            setNewHotline({ name: '', number: '' });
        }
    };

    const openEditModal = (id) => {
        const hotlineToEdit = hotlines.find((hotline) => hotline.id === id);
        setEditingHotline(hotlineToEdit);
    };

    const closeEditModal = () => {
        setEditingHotline(null);
    };

    const handleEditHotline = () => {
        if (editingHotline) {
            const updatedHotlines = hotlines.map((hotline) =>
                hotline.id === editingHotline.id
                    ? { ...hotline, name: editingHotline.name, number: editingHotline.number }
                    : hotline
            );

            setHotlines(updatedHotlines);
            closeEditModal();
        }
    };

    const handleDeleteHotline = (id) => {
        const updatedHotlines = hotlines.filter((hotline) => hotline.id !== id);
        setHotlines(updatedHotlines);
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
                        hotline.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <div className="edit-container">
                        <h2>Edit Hotline</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Title"
                            value={editingHotline.name}
                            onChange={(event) => handleInputChange(event, true)}
                            className='edit-title'
                        />
                        <br/>
                        <input
                            type="text"
                            name="number"
                            placeholder="Hotline number"
                            value={editingHotline.number}
                            onChange={(event) => handleInputChange(event, true)}
                            className='edit-number'
                        />
                        <br/>

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
