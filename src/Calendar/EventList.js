import Header from "../Header";
import React, { useState, useEffect } from "react";
import "./CC.css";

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

  const handleUpdate = (id) => {
    // Handle update logic here
  };

  const handleDelete = (id) => {
    // Handle delete logic here
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2> Event title: {event.title}</h2>
              <p> Description: {event.description}</p>
              <p>Location: {event.location}</p>
              <p>Time: {event.time}</p>
              <p>Date: {event.date}</p>
              <button onClick={() => handleUpdate(event.id)}>Update</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
