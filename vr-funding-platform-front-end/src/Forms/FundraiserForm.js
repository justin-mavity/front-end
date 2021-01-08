import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Label } from "reactstrap";
import * as yup from "yup";
import styled from "styled-components";
import { connect } from "react-redux";

import { addFundraiser } from "../store/actions/PostActions";

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

const StyledImageContainer = styled.div`
  width: 25%;
`;

const StyledTitleContainer = styled.div`
  width: 25%;
`;

const StyledCityContainer = styled.div`
  width: 25%;
`;

const StyledStateContainer = styled.div`
  width: 25%;
`;

const StyledDescriptionContainer = styled.div`
  width: 25%;
`;

const StyledGoalContainer = styled.div`
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

const StyledError = styled.div`
  color: red;
  font-size: 1rem;
`;

const StyledButtonContainer = styled.div`
  width: 50%;
`;

const StyledButton = styled.button`
  width: 40%;
  margin: 0 5% 5%;
`;

const initialFormValues = {
  title: "",
  image: "",
  city: "",
  state: "",
  description: "",
  goal: "",
};

const initialFormErrors = {
  title: "",
  image: "",
  city: "",
  state: "",
  description: "",
  goal: "",
};

const initialDisabled = true;

function FundraiserForm(props) {
  const [errors, setErrors] = useState(initialFormErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);

  const history = useHistory();

  const formSchema = yup.object().shape({
    title: yup.string().required("Project reqiures a title"),
    image: yup.string().required("Project must have a cover image"),
    city: yup.string().required("City of project is required"),
    state: yup.string().required("State of project is required"),
    description: yup.string().required("Project must have a brief description"),
    goal: yup.string().required("An asking amount is required"),
  });

  const formErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
    formErrors(name, value);
  };

  const onSubmit = (evt) => {
    evt.pereventDefault();
    const newFundraiser = {
      title: formValues.title.trim(),
      image: formValues.image.trim(),
      city: formValues.city.trim(),
      state: formValues.state.trim(),
      description: formValues.description.trim(),
      goal: formValues.goal.trim(),
    };
    console.log("New Fundraiser: ", newFundraiser);
    props.addFundraiser(
      newFundraiser,
      history,
      setFormValues,
      initialFormValues
    );
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <StyledPage className="project-form container">
      <StyledHeader>Start A Fundraiser</StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledImageContainer>
          <Label>Image: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              placeholder="Image"
              name="image"
              value={formValues.image}
              onChange={onChange}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledImageContainer>

        <StyledTitleContainer>
          <Label>Title: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              placeholder="Title"
              name="title"
              value={formValues.title}
              onChange={onChange}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledTitleContainer>

        <StyledCityContainer>
          <Label>City: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              placeholder="City"
              name="city"
              value={formValues.city}
              onChange={onChange}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledCityContainer>

        <StyledStateContainer>
          <Label>State: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              placeholder="State"
              name="state"
              value={formValues.state}
              onChange={onChange}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledStateContainer>

        <StyledDescriptionContainer>
          <Label>Description: </Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              placeholder="Description"
              name="description"
              value={formValues.description}
              onChange={onChange}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledDescriptionContainer>

        <StyledGoalContainer>
          <Label>Goal:</Label>
          <StyledInputBorder>
            <StyledInput
              type="text"
              placeholder="Goal"
              name="goal"
              value={formValues.goal}
              onChange={onChange}
            />
            <StyledBorder />
          </StyledInputBorder>
        </StyledGoalContainer>

        <StyledButtonContainer>
          <Link to="/dashboard">
            <StyledButton className="form-control">Cancel</StyledButton>
          </Link>
          <StyledButton
            className="form-control"
            disabled={disabled}
            onSubmit={onSubmit}
          >
            Submit
          </StyledButton>
        </StyledButtonContainer>
      </StyledForm>
    </StyledPage>
  );
}

const mapStateToProps = (state) => {
  return {
    fundraisers: state.fundraisers,
  };
};
export default connect(mapStateToProps, { addFundraiser })(FundraiserForm);
