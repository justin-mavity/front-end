import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route, Link } from "react-router-dom";
import FunderaiserList from "./Components/FundraiserList";
import Fundrasier from "./Components/Fundraiser";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import axios from "axios";

export default function App() {
  const [fundraisers, setFundrasiers] = useState([]);
  const [userFundraisers, setUserFundraisers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://tt-46-vr-funding.herokuapp.com/api/fundraisers`)
      .then((res) => setFundrasiers(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://tt-46-vr-funding.herokuapp.com/api/user/:userID/fundraisers`
      )
      .then((res) => setUserFundraisers(res.data))
      .catch((err) => console.log(err));
  }, [fundraisers]);

  return (
    <div className="home-wrapper">
      <Home>
        <FunderaiserList fundasiers={fundraisers} />
        <Switch>
          <Route path="/">
            <Dashboard fundraisers={userFundraisers} />
          </Route>
          <Route path={"/fundrasiers/:fundraiserID"}>
            <Fundrasier fundasiers={fundraisers} />
          </Route>
          <Route path={"/fundraiser-list"}>
            <FunderaiserList fundasiers={fundraisers} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Home>
    </div>
  );
}
