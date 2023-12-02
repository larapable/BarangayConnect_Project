import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import "./AnnAdmin.css";

function BLSidebar({ announcements, 
    onAddAnnouncementNote, 
    onDeleteAnnouncementNote, 
    activeAnnouncement, 
    setActiveAnnouncement 
}){

const sortedAnnouncement = announcements.sort((a, b) => b.date - a.date) 

const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); //added
const [announcementToDelete, setAnnouncementToDelete] = useState(null); //added

  const handleDeleteClick = (id) => {
    console.log("Delete clicked for ID:", id);
    setAnnouncementToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    console.log("Delete confirmed for ID:", announcementToDelete);
    onDeleteAnnouncementNote(announcementToDelete);
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteCancel = () => {
    console.log("Delete canceled");
    setDeleteDialogOpen(false);
  };


return <div className="app-sidebar">
<div className="app-sidebar-header">
<h1>Local Announcement</h1>
<button onClick={onAddAnnouncementNote}>Add</button>
</div>

<div className="app-sidebar-notes">

{sortedAnnouncement.map((announcement) => (

<div className={`app-sidebar-note ${announcement.id === activeAnnouncement && "active"}`}
    onClick={() => setActiveAnnouncement(announcement.id)}>
        
    <div className="sidebar-note-title">

        <strong>{announcement.title}</strong>
        <button onClick={() => handleDeleteClick(announcement.id)}>Delete</button>

    </div>

    <p>{announcement.content && announcement.content.substr(0, 100) + "..."}</p>


    <small className="note-meta">
        Last modified {new Date(announcement.date).toLocaleDateString("en-GB", {})} 
    </small>
</div>
))}

</div>
{/* Dialog for delete confirmation */}
<Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{ style: { backgroundColor: "#E0E0E0" } }}
      >
        <DialogTitle
          style={{
            margin: "auto",
            textAlign: "center",
            color: "#213555",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
        <img src={"deleteicon.png"} alt="Check Button" className="deleteicon" />

          Are you sure you want to delete this announcement?
        </DialogTitle>
        <DialogActions>
          <Button
            style={{
              backgroundColor: "#213555",
              marginBottom: "10px",
              width: "300px",
            }}
            onClick={handleDeleteConfirm}
            variant="contained"
          >
            Yes
          </Button>
          <Button
            style={{
              backgroundColor: "#213555",
              marginBottom: "10px",
              width: "300px",
            }}
            onClick={handleDeleteCancel}
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

</div>;

}

export default BLSidebar;