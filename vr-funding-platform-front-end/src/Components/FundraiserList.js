import React from "react";
import {
  Link,
  useHistory,
  useParams,
  useRouteMatch,
  Route,
} from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  NavLink,
} from "reactstrap";

export default function FundraiserList(props) {
  const { fundraisers } = props;
  const { url, path } = useRouteMatch();

  const history = useHistory();
  const routeToFundraiser = () => {
    history.push(`/fundraiser/${fundraiserId}`);
  };

  const { fundraiserId } = useParams();
  const fundraiser =
    fundraisers.map((fundraiser) => {
      return fundraiser.id == fundraiserId;
    }) || {};
  return (
    <div className="fundrasier-wrapper">
      <div clasName="fundraiser-card">
        <Card key={fundraiser.id} onClick={routeToFundraiser}>
          <CardImg
            top
            width="100%"
            src={fundraiser.image}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h4">{fundraiser.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {fundraiser.city}, {fundraiser.state}
            </CardSubtitle>
            <CardText>{fundraiser.description}</CardText>
            <CardText>
              {fundraiser.ampount_raised} out of {fundraiser.goal}
            </CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
