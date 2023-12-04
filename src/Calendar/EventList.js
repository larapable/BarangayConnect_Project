import Header from "../Header";
import React, { useState, useEffect } from "react";
import "./CC.css";
import { Button, Paper } from "@mui/material";

export default function EventList() {
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/event/getAllEvent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
            height: "60vh", // Set a fixed height for the container
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
                margin: "15px",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
              className="event-list-paper"
              key={event.eventId}
            >
              <div style={{ margin: "0", padding: "10px" }}>
                <h2 style={{ margin: "0" }}>Event {event.eventId}</h2>
                <p style={{ fontSize: "18px", margin: "0" }}>
                  {event.eventTitle}
                </p>
              </div>

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
              >
                View Profile
              </Button>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
