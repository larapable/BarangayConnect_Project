import { Card, Grid, Paper } from "@mui/material";
import Header from "../Header";
import { useEffect, useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IoMdTime, IoMdPin } from "react-icons/io";
import Button from "@mui/material/Button";

export default function CommunityCalendar() {
  const [value, setValue] = useState(null);
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  //added
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

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
      setEvents(activeEvents.reverse());
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
        {/* add prev and next page here */}
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
          {/* ADDED */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                color: "#213555",
                marginLeft: "10px",
                borderRadius: "50px",
                backgroundColor: "white",
              }}
              variant="contained"
            >
              <span style={{ fontSize: "20px" }}>←</span>
            </Button>
            {/* <span>{`Page ${currentPage} of ${totalPages}`}</span> */}
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                color: "#ffffff",
                marginLeft: "10px",
                borderRadius: "50px",
                backgroundColor: "#3e77d3",
              }}
              variant="contained"
            >
              <span style={{ fontSize: "20px" }}>→</span>
            </Button>
          </div>

          <div
            style={{
              height: "70vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {currentEvents.map(
              (
                event //paper of title and date
              ) => (
                <Paper
                  elevation={3}
                  style={{
                    width: "80%",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    cursor: "pointer",
                    backgroundColor:
                      hoveredEvent === event.eventID ? "#F2F2F2" : "white",
                  }}
                  className="event-list-paper"
                  key={event.eventID}
                  onMouseEnter={() => setHoveredEvent(event.eventID)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <h1
                      style={{
                        margin: "0",
                        color: "#213555",
                        fontSize: "30px",
                      }}
                    >
                      {event.eventTitle}
                    </h1>
                    <p
                      style={{
                        fontSize: "18px",
                        margin: "3px",
                        color: "gray",
                        fontStyle: "italic",
                      }}
                    >
                      <IoMdTime
                        style={{ marginRight: "5px", fontSize: "18px" }}
                      />
                      {event.eventDate} {convertTo12Hour(event.eventTime)}
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        margin: "3px",
                        color: "gray",
                        fontStyle: "italic",
                      }}
                    >
                      <IoMdPin
                        style={{ marginRight: "5px", fontSize: "18px" }}
                      />
                      {event.eventLocation}
                    </p>
                  </div>

                  <Grid
                    className="descriptioncontainer"
                    data-motto={event.eventDescription}
                  ></Grid>
                </Paper>
              )
            )}
          </div>
        </div>
      </Grid>
    </div>
  );
}
