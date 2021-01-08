import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Label } from "reactstrap";
import styled from "styled-components";
import * as yup from "yup";

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

const StyledUsernameContainer = styled.div`
  width: 25%;
`;

const StyledEmailContainer = styled.div`
  width: 25%;
`;

const StyledPasswordContainer = styled.div`
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

function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
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

  const change = (e) => {
    const { value, name } = e.target;
    const valueToUse = value;
    setForm({ ...form, [name]: valueToUse });
    setFormErrors(name, valueToUse);
  };

  const schema = yup.object().shape({
    first_name: yup.string().required("Please Input Your First Name"),
    last_name: yup.string().required("Please Input Your Last Name"),
    username: yup.string().required("Please Input A Username"),
    email: yup.string().email().required("Please Input Your Email"),
    password: yup
      .string()
      .required("Please Input A Password")
      .min(6, "Password Must Be At Least 6 Characters Long"),
  });

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form, schema]);

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };
    axios
      .post("https://tt-46-vr-funding.herokuapp.com/auth/register", newUser)
      .then((res) => {
        console.log("Login res: ", res);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledPage className="signup">
      <StyledHeader className="login">Signup</StyledHeader>
      <StyledForm onSubmit={submit}>
        <StyledFirstNameContainer>
          <Label>First Name: </Label>
          <StyledInputBorder>
            <StyledInput
              className="form-control"
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={change}
              placeholder="First Name"
            />
            <StyledBorder />
          </StyledInputBorder>
          <StyledError>{errors.first_name}</StyledError>
        </StyledFirstNameContainer>

        <StyledLastNameContainer>
          <Label>Last Name: </Label>
          <StyledInputBorder>
            <StyledInput
              className="form-control"
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={change}
              placeholder="Last Name"
            />
            <StyledBorder />
          </StyledInputBorder>
          <StyledError>{errors.last_name}</StyledError>
        </StyledLastNameContainer>

        <StyledUsernameContainer>
          <Label>Username: </Label>
          <StyledInputBorder>
            <StyledInput
              className="form-control"
              type="text"
              name="username"
              value={form.username}
              onChange={change}
              placeholder="Username"
            />
            <StyledBorder />
          </StyledInputBorder>
          <StyledError>{errors.username}</StyledError>
        </StyledUsernameContainer>

        <StyledEmailContainer>
          <Label>Email: </Label>
          <StyledInputBorder>
            <StyledInput
              className="form-control"
              onChange={change}
              name="email"
              type="email"
              value={form.email}
              placeholder="Email"
            />
            <StyledBorder />
          </StyledInputBorder>
          <StyledError>{errors.email}</StyledError>
        </StyledEmailContainer>

        <StyledPasswordContainer>
          <Label>Password: </Label>
          <StyledInputBorder>
            <StyledInput
              className="form-control"
              onChange={change}
              name="password"
              type="password"
              value={form.password}
              placeholder="Password"
            />
            <StyledBorder />
          </StyledInputBorder>
          <StyledError>{errors.password}</StyledError>
        </StyledPasswordContainer>

        <StyledButtonContainer>
          <StyledButton
            className="form-control"
            disabled={disabled}
            onSubmit={submit}
            type="submit"
          >
            Submit
          </StyledButton>
          <Link to="/Login">
            <StyledButton>Already a user?</StyledButton>
          </Link>
        </StyledButtonContainer>
      </StyledForm>
    </StyledPage>
  );
}

export default Register;
