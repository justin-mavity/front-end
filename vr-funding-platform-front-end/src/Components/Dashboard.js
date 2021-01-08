import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import styled from "styled-components";
import FundrasierCard from "./FundraiserCard";
import { fetchFundraisers } from "../store/actions/PostActions";

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1%;
  border-bottom: 1px solid rgba(169, 165, 181, 0.5);
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1%;
`;

const StyledButton = styled.button`
  margin-bottom: 10%;
`;

function Dashboard(props) {
  const { fundraisers } = props;

  useEffect(() => {
    props.fetchFundraisers(localStorage.getItem("user_id"));
  }, [props]);

  return (
    <div className="dashboard container">
      <StyledNav>
        <Link to="/">
          <Button>Log out</Button>
        </Link>
      </StyledNav>
      <StyledHeader className="users-fundraisers">
        <Link to="/fundraiser-form">
          <StyledButton>Stat a Fundrasier</StyledButton>
        </Link>
        <h2>Browse Fundraisers</h2>
        <p>Be the reason someone smiles today!</p>
      </StyledHeader>
      {fundraisers && fundraisers.length > 0 ? (
        fundraisers.map((fundraiser) => {
          return <FundrasierCard fundraiser={fundraiser} key={fundraiser.id} />;
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
    fundraisers: state.fundraisers,
  };
};
export default connect(mapStateToProps, { fetchFundraisers })(Dashboard);
