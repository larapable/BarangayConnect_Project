import { Card, Grid } from "@mui/material";
import Header from "../../BarangayConnect_Project/src/Header";
import { useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function CommunityCalendar() {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState(null);

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
          <h1 style={{color: "white", marginLeft: "50px", marginTop: "50px", fontSize: "45px"}}>
            EVENTS:
          </h1>
        </div>
      </Grid>
    </div>
  );
}
