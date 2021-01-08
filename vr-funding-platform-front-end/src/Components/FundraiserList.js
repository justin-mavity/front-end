import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { CardImg, CardText, CardTitle, CardSubtitle } from "reactstrap";

import { editFundraiser, deleteFundraiser } from "../store/actions/PostActions";

const StyledFundraiserCard = styled.div`
  width: 30%;
  margin: 3%;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.p`
  text-align: center;
`;

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

export default function FundraiserList(props) {
  const { fundraisers } = props;

  return (
    <div>
      {fundraisers.map((fundraiser) => (
        <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
      ))}
    </div>
  );
}

function FundraiserCard(props) {
  console.log(props.fundraisers);
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
  } = props.fundraisers;

  const routeToFundraiser = () => {
    history.push(`/fundariser/${id}`);
  };

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
    <StyledFundraiserCard className="fundrasier-wrapper">
      <StyledCard key={id} onClick={routeToFundraiser}>
        <CardImg top width="75%" src={image} alt="Card image cap" />
        <StyledCardBody>
          <span className="fundraiser-date">{date_created}</span>
          <CardTitle tag="h4">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {city}, {state}
          </CardSubtitle>
          <StyledText>{description}</StyledText>
          <CardText>
            {amount_raised} raised of {goal}
          </CardText>
        </StyledCardBody>
        <div className="btn-group">
          <button onClick={fundraiserEdit}>Edit</button>
          <button onClick={fundraiserDelete}>Delete</button>
        </div>
      </StyledCard>

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
    </StyledFundraiserCard>
  );
}
