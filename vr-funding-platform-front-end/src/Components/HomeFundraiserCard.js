import React from "react";
import { connect } from "react-redux";
import { editFundraiser, deleteFundraiser } from "../store/actions/PostActions";
import { Link, Route } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

function HomeFundraiserCard(props) {
  console.log(props.fundraiser);
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

  return (
    <div className="fundrasier-wrapper">
      <Card key={id}>
        <CardImg top width="25%" src={image} alt="Card image cap" />
        <CardBody>
          <span className="fundraiser-date">{date_created}</span>
          <CardTitle tag="h4">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {city}, {state}
          </CardSubtitle>
          <CardText>{description}</CardText>
          <CardText>
            {amount_raised} out of {goal}
          </CardText>
        </CardBody>
        <div clasName="donate-link">
          <Link to="/donate">
            <button>Donate</button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fundraisers: state.fundraisers,
  };
};
export default connect(mapStateToProps, { deleteFundraiser, editFundraiser })(
  HomeFundraiserCard
);
