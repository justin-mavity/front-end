import React, { useEffect } from "react";
import { Route, Link, useParams, useHistory } from "react-router-dom";
import ProjectForm from "../Forms/FundraiserForm";
import { Button } from "reactstrap";
import Fundraiser from "./Fundraiser";

export default function Dashboard(props) {
  const { fundraisers, update } = props;

  const { userID } = useParams();
  const userFundraiser =
    fundraisers.find((fundraiser) => {
      return fundraiser.user_id === userID;
    }) || {};

  const history = useHistory();

  const routeToFundraiserForm = () => {
    history.push("/create_fundraiser");
    <Route path="/create_fundraiser">
      <ProjectForm />
    </Route>;
  };

  return (
    <div className="dashboard container">
      <nav></nav>
      {/* Needs a button to create a fundraiser. A list of all Fundraisers the user has created. Each Fundraiser needs an edit and a Delete Button. */}
      <Button className="start fundraiser" onClick={routeToFundraiserForm}>
        Create a Fundraiser
      </Button>
      <div className="users-fundraisers">
        <Fundraiser key={userID} fundraisers={fundraisers.id} />
        <Button className="edit-btn" onClick={update}>
          Edit
        </Button>
      </div>
    </div>
  );
}
