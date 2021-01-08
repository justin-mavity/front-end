import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

import * as yup from "yup";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const schema = yup.object().shape({
    username: yup.string().required("username is required"),
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
      username: form.username.trim(),
      password: form.password.trim(),
    };
    axios
      .post("https://tt-46-vr-funding.herokuapp.com/api/auth/login", newUser)
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
    <div className="login">
      <h2>Login</h2>
      <br />
      <div className="signup">
        <Form onSubmit={submit}>
          <FormGroup>
            <Label for="username">Username: </Label>
            <Input
              className="form-control"
              onChange={change}
              value={form.username}
              name="username"
              type="text"
              placeholder="Your Username"
            />
          </FormGroup>
          <div style={{ color: "red" }}>{errors.username}</div>
          <br />
          <FormGroup>
            <Label for="password">Password: </Label>
            <Input
              className="form-control"
              onChange={change}
              value={form.password}
              name="password"
              type="text"
              placeholder="Password"
            />
          </FormGroup>
          <div style={{ color: "red" }}>{errors.password}</div>
          <br />
          <Button className="form-control" disabled={disabled}>
            Submit
          </Button>
          <br />
          <br />
          <Link to="/Register">
            <Button>New User?</Button>
          </Link>
        </Form>
        <br />
      </div>
    </div>
  );
}

export default Login;
