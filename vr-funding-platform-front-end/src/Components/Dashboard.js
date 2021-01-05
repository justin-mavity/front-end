import React, { useEffect } from "react";
import { Route, Link, useParams, useHistory } from "react-router-dom";
import ProjectForm from "../Forms/ProjectForm";
import { Button } from "reactstrap";
import Fundraiser from "./Fundraiser";

import axios from "axios";

export default function Dashboard(props) {
  const { userFundraisers } = props;

  const { userID } = useParams();
  const fundraiser =
    userFundraisers.find((fundraiser) => {
      return fundraiser.user_id === userID;
    }) || {};

  const history = useHistory();

  const routeToFundraiserForm = () => {
    history.push("/create_fundraiser");
    <Route path="/create_fundraiser">
      <ProjectForm />
    </Route>;
  };

  useEffect(() => {
    axios.get(
      `https://tt-46-vr-funding.herokuapp.com/api/users/:id/fundraisers`
    );
  }, []);

  return (
    <div className="dashboard container">
      <nav></nav>
      {/* Needs a button to create a fundraiser. A list of all Fundraisers the user has created. Each Fundraiser needs an edit and a Delete Button. */}
      <Button className="start fundraiser" onClick={routeToFundraiserForm}>
        Create a Fundraiser
      </Button>
      <div className="users-fundraisers">
        <Fundraiser key={fundraiser.user_id} fundraisers={fundraiser.id} />
      </div>
    </div>
  );
}
