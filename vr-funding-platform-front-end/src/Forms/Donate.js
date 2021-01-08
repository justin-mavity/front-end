import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "reactstrap";
import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h2`
  margin-top: 7.5%;
  font-size: 3rem;
  color: #a4a0b0;
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6%;
`;

const StyledFirstNameContainer = styled.div`
  width: 25%;
`;

const StyledLastNameContainer = styled.div`
  width: 25%;
`;

const StyledAmountContainer = styled.div`
  width: 25%;
`;

const StyledInputBorder = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  background: none;
  outline: none;
`;

const StyledBorder = styled.div`
  width: 100%;
  height: 0.2em;
  margin-bottom: 10%;
  border-radius: 0.2em;
  background: linear-gradient(to right, #5e42a6, #b74e91);
`;

const StyledButtonContainer = styled.div`
  width: 50%;
`;

const StyledButton = styled.button`
  width: 40%;
  margin: 0 5% 5%;
`;

const initialDisabled = true;

export default function Donate(props) {
  const { fundraisers } = props;
  const [donor, setDonor] = useState({ first: "", last: "" });
  const [amount, setAmount] = useState(0);
  const [disabled, setDisabled] = useState(initialDisabled);

  const change = (evt) => {
    const { name, value } = evt.target;
    setDonor({ ...donor, [name]: value });
    setAmount({ ...amount, [name]: value });
  };

  const donate = (evt) => {
    evt.preventDefault();
    fundraisers.map((project) => {
      return {
        ...project,
        [project.amount_raised]: project.amount_raised + amount,
      };
    });
  };

  return (
    <StyledPage>
      <StyledHeader>Donate</StyledHeader>
      <StyledForm>
        <StyledFirstNameContainer>
          <Label>First Name: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              name="first"
              id="firstname"
              placeholder="First Name"
              onChange={change}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledFirstNameContainer>

        <StyledLastNameContainer>
          <Label>Last Name: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              name="last"
              id="lastname"
              placeholder="Last Name"
              onChange={change}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledLastNameContainer>

        <StyledAmountContainer>
          <Label>Amount: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              name="amount"
              id="amount"
              placeholder="Amount"
              onChange={change}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledAmountContainer>

        <StyledButtonContainer>
          <Link to="/home">
            <StyledButton className="form-control">Cancel</StyledButton>
          </Link>
          <StyledButton
            className="form-control"
            disabled={disabled}
            onSubmit={donate}
          >
            Donate
          </StyledButton>
        </StyledButtonContainer>
      </StyledForm>
    </StyledPage>
  );
}
