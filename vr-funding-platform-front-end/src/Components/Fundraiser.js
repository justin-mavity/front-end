import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

export default function Fundraiser(props) {
  const { fundraisers } = props;
  const { url, path } = useRouteMatch();
  console.log(url, "URL");
  console.log(path, "PATH");

  const { fundraiserID } = useParams();
  const fundraiser =
    fundraisers.find((fundraiser) => {
      return fundraiser.id === fundraiserID;
    }) || {};

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
        <div clasName="donate-link"></div>
      </div>
    </>
  );
}
