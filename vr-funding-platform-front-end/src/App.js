import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route, Link } from "react-router-dom";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import FundraiserForm from "./Forms/FundraiserForm";
import FunderaiserList from "./Components/FundraiserCard";
import Fundrasier from "./Components/Fundraiser";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Donate from "./Forms/Donate";
import axios from "axios";

export default function App() {
  const [fundraisers, setFundrasiers] = useState([]);
  const [onDashboard, setOnDashboard] = useState(false);
  const [onHome, setOnHome] = useState(false);

  useEffect(() => {
    axios
      .get(`https://tt-46-vr-funding.herokuapp.com/api/fundraisers`)
      .then((res) => setFundrasiers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      {/* <div className="title">
        <h1>VR Funding Platform</h1>
      </div> */}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path={"/register"}>
          <Register />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path={"/fundraiser-form"}>
          <FundraiserForm />
        </Route>
        <Route path="/donate">
          <Donate fundraisers={fundraisers} />
        </Route>
        <Route path="/">
          <Home onHome={setOnHome} />
        </Route>
      </Switch>
    </div>
  );
}
