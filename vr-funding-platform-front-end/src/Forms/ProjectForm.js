import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
import * as yup from "yup";
import axios from "axios";

const initialFormValues = {
  title: "",
  image: "",
  city: "",
  state: "",
  description: "",
  goal: "",
  date_created: "",
};

const initialFormErrors = {
  title: "",
  image: "",
  location: "",
  description: "",
  goal: "",
};

const initialDisabled = true;

export default function ProjectForm() {
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
    const newProject = {
      title: formValues.title.trim(),
      image: formValues.image.trim(),
      city: formValues.city.trim(),
      state: formValues.state.trim(),
      description: formValues.description.trim(),
      goal: formValues.goal.trim(),
      date_created: Date.now(),
    };
    axios
      .post("api/project", newProject)
      .then((res) => {
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <>
      <div className="project-form container">
        <h2>Create a Project</h2>
        <Form onSubmit={onSubmit}>
          <FormGroup as={Row} controlId="formHorizontalTitle">
            <Label for="title" column sm={2}>
              Title
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="Title of project"
                name="title"
                value={formValues.title}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} controlId="formHorizontalLocation">
            <Label for="city" column sm={2}>
              City
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="City"
                name="city"
                value={formValues.city}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} controlId="formHorizontalLocation">
            <Label for="state" column sm={2}>
              State
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="State"
                name="state"
                value={formValues.state}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} controlId="formHorizontalDescription">
            <Label for="description" column sm={2}>
              Description
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="Breif Description"
                name="description"
                value={formValues.description}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} controlId="formHorizontalDetailedInfo">
            <Label for="detailedInfo" column sm={2}>
              Detailed Information
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="Detailed Information"
                name="detailedInfo"
                value={formValues.detailedInfo}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} controlId="formHorizontalImageUrl">
            <Label for="image" column sm={2}>
              ImageUrl
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="image"
                name="image"
                value={formValues.image}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} controlId="formHorizontalgoal">
            <Label for="goal" column sm={2}>
              Askin Amount
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="Asking Amount"
                name="goal"
                value={formValues.goal}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
          <Button size="lg" disabled={disabled}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
