import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

export default function FundraiserList(props) {
  const { fundraisers } = props;

  return (
    <div className="fundrasier-wrapper">
      {fundraisers.map((fundraiser) => (
        <Link to={`/fundraisers/${fundraiser.id}`}>
          <Card key={fundraiser.id}>
            <CardImg
              top
              width="100%"
              src={fundraiser.image}
              alt="Card image cap"
            />
            <span className="fundraiser-date">{fundraiser.date_created}</span>
            <CardBody>
              <CardTitle tag="h4">{fundraiser.title}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {fundraiser.city}, {fundraiser.state}
              </CardSubtitle>
              <CardText>{fundraiser.description}</CardText>
              <CardText>
                {fundraiser.amount_raised} out of {fundraiser.goal}
              </CardText>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
