import { Button, Card, Grid } from "@mui/material";
import Header from "../Header";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import "./CC.css";

export default function AdminCalendar() {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState(null);
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
              ></input>
              <h1 style={{ color: "white" }}>Event description:</h1>
              <input
                type="text"
                id="description"
                name="description"
                className="input-design"
              ></input>
              <h1 style={{ color: "white" }}>Event location:</h1>
              <input
                type="text"
                id="location"
                name="location"
                className="input-design"
              ></input>
              <h1 style={{ color: "white" }}>Event time:</h1>
              <input
                type="text"
                id="time"
                name="time"
                className="input-design"
              ></input>

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
              >
                Add Event
              </Button>
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
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <div style={{ textAlign: "center" }}>
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
              </div>
            </div>
          </LocalizationProvider>
        </Grid>
      </div>
    </div>
  );
}
