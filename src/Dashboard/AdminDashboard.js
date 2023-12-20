import AdminHeader from "../AdminHeader";
import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const totalResidents = "41, 360";

  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/login-signup/getAllUsers", {
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
      .then((data) => {
        setUsers(data);

        let maleCount = 0;
        let femaleCount = 0;

        data.forEach((user) => {
          if (user.gender === "Male") {
            maleCount += 1;
          } else if (user.gender === "Female") {
            femaleCount += 1;
          }
        });
        console.log("Male Count:", maleCount);
        console.log("Female Count:", femaleCount);

        // Update the state with the counts
        setMaleCount(maleCount);
        setFemaleCount(femaleCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/requests/getAllRequest`, {
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
      .then((data) => setRequests(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/event/getAllEvent`, {
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

  useEffect(() => {
    fetch(`http://localhost:8080/emergency/getAllEmergency`, {
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
      .then((data) => setReports(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    setTotalUsers(users.length);
    setTotalRequests(requests.length);
    setTotalEvents(events.length);
    setTotalReports(reports.length);
  }, [users, requests, events, reports]);

  const data = [
    {
      name: "1990",
      pv: 21374,
    },
    {
      name: "1995",
      pv: 28448,
    },
    {
      name: "2000",
      pv: 29549,
    },
    {
      name: "2007",
      pv: 32059,
    },
    {
      name: "2010",
      pv: 35600,
    },
    {
      name: "2015",
      pv: 37776,
    },
    {
      name: "2020",
      pv: 47364,
    },
    {
      name: "2023",
      pv: 49336,
    },
  ];

  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="body-styles">
        <div className="main-container1">
          <div className="card0">
            <div className="card-inner">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1
                  style={{
                    marginTop: "-5px",
                    color: "#213555",
                    textAlign: "left",
                  }}
                >
                  Welcome, Admin
                </h1>
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "30px",
                    marginTop: "-45px",
                  }}
                >
                  🎉
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img
                    src="adminpic.png" // Replace with the actual image URL
                    alt="Description of the image"
                    style={{
                      width: "30%",
                      height: "30%",
                      marginLeft: "880px",
                      marginTop: "-68px",
                    }}
                  />
                </div>
              </div>
              <h4
                style={{
                  color: "gray",
                  textAlign: "left",
                  marginTop: "-140px",
                }}
              >
                Explore the dashboard for a quick overview of user data,
                requests,{" "}
              </h4>
              <h4
                style={{ color: "gray", textAlign: "left", marginTop: "-15px" }}
              >
                events, and more. Manage with ease and stay informed!
              </h4>
            </div>
          </div>

          <div className="card6">
            <div style={{ marginLeft: "130px" }}>
              <div
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.2)", // Red with 20% opacity
                  width: "60px",
                  height: "60px",
                  borderRadius: "5px",
                  marginLeft: "-30px",
                }}
              >
                <img
                  src="diversity.png"
                  alt="diversity"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <h4 style={{ color: "#213555", marginLeft: "-110px" }}>
                TOTAL RESIDENTS
              </h4>
            </div>
            <h1 style={{ marginTop: "-10px", color: "#213555" }}>
              {totalResidents}
            </h1>
          </div>

          <div className="card7">
            <div className="card-inner">
              <div style={{ alignItems: "center", marginLeft: "130px" }}>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 255, 0.2)", // Red with 20% opacity
                    width: "60px",
                    height: "60px",
                    borderRadius: "5px",
                    marginLeft: "-40px",
                  }}
                >
                  <img
                    src="user.png"
                    alt="user"
                    style={{ width: "80%", height: "80%", marginTop: "5px" }}
                  />
                </div>
                <h4 style={{ color: "#213555", marginLeft: "-130px" }}>
                  TOTAL USERS
                </h4>
              </div>
              <h1 style={{ marginTop: "-10px", color: "#213555" }}>
                {totalUsers}
              </h1>
            </div>
          </div>
        </div>

        <div className="main-container1">
          <div className="additional-papers">
            <div className="card5">
              <div className="line-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <text
                      x="50%"
                      y="20"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="30"
                      fontWeight="bold"
                      fill="#213555"
                    >
                      Tisa Population (1990-2023)
                    </text>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card2">
            <div className="card-inner">
              <div style={{ alignItems: "center", marginLeft: "130px" }}>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 0, 0.5)", // Blue with 20% opacity
                    width: "60px",
                    height: "60px",
                    borderRadius: "5px",
                    marginLeft: "-35px",
                  }}
                >
                  <img
                    src="folder.png"
                    alt="folder"
                    style={{ width: "80%", height: "80%", marginTop: "5px" }}
                  />
                </div>
                <h4 style={{ color: "#213555", marginLeft: "-130px" }}>
                  DOCUMENT REQUESTS
                </h4>
              </div>
              <h1 style={{ marginTop: "-10px", color: "#213555" }}>
                {totalRequests}
              </h1>
            </div>
          </div>

          <div className="card2">
            <div className="card-inner">
              <div style={{ alignItems: "center", marginLeft: "130px" }}>
                <div
                  style={{
                    backgroundColor: "rgba(255, 165, 0, 0.4)", // Yellow with 20% opacity
                    width: "60px",
                    height: "60px",
                    borderRadius: "5px",
                    marginLeft: "-35px",
                  }}
                >
                  <img
                    src="event.png"
                    alt="event"
                    style={{ width: "80%", height: "80%", marginTop: "5px" }}
                  />
                </div>
                <h4 style={{ color: "#213555", marginLeft: "-130px" }}>
                  TOTAL EVENTS
                </h4>
              </div>
              <h1 style={{ marginTop: "-10px", color: "#213555" }}>
                {totalEvents}
              </h1>
            </div>
          </div>

          <div className="card1">
            <div className="card-inner">
              <div style={{ alignItems: "center", marginLeft: "310px" }}>
                <div
                  style={{
                    backgroundColor: "rgba(255, 165, 0, 0.2)", // Orange with 20% opacity
                    width: "60px",
                    height: "60px",
                    borderRadius: "5px",
                    marginLeft: "-65px",
                  }}
                >
                  <img
                    src="emergency.png"
                    alt="emergency"
                    style={{ width: "80%", height: "80%", marginTop: "5px" }}
                  />
                </div>
                <h4 style={{ color: "#213555", marginLeft: "-300px" }}>
                  RECENT REPORTS
                </h4>
              </div>
              <h1 style={{ marginTop: "-10px", color: "#213555" }}>
                {totalReports}
              </h1>
            </div>
          </div>
        </div>

        <div className="additional-papers">
          <div className="card3">
            <div className="card-inner">
              <h1 style={{ marginTop: "-10px", color: "#213555" }}>
                Barangay Tisa Map
              </h1>
              <img
                src="tisa_map.png"
                alt="Description of the image"
                style={{ width: "900px", height: "440px" }}
              />
            </div>
          </div>

          <div className="card4">
            <div className="card-inner">
              <h1 style={{ marginTop: "-5px", color: "#213555" }}>
                Stat Value 2
              </h1>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Male</td>
                    <td>{maleCount}</td>
                  </tr>
                  <tr>
                    <td>Female</td>
                    <td>{femaleCount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
