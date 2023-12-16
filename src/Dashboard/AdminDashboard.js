import Header from "../Header";
import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,BarChart, Bar, Rectangle } from 'recharts';



export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const totalResidents= "41, 360";
  


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
        // Update the state with the received data
        setUsers(data);
  
        let maleCount = 0;
        let femaleCount = 0;
  
        data.forEach((user) => {
          if (user.gender === 'Male') {
            maleCount += 1;
          } else if (user.gender === 'Female') {
            femaleCount += 1;
          }
          // You can add more conditions for other genders if needed
        });
  
        // Now you have the counts in the maleCount and femaleCount variables
        console.log('Male Count:', maleCount);
        console.log('Female Count:', femaleCount);
  
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
    setTotalRequests(requests.length)
    setTotalEvents(events.length)
    setTotalReports(reports.length)
  }, [users,requests,events,reports]);
   
  const data = [
    {
      name: '1990',
      pv: 21374,
    },
    {
      name: '1995',
      pv: 28448,
    },
    {
      name: '2000',
      pv: 29549,
    },
    {
      name: '2007',
      pv: 32059,
    },
    {
      name: '2010',
      pv: 35600,
    },
    {
      name: '2015',
      pv: 37776,
    },
    {
      name: '2020',
      pv: 47364,
    },
    {
      name: '2023',
      pv: 49336,
    },
  ];


 
  
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="main-container">
        <div className="main-title">
          <p style={{fontSize:"40px",fontWeight:'bold'}}>DASHBOARD</p>
        </div>

        <div className="main-cards">
          <div className="card-inner">
            <h3>
            TOTAL USERS
            </h3>
          </div>
          <h1>{totalUsers}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>DOCUMENT REQUESTS</h3>
          </div>
          <h1>{totalRequests}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>TOTAL RESIDENTS</h3>
          </div>
          <h1>{totalResidents}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>TOTAL EVENTS</h3>
          </div>
          <h1>{totalEvents}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>RECENT NUMBER OF REPORTS</h3>
          </div>
          <h1>{totalReports}</h1>
        </div>
      </div>

      <div className="line-chart">
      <ResponsiveContainer width="100%" height={300}>
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
            <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold">
            Tisa Population(1990-2023)
            </text>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        
      </div>

      <div className="table">
        <h3>Gender Counts</h3>
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
  );
}
