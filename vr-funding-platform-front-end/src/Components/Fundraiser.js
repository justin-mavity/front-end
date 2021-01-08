import React, { useState } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { editFundraiser, deleteFundraiser } from "../store/actions/PostActions";
import FundraiserForm from "../Forms/FundraiserForm";

const initialFundraiser = {
  id: "",
  title: "",
  image: "",
  city: "",
  state: "",
  description: "",
  goal: "",
  date_created: "",
  amount_raised: "",
};

function Fundraiser(props) {
  const { fundraisers } = props;
  const {
    title,
    image,
    city,
    state,
    description,
    goal,
    date_created,
    amount_raised,
  } = props.fundraiser;

  return (
    <>
      <div className="fundraiser-wrapper">
        <div className="image-container">
          <div className="image">
            <img src={image} alt={image} />
          </div>
          <span className="fundraiser-date">{date_created}</span>
        </div>
        <h3>{title}</h3>
        <div className="fundraiser-texts">
          <p>
            {city}, {state}
          </p>
          <br />
          <br />
          <p>{description}</p>
          <br />
          <br />
          <span className="goal-container">
            {amount_raised} out of {goal}
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
