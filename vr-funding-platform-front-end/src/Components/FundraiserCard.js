import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import FundraiserForm from "../Forms/FundraiserForm";

export default function FundraiserCard(props) {
  const {
    id,
    title,
    image,
    city,
    state,
    description,
    goal,
    date_created,
    amount_raised,
  } = props.fundraiser;
  const [editing, setEditing] = useState(false);
  const [fundraiserToEdit, setFundraiserToEdit] = useState([]);
  const history = useHistory();

  const fundraiserEdit = (edit) => {
    setEditing(true);
    setFundraiserToEdit(id);
  };

  const fundraiserDelete = (evt) => {
    evt.preventDefault();
    props.deleteFundraiser(id);
    history.push("/deleted");
  };

  const save = (evt) => {
    evt.preventDefault();
    props.editFundraiser(id, fundraiserToEdit);
    history.push("/edited");
  };

  return (
    <div className="fundrasier-wrapper">
      <Card key={id}>
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <span className="fundraiser-date">{date_created}</span>
        <CardBody>
          <CardTitle tag="h4">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {city}, {state}
          </CardSubtitle>
          <CardText>{description}</CardText>
          <CardText>
            {amount_raised} out of {goal}
          </CardText>
        </CardBody>
        <div className="btn-group">
          <button onClick={fundraiserEdit}>Edit</button>
          <button onClick={fundraiserDelete}>Delete</button>
        </div>
        {editing && (
          <form onSubmit={save}>
            <h2>Edit Fundraiser</h2>
            <div className="edit">
              <label>
                Title:
                <input
                  className="form-control"
                  placeholder="Title"
                  onChange={(evt) =>
                    setFundraiserToEdit({
                      ...fundraiserEdit,
                      title: evt.target.value,
                    })
                  }
                />
              </label>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
