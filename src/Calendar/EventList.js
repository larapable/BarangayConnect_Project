import Header from "../Header";
import React, { useState, useEffect } from "react";
import "./CC.css";
import { Button, Modal, Paper } from "@mui/material";

export default function EventList() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentEvent, setCurrentEvent] = useState({
    eventTitle: "",
    eventDescription: "",
    eventLocation: "",
    eventDate: "",
    eventTime: "",
  });

  const convertTo12Hour = (time) => {
    let [hours, minutes] = time.split(":");
    let period = +hours < 12 ? "AM" : "PM";
    hours = +hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8080/event/getAllEvent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request not found");
      }

      const allEvents = await response.json();
      const activeEvents = allEvents.filter((events) => !events.isDeleted);

      setEvents(activeEvents);
      console.log("Successfully fetched event information");
      console.log(events); // Add this line
    } catch (error) {
      console.error("Error fetching event information:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/event/updateEvent/${currentEvent.eventID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentEvent),
        }
      );

      if (response.ok) {
        setShowEditModal(false);
        setShowConfirmModal(false);
        fetchEvents();
      } else {
        console.error("Error updating announcement:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/event/deleteEvent/${eventToDelete.eventID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setShowDeleteModal(false);
      setShowSuccessModal(true);
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const showEditPopup = (eventID) => {
    const eventToEdit = events.find((event) => event.eventID === eventID);
    setCurrentEvent(eventToEdit);
    console.log("Editing event:", eventToEdit);
    setShowEditModal(true);
  };

  const showDeletePopup = (eventID) => {
    const eventToDelete = events.find((event) => event.eventID === eventID);
    setEventToDelete(eventToDelete);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  return (
    <div className="eventlist-bg">
      <div>
        <Header />
      </div>
      <div
        style={{
          background: `url('/buildingbg.png')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <h1 className="eventlist-title">EVENT LIST:</h1>
        <div
          style={{
            height: "65vh", // Set a fixed height for the container
            overflowY: "auto", // Enable vertical scrolling
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {events.map((event) => (
            <Paper
              elevation={3}
              style={{
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
              }}
              className="event-list-paper"
              key={event.eventID}
            >
              <div
                style={{
                  textAlign: "left",
                }}
              >
                <h1 style={{ margin: "0" }}>Event {event.eventID}</h1>
                <p style={{ fontSize: "16px", margin: "3px", color: "red" }}>
                  <b>{event.eventTitle}</b>
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    margin: "3px",
                    color: "gray",
                    fontStyle: "italic",
                  }}
                >
                  {event.eventDate} {convertTo12Hour(event.eventTime)}
                </p>
              </div>

              <div>
                <Button
                  variant="contained"
                  style={{
                    margin: "10px",
                    color: "white",
                    background: "#213555",
                    borderRadius: "10px",
                    width: "150px",
                    fontWeight: "bold",
                    justifyContent: "center",
                  }}
                  onClick={() => showEditPopup(event.eventID)}
                >
                  Edit Event
                </Button>

                <Button
                  variant="contained"
                  style={{
                    margin: "10px",
                    color: "white",
                    background: "#F24E1E",
                    borderRadius: "10px",
                    width: "150px",
                    fontWeight: "bold",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    showDeletePopup(event.eventID);
                  }}
                >
                  Delete Event
                </Button>
              </div>

              {/* Edit Modal */}
              <Modal
                open={showEditModal}
                sx={{
                  "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.1)" },
                }}
              >
                <div className="event-popup">
                  <div style={{ margin: "10px" }}>
                    <h1 style={{ color: "#213555" }}>Edit Event</h1>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "#213555",
                          fontWeight: "bold",
                        }}
                      >
                        Event Title:
                      </label>
                      <div style={{ alignItems: "center" }}>
                        <input
                          className="input-popup"
                          type="text"
                          name="eventTitle"
                          value={currentEvent.eventTitle}
                          onChange={handleInputChange}
                        />
                      </div>

                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "#213555",
                          fontWeight: "bold",
                        }}
                      >
                        Event Description:
                      </label>
                      <div style={{ alignItems: "center" }}>
                        <textarea
                          className="big-input-popup"
                          rows={4}
                          name="eventDescription"
                          value={currentEvent.eventDescription}
                          onChange={handleInputChange}
                        />
                      </div>

                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "#213555",
                          fontWeight: "bold",
                        }}
                      >
                        Event Location:
                      </label>
                      <div style={{ alignItems: "center" }}>
                        <input
                          className="input-popup"
                          type="text"
                          name="eventLocation"
                          value={currentEvent.eventLocation}
                          onChange={handleInputChange}
                        />
                      </div>
                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "#213555",
                          fontWeight: "bold",
                        }}
                      >
                        Event Date:
                      </label>
                      <div style={{ alignItems: "center" }}>
                        <input
                          className="input-popup"
                          type="date"
                          name="eventDate"
                          value={currentEvent.eventDate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <label
                        style={{
                          fontSize: "20px",
                          textAlign: "left",
                          color: "#213555",
                          fontWeight: "bold",
                        }}
                      >
                        Event Time:
                      </label>
                      <div style={{ textAlign: "center" }}>
                        <input
                          className="input-popup"
                          type="time"
                          name="eventTime"
                          value={currentEvent.eventTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        style={{
                          color: "#FFFFFF",
                          background: "#213555",
                          borderRadius: "10px",
                          width: "100px",
                          fontWeight: "bold",
                          marginTop: "20px",
                          marginRight: "10px",
                        }}
                        onClick={() => setShowConfirmModal(true)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          color: "#FFFFFF",
                          background: "#F24E1E",
                          borderRadius: "10px",
                          width: "100px",
                          fontWeight: "bold",
                          marginTop: "20px",
                          marginLeft: "10px",
                        }}
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>

              {/* Confirmation Modal */}
              <Modal
                open={showConfirmModal}
                sx={{
                  "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.1)" },
                }}
              >
                <div className="event-confirmation-popup">
                  <h2>Save Changes</h2>
                  <p>Do you want to save these changes?</p>
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        background: "#213555",
                        borderRadius: "10px",
                        width: "100px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginRight: "10px",
                      }}
                      onClick={handleUpdate}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        background: "#F24E1E",
                        borderRadius: "10px",
                        width: "100px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginLeft: "10px",
                      }}
                      onClick={() => setShowConfirmModal(false)}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* Delete Confirmation Modal */}
              <Modal
                open={showDeleteModal}
                sx={{
                  "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.1)" },
                }}
              >
                <div className="event-delete-popup">
                  <h2>Delete Event</h2>
                  <p>Are you sure you want to delete this Event?</p>
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        background: "#F24E1E",
                        borderRadius: "10px",
                        width: "100px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginRight: "10px",
                      }}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        background: "#213555",
                        borderRadius: "10px",
                        width: "100px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginLeft: "10px",
                      }}
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* Delete Success Modal */}
              <Modal
                open={showSuccessModal}
                sx={{
                  "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.1)" },
                }}
              >
                <div className="event-delete-popup">
                  <h2>Successfully Deleted</h2>
                  <p>The event has been successfully deleted.</p>
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        background: "#213555",
                        borderRadius: "10px",
                        width: "100px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        setShowSuccessModal(false);
                        fetchEvents();
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </Modal>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
