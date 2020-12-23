import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import styled from "styled-components";
import * as yup from "yup";

const StyledError = styled.div`
  color: red;
  font-size: 1rem;
`;

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
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

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, value);
    setForm({ ...form, [name]: valueToUse });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is required and must be at least 6 characters long"),
    terms: yup.boolean().oneOf([false], "You must give away your data"), //This is where the issue is, (check with Brian)
  });

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form, schema]);

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      terms: form.terms,
    };
    axios
      .post("https://localhost:3000/register", newUser)
      .then((res) => {
        console.log("Login res: ", res);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="login">Signup</h2>
      <div className="signup">
        <Form onSubmit={submit}>
          <FormGroup>
            <Label>Your Name </Label>
            <Input
              className="form-control"
              type="text"
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Your Name"
            />

            <StyledError>{errors.name}</StyledError>
            <br></br>
            <Label>Your Email </Label>
            <Input
              className="form-control"
              onChange={change}
              name="email"
              type="email"
              value={form.email}
              placeholder="Your Email"
            />

            <StyledError>{errors.email}</StyledError>
            <br></br>
            <Label>Password </Label>
            <Input
              className="form-control"
              onChange={change}
              name="password"
              type="password"
              value={form.password}
              placeholder="Your Password"
            />
            <StyledError>{errors.password}</StyledError>
            <br></br>
            <Label>Terms and Conditions </Label>
            <Input
              className="form-control"
              onChange={change}
              name="terms"
              type="checkbox"
              value={form.terms}
              checked={form.terms}
            />

            <StyledError>{errors.terms}</StyledError>
            <br></br>
            <Button
              className="form-control"
              disabled={disabled}
              onSubmit={submit}
              type="submit"
            >
              Submit!
            </Button>

            <br></br>
            <Button>
              <Link to="/Login">Already a user?</Link>
            </Button>
          </FormGroup>
        </Form>
      </div>
    </>
  );
}

export default Register;
