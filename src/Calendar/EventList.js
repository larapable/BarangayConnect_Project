import Header from "../Header";
import React from "react";

export default function EventList() {
  return (
    <div
      style={{
        background: "#213555",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Header />
      </div>
      <div
        style={{
          background: `url('buildingbg.png')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <h1 style={{ fontSize: "60px", color: "white", margin: "60px" }}>
          EVENT LIST:
        </h1>
      </div>
    </div>
  );
}
