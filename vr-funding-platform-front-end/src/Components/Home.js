import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchFundraisers } from "../store/actions/PostActions";
import HomeFundraiserCard from "./HomeFundraiserCard";

import "./Home.css";

function Home(props) {
  console.log(props);

  const { fundraisers } = props;

  const history = useHistory();

  const routeToLogin = () => {
    history.push("/login");
  };

  const routeToRegister = () => {
    history.push("/register");
  };

  useEffect(() => {
    props.fetchFundraisers(localStorage.getItem("user_id"));
  }, []);

  return (
    <div className="home-wrapper">
      <div id="sidebar">
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
                <a
                  href="login"
                  className="scrolly active-locked"
                  onClick={routeToLogin}
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="register"
                  className="scrolly active-locked"
                  onClick={routeToRegister}
                >
                  Register
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div id="wrapper">
        <div id="intro" className="wrapper style1 fullscreen fade-up">
          <div className="inner">
            <h1>SIXR VR Funding</h1>
            <p>
              A platform that provides tech entrepreneurs with limited resources
              access to business training, project capital raising and
              mentoring.
            </p>
            {/* <ul className="actions">
              <li>
                <button
                  type="button"
                  className="button scrolly"
                  onClick={routeToLogin}
                >
                  Log In
                </button>
              </li>
            </ul> */}
          </div>
        </div>
        <div id="about" className="wrapper style2">
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
        </div>
        <div className="fundraiser-list">
          <div className="inner">
            <h3>Browse Fundraisers</h3>
            {fundraisers && fundraisers.length > 0 ? (
              fundraisers.map((item) => {
                return <HomeFundraiserCard fundraiser={item} key={item.id} />;
              })
            ) : (
              <p>
                Nothing to see here... <br />
                Just a man enjoying some 'skrat... <br />
                Move along...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fundraisers: state.fundraisers,
  };
};
export default connect(mapStateToProps, { fetchFundraisers })(Home);
