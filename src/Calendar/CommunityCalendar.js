import { Card, Grid, Paper } from "@mui/material";
import Header from "../Header";
import { useEffect, useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function CommunityCalendar() {
  const [value, setValue] = useState(null);
  const [events, setEvents] = useState([]);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div>
        <Header />
      </div>
      <Grid container style={{ flex: 1 }}>
        <div
          style={{
            height: "100%",
            width: "30%",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              marginLeft: "60px",
              marginTop: "160px",
              color: "#213555",
            }}
          >
            <h1 style={{ fontSize: "45px" }}>
              READY FOR AN
              <br /> EVENT?
            </h1>
          </div>
          <div
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              color: "#A8A2A2",
            }}
          >
            <p style={{ fontSize: "24px" }}>
              Stay in the loop with all the exciting events, gatherings, and
              activities happening in our vibrant community. Be sure to mark
              your calendar for your favorite events and don't miss out on the
              fun. We look forward to seeing you at our next event!
            </p>
          </div>
          <div
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              color: "#A8A2A2",
            }}
          >
            <p style={{ fontSize: "24px", marginTop: "50px" }}>
              Your community, your app - <br />
              Barangay Connect
            </p>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "30%",
            background: "#FFFFFF",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "200px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <Card
                  style={{
                    background: "#213555E6",
                    width: "auto",
                    height: "100px",
                    display: "flex",
                    justifyContent: "column",
                  }}
                >
                  <div style={{ alignItems: "left" }}>
                    <img
                      src={"buildingicon.png"}
                      alt="icon"
                      style={{
                        width: "80px",
                        height: "auto",
                        marginTop: "10px",
                        marginLeft: "10px",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginLeft: "20px" }}>
                    <h1 style={{ color: "white", fontSize: "24px" }}>
                      Community
                      <div>
                        <h1
                          style={{
                            color: "white",
                            fontSize: "22px",
                            marginTop: "0",
                          }}
                        >
                          Calendar
                        </h1>
                      </div>
                    </h1>
                  </div>
                </Card>
                <DateCalendar
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add the shadow style here
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "40%",
            background: "#213555",
          }}
        >
          <h1
            style={{
              color: "white",
              marginLeft: "50px",
              marginTop: "50px",
              fontSize: "45px",
            }}
          >
            EVENTS:
          </h1>
          <div
            style={{
              height: "70vh", // Set a fixed height for the container
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
              </Paper>
            ))}
          </div>
        </div>
      </Grid>
    </div>
  );
}
