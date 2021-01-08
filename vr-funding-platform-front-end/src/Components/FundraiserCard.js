import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { editFundraiser, deleteFundraiser } from "../store/actions/PostActions";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import axios from "axios";
const initialFundraiser = {
  title: "",
  image: "",
  city: "",
  state: "",
  description: "",
  goal: "",
  date_created: "",
  amount_raised: "",
};

function FundraiserCard(props) {
  console.log(props.fundraiser);
  const [editing, setEditing] = useState(false);
  const [fundraiserToEdit, setFundraiserToEdit] = useState(initialFundraiser);
  const history = useHistory();
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
    user_id,
  } = props.fundraiser;

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
      </Card>
      <br />
      <br />
      {editing && (
        <form onSubmit={save}>
          <h2>Edit Post</h2>
          <div className="edit">
            <label>
              Title:
              <input
                className="form-control"
                placeholder="Title"
                onChange={(evt) =>
                  setFundraiserToEdit({
                    ...fundraiserToEdit,
                    title: evt.target.value,
                  })
                }
                value={fundraiserToEdit.title}
              />
            </label>
            &nbsp;
            <br></br>
            <label>
              City:
              <input
                className="form-control"
                placeholder="City"
                onChange={(evt) =>
                  setFundraiserToEdit({
                    ...fundraiserToEdit,
                    city: evt.target.value,
                  })
                }
                value={fundraiserToEdit.city}
              />
            </label>
            &nbsp;
            <br></br>
            <label>
              State:
              <input
                className="form-control"
                placeholder="State"
                onChange={(evt) =>
                  setFundraiserToEdit({
                    ...fundraiserToEdit,
                    state: evt.target.value,
                  })
                }
                value={fundraiserToEdit.state}
              />
            </label>
            &nbsp;
            <br></br>
            <label>
              Description:
              <input
                className="form-control"
                placeholder="Description"
                onChange={(evt) =>
                  setFundraiserToEdit({
                    ...fundraiserToEdit,
                    description: evt.target.value,
                  })
                }
                value={fundraiserToEdit.description}
              />
            </label>
            &nbsp;
            <br></br>
            <label>
              Goal:
              <input
                className="form-control"
                placeholder="Goal"
                onChange={(evt) =>
                  setFundraiserToEdit({
                    ...fundraiserToEdit,
                    goal: evt.target.value,
                  })
                }
                value={fundraiserToEdit.goal}
              />
            </label>
            <div></div>
          </div>
          <br></br>
          <button className="edit-button-card" type="submit">
            Save
          </button>
          <br></br>
          <button
            className="edit-button-card"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fundraisers: state.fundraisers,
  };
};
export default connect(mapStateToProps, { deleteFundraiser, editFundraiser })(
  FundraiserCard
);
