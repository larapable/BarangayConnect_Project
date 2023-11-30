import { Button, Grid } from "@mui/material";
import "./Home.css";
import Header from "../Header";
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

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
                    src={"../together.png"}
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

          <Grid className="container2">
            <Grid item>
              <h1 className="aboutus1">ABOUT US</h1>
              <p className="aboutus2">
                We are the Teal Palm, the visionary minds behind Barangay
                Connect. As third-year students pursuing a Bachelor of Science
                in Information Technology at Cebu Institute of Technology
                University, our journey is fueled by a shared passion for
                leveraging technology to bridge communities. United as friends,
                we are dedicated to crafting innovative solutions that empower
                and connect people, driven by a commitment to making a positive
                impact through the fusion of technology and community spirit.
              </p>

              <h1 className="aboutus1">OUR TEAM</h1>
              <p className="aboutus2">
                Meet the dynamic team of Teal Palm – a group of forward-thinking
                third-year students
              </p>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Grid className="profilecontainer1">
                  <img
                    src="lara.jpg"
                    alt="Lara C. Pable"
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginTop: "20px",
                      marginLeft: "85px",
                    }}
                  />
                  <p className="membernamesodd">Lara C. Pable</p>
                  <p className="memberdescriptionodd">Full-stack developer</p>
                </Grid>

                <Grid className="profilecontainer2">
                  <img
                    src="arziel.png"
                    alt="Lara C. Pable"
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginTop: "20px",
                      marginLeft: "85px",
                    }}
                  />
                  <p className="membernameseven">Arziel Mae Lawas</p>
                  <p className="memberdescriptioneven">Full-stack developer</p>
                </Grid>

                <Grid className="profilecontainer1">
                  <img
                    src="ebeb.jpg"
                    alt="Lara C. Pable"
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginTop: "20px",
                      marginLeft: "85px",
                    }}
                  />
                  <p className="membernamesodd">Genevieve N. Miao</p>
                  <p className="memberdescriptionodd">Full-stack developer</p>
                </Grid>

                <Grid className="profilecontainer2">
                  <img
                    src="arvin.png"
                    alt="Lara C. Pable"
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginTop: "20px",
                      marginLeft: "85px",
                    }}
                  />
                  <p className="membernameseven">Arvin Santillan</p>
                  <p className="memberdescriptioneven">Full-stack developer</p>
                </Grid>
              </div>

              <h1 className="aboutus1">OUR SERVICES</h1>
              <p className="aboutus2">
                Explore a spectrum of cutting-edge services with Barangay
                Connect
              </p>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Grid className="servicesbox">
                  <img
                    src="language.png"
                    style={{
                      width: "20%",
                      height: "25%",
                      opacity: 0.8,
                      objectFit: "cover",
                      marginTop: "50px",
                      marginLeft: "200px",
                    }}
                  />
                  <p className="serviceboxdescription">
                    Embrace the power of versatile and comprehensive web
                    solutions with our expertise in full stack development.
                  </p>
                </Grid>
                <Grid className="servicesbox">
                  <img
                    src="figma.png"
                    style={{
                      width: "20%",
                      height: "30%",
                      opacity: 0.8,
                      objectFit: "cover",
                      marginTop: "40px",
                      marginLeft: "200px",
                    }}
                  />
                  <p className="serviceboxdescription">
                    Transform your ideas into tangible, interactive prototypes
                    with our Figma proficiency.
                  </p>
                </Grid>
                <Grid className="servicesbox">
                  <img
                    src="uiux.png"
                    style={{
                      width: "20%",
                      height: "30%",
                      opacity: 0.8,
                      objectFit: "cover",
                      marginTop: "40px",
                      marginLeft: "200px",
                    }}
                  />
                  <p className="serviceboxdescription">
                    Elevate your digital presence with our UI/UX design
                    services.{" "}
                  </p>
                </Grid>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Grid className="servicesbox2">
                  <img
                    src="database.png"
                    style={{
                      width: "20%",
                      height: "30%",
                      opacity: 0.8,
                      objectFit: "cover",
                      marginTop: "40px",
                      marginLeft: "200px",
                    }}
                  />
                  <p className="serviceboxdescription">
                    Build robust and efficient databases tailored to your needs.
                  </p>
                </Grid>
                <Grid className="servicesbox2">
                  <img
                    src="react.png"
                    style={{
                      width: "20%",
                      height: "30%",
                      opacity: 0.8,
                      objectFit: "cover",
                      marginTop: "40px",
                      marginLeft: "200px",
                    }}
                  />
                  <p className="serviceboxdescription">
                    Stay ahead in the dynamic world of web development with our
                    expertise in React.js.
                  </p>
                </Grid>
                <Grid className="servicesbox2">
                  <img
                    src="mobilapp.png"
                    style={{
                      width: "20%",
                      height: "30%",
                      opacity: 0.8,
                      objectFit: "cover",
                      marginTop: "40px",
                      marginLeft: "200px",
                    }}
                  />
                  <p className="serviceboxdescription">
                    Extend your digital footprint to the palm of your users'
                    hands with our mobile app development services.
                  </p>
                </Grid>
              </div>
            </Grid>
          </Grid>

          <Grid className="contact">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Grid className="contactbox">
                <p className="contactdescription1">
                  <FaPhone style={{ marginRight: "20px", marginTop: "5px" }} />{" "}
                  CALL US
                </p>
                <p className="contactdescription2">+123 456 789</p>
                <p className="contactdescription2">+123 456 789</p>
              </Grid>
              <Grid className="contactbox">
                <p className="contactdescription1">
                  <FaEnvelope
                    style={{ marginRight: "20px", marginTop: "5px" }}
                  />{" "}
                  EMAIL
                </p>
                <p className="contactdescription2">team_palm@gmail.com</p>
                <p className="contactdescription2">con_palm@gmail.com</p>
              </Grid>
              <Grid className="contactbox">
                <p className="contactdescription1">
                  <FaClock style={{ marginRight: "20px", marginTop: "5px" }} />{" "}
                  HOURS
                </p>
                <p className="contactdescription2">
                  Mon-Fri 10:00 am - 8:00 pm
                </p>
                <p className="contactdescription2">
                  Sat-sun 10:00 am - 5:00 pm
                </p>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
