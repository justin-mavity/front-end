import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { editFundraiser, deleteFundraiser } from "../store/actions/PostActions";
import axios from "axios";

function Fundraiser(props) {
  const [fundraiser, setFundraiser] = useState([]);
  const { fundraisers } = props;
  const { url, path } = useRouteMatch();

  const { fundraiserID } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://tt-46-vr-funding.herokuapp.com/api/fundraisers/${fundraiserID}`
      )
      .then((res) => {
        setFundraiser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fundraiserID]);

  return (
    <>
      <div className="fundraiser-wrapper">
        <div className="image-container">
          <div className="image">
            <img src={fundraiser.image} alt={fundraiser.image} />
          </div>
          <span className="fundraiser-date">{fundraiser.date_created}</span>
        </div>
        <h3>{fundraiser.title}</h3>
        <div className="fundraiser-texts">
          <p>
            {fundraiser.city}, {fundraiser.state}
          </p>
          <br />
          <br />
          <p>{fundraiser.description}</p>
          <br />
          <br />
          <span className="goal-container">
            {fundraiser.amount_raised} out of {fundraiser.goal}
          </span>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    fundraisers: state.fundraisers,
  };
};
export default connect(mapStateToProps, { deleteFundraiser, editFundraiser })(
  Fundraiser
);
