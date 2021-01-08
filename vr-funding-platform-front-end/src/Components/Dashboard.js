import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import FundrasierCard from "./FundraiserCard";
import { fetchFundraisers } from "../store/actions/PostActions";
function Dashboard(props) {
  const { fundraisers } = props;

  useEffect(() => {
    props.fetchFundraisers(localStorage.getItem("user_id"));
  }, []);

  return (
    <div className="dashboard container">
      <nav>
        <div>
          <h4>Dashboard</h4>
        </div>
        <Link to="/fundrasier-form">
          <Button className="start fundraiser">Create a Fundraiser</Button>
        </Link>
        <Link to="/">
          <Button>Log out</Button>
        </Link>
      </nav>
      <div className="users-fundraisers">
        <Link to="/fundraiser-form">
          <Button>Stat a Fundrasier</Button>
        </Link>
      </div>
      {fundraisers && fundraisers.length > 0 ? (
        fundraisers.map((fundraiser) => {
          return (
            <FundrasierCard fundraiser={fundraiser} key={fundraiser.user_id} />
          );
        })
      ) : (
        <p>
          Nothing to see here... <br />
          Just a man enjoying some 'skrat... <br />
          Move along...
        </p>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { fetchFundraisers })(Dashboard);
