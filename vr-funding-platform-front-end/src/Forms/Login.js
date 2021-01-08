import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
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

const StyledEmailContainer = styled.div`
  width: 25%;
  margin-left: 4.25%;
`;

const StyledPasswordContainer = styled.div`
  width: 25%;
`;

const StyledInput = styled.input`
  width: 75%;
  background: none;
  outline: none;
`;

const StyledEmailBorder = styled.div`
  width: 76.25%;
  height: 0.2em;
  margin-left: 13.45%;
  margin-bottom: 10%;
  border-radius: 0.2em;
  background: linear-gradient(to right, #5e42a6, #b74e91);
`;

const StyledPasswordBorder = styled.div`
  width: 76.25%;
  height: 0.2em;
  margin-left: 22%;
  margin-bottom: 10%;
  border-radius: 0.2em;
  background: linear-gradient(to right, #5e42a6, #b74e91);
`;

const StyledButtonContainer = styled.div`
  width: 25%;
`;

const StyledButton = styled.button`
  width: 40%;
  margin: 0 5%;
`;

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is required and must be at least 6 characters long"),
  });

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const change = (e) => {
    const { value, name } = e.target;
    const valueToUse = value;
    setForm({ ...form, [name]: valueToUse });
    setFormErrors(name, valueToUse);
  };

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      email: form.email.trim(),
      password: form.password.trim(),
    };
    axios
      .post("https://tt-46-vr-funding.herokuapp.com/auth/login", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
        console.log("Login res: ", res);
      })
      .catch((err) => {
        console.log("Login error: ", err);
      });
  };

  return (
    <StyledPage className="login">
      <StyledHeader>Login</StyledHeader>
      <StyledPage className="signup">
        <StyledForm onSubmit={submit}>
          <StyledEmailContainer>
            <Label for="email">Email: </Label>
            <StyledInput
              className="form-control"
              onChange={change}
              value={form.email}
              name="email"
              type="text"
              placeholder="Email"
            />
            <StyledEmailBorder />
          </StyledEmailContainer>
          <div style={{ color: "red" }}>{errors.email}</div>
          <StyledPasswordContainer>
            <Label for="password">Password: </Label>
            <StyledInput
              className="form-control"
              onChange={change}
              value={form.password}
              name="password"
              type="text"
              placeholder="Password"
            />
            <StyledPasswordBorder />
          </StyledPasswordContainer>
          <div style={{ color: "red" }}>{errors.password}</div>
          <StyledButtonContainer>
            <StyledButton disabled={disabled}>Submit</StyledButton>
            <Link to="/Register">
              <StyledButton>New User?</StyledButton>
            </Link>
          </StyledButtonContainer>
        </StyledForm>
      </StyledPage>
    </StyledPage>
  );
}

export default Login;
