import React from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const history = useHistory();
  const routeToLogin = () => {
    history.push("/login");
  };
  return (
    <div className="home-wrapper">
      <section id="sidebar">
        <div className="inner">
          <nav>
            <ul>
              <li>
                <a href="#intro" className="scrolly">
                  Welcome
                </a>
              </li>
              <li>
                <a href="#about" className="scrolly">
                  About Us
                </a>
              </li>
              <li>
                <a href="#login" className="scrolly active-locked">
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <div id="wrapper">
        <section id="intro" className="wrapper style1 fullscreen fade-up">
          <div className="inner">
            <h1>SIXR VR Funding</h1>
            <p>
              A platform that provides tech entrepreneurs with limited resources
              access to business training, project capital raising and
              mentoring.
            </p>
            <ul className="actions">
              <li>
                <button
                  type="button"
                  clasName="button scrolly"
                  onClick={routeToLogin}
                >
                  Log In
                </button>
              </li>
            </ul>
          </div>
        </section>
        <section id="about" className="wrapper style2">
          <div className="inner">
            <h3>About Us</h3>
            <p>
              SIXR is a social enterprise committed to providing immersive
              reality content to the global community beyond their imagination!
              <br />
              Our Cinematic VR (Virtual Reality) team is rooted in Seattle,
              Washington and attracts talent within the Pacific Northwest. A
              Virtual Reality Renaissance is sparking creative growth for an
              unexplored frontier, building anticipation.
              <br />
              SIXR supports community building by promoting new methods of
              storytelling in VR/AR/360/MR. We are diverse pioneers that provide
              early access to technological resources for people of varying
              cultural, educational, and socioeconomic backgrounds. We strive to
              be inclusive as these bright minds come together and we help bring
              powerful high-quality products to the eXperimental realities
              landscape!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
