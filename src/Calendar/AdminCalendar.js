import { Button, Card, Grid } from "@mui/material";
import Header from "../Header";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import "./CC.css";
import { Link } from "react-router-dom";

export default function AdminCalendar() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState(null);

  const addEvent = async (event) => {
    // Check if required fields are filled
    if (
      !eventTitle ||
      !eventDescription ||
      !eventLocation ||
      !eventTime ||
      !eventDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    event.preventDefault();

    // Create a new Date object from eventDate and format it to "yyyy/mm/dd"
    const eventDateObj = new Date(eventDate);
    const formattedDate = eventDateObj.toLocaleDateString("en-CA");

    console.log("Submitting:", {
      eventTitle,
      eventDescription,
      eventLocation,
      eventTime,
      eventDate: formattedDate,
    });

    try {
      const response = await fetch("http://localhost:8080/event/addEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTitle,
          eventDescription,
          eventLocation,
          eventTime,
          eventDate: formattedDate,
        }),
      });

      if (response.ok) {
        console.log("Information successfully added");
        // Clear the input fields
        setEventTitle("");
        setEventDescription("");
        setEventLocation("");
        setEventTime("");
        setEventDate(null);
      } else {
        const data = await response.json();
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="admin-container">
      <div>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}
      >
        <Grid
          container
          style={{
            background: "#213555",
            width: "60%",
            display: "flex",
          }}
        >
          <div
            style={{
              background: `url('buildingbg.png')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
                textAlign: "left",
              }}
            >
              <h1 style={{ color: "white" }}>Event title:</h1>
              <input
                type="text"
                id="title"
                name="title"
                className="input-design"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              ></input>
              <h1 style={{ color: "white" }}>Event description:</h1>
              <input
                type="text"
                id="description"
                name="description"
                className="input-design"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              ></input>
              <h1 style={{ color: "white" }}>Event location:</h1>
              <input
                type="text"
                id="location"
                name="location"
                className="input-design"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              ></input>
              <h1 style={{ color: "white" }}>Event time:</h1>
              <input
                type="time"
                id="time"
                name="time"
                className="input-design"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              ></input>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "50px",
                    color: "#213555",
                    background: "white",
                    borderRadius: "10px",
                    width: "150px",
                    fontWeight: "bold",
                  }}
                  onClick={addEvent}
                >
                  Add Event
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          container
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            background: "#FFFFFF",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <h1
                style={{
                  color: "#BDBDBD",
                  textAlign: "center",
                  fontSize: "50px",
                  margin: "0",
                }}
              >
                Select a Date:
              </h1>
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
                    <h1
                      style={{
                        color: "white",
                        fontSize: "20px",
                        marginTop: "0",
                      }}
                    >
                      Calendar
                    </h1>
                  </h1>
                </div>
              </Card>
              <DateCalendar
                value={eventDate}
                onChange={(newValue) => setEventDate(newValue)}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Link to="/admincalendar/eventlist">
                  <Button
                    variant="contained"
                    style={{
                      marginTop: "30px",
                      color: "white",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "150px",
                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                  >
                    Event List
                  </Button>
                </Link>
              </div>
            </div>
          </LocalizationProvider>
        </Grid>
      </div>
    </div>
  );
}