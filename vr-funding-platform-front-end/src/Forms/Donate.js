import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";

export default function Donate(props) {
  const { projectId, total } = props;
  const [donor, setDonor] = useState({ first: "", last: "" });
  const [donate, setDonate] = useState(0);

  const change = (evt) => {
    const { name, value } = evt.target;
    setDonor({ ...donor, [name]: value });
    setDonate({ ...donate, [name]: value });
  };

  const donation = (evt) => {
    evt.preventDefault();
    projectId.map((project) => {
      return { ...project, [total]: project.total + donate.amount };
    });
  };
  return (
    <Form>
      <FormGroup>
        <Label for="firstname">Your First Name</Label>
        <Input
          type="text"
          name="first"
          id="firstname"
          placeholder="First name"
          onChange={change}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastname">Your Last Name</Label>
        <Input
          type="text"
          name="last"
          id="lastname"
          placeholder="Last name"
          onChange={change}
        />
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input
            placeholder="Amount"
            name="amount"
            min={0}
            max={100}
            type="number"
            step="1"
            onChange={change}
          />
          <InputGroupAddon addonType="append">.00</InputGroupAddon>
        </InputGroup>
      </FormGroup>
      <Button onClick={donation}>Donate</Button>
    </Form>
  );
}
