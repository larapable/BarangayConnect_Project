import Header from "../Header";
import React from "react";
import "./CC.css";

export default function EventList() {
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
      </div>
    </div>
  );
}
