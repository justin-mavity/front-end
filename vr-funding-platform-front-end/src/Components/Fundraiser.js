import React, { useEffect } from "react";
import {
  useParams,
  Link,
  useHistory,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Button } from "reactstrap";
import Donate from "../Forms/Donate";
import axios from "axios";

export default function Fundraiser(props) {
  const { fundraisers } = props;
  const history = useHistory();

  const { url, path } = useRouteMatch();
  console.log(url, "URL");
  console.log(path, "PATH");

  const { fundraiserID } = useParams();
  const fundraiser =
    fundraisers.find((fundraiser) => {
      return fundraiser.id === fundraiserID;
    }) || {};

  useEffect(() => {
    axios.get(
      `https://tt-46-vr-funding.herokuapp.com/api/fundraisers/${fundraiser.id}`
    );
  }, [fundraiser.amount_raised]);

  const close = () => {
    history.push("/fundraisers");
  };

  return (
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
      <div clasName="donate-link">
        <Link to={`${url}/donate`}>Donate</Link>
      </div>
      <Button className="close btn" onclick={close}>
        Close
      </Button>

      <Route path={`${path}/donate`}>
        <Donate projectI={fundraiser.id} />
      </Route>
    </div>
  );
}
