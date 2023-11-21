import { Button, Grid } from "@mui/material";
import "./Home.css";
import Header from "./Header";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Grid container className="gridItem2">
          <Grid className="container">
            <Grid item>
              <h1 className="stmt1">WELCOME TO BARANGAY CONNECT</h1>
              <h2 className="stmt2">Your Community at Your Fingertips!</h2>
              <Grid item>
                <div className="comlogo">
                  <img
                    src={"together.png"}
                    className="togetherlogo"
                    alt="togetherlogo"
                  />
                </div>
              </Grid>

              <p className="stmt3">
                We are absolutely delighted to introduce you to a revolutionary
                way of connecting, engaging, and simplifying life in our
                cherished community. At BarangayConnect, we are committed to
                empowering you, our esteemed residents, and enhancing the
                quality of your daily life in ways you've never experienced
                before. With our innovative platform, you can:<br></br>
                <br></br>
                STAY INFORMED: Access real-time updates in your neighborhood, so
                you're always in the know about what's happening in your
                community.<br></br>
                <br></br>
                CONNECT WITH YOUR NEIGHBORS: Forge meaningful connections with
                your neighbors, fostering a strong sense of camaraderie and
                support within the community.<br></br>
                <br></br>
                VOICE YOUR IDEAS: Share your suggestions and ideas for community
                improvement, and be an active participant in shaping the future
                of our Barangay.<br></br>
                <br></br>
                DISCOVER OPPORTUNITIES: Uncover exciting opportunities for local
                involvement.<br></br>
                <br></br>
                Your community, your app – BarangayConnect.
              </p>
              <div></div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
