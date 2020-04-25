import React from 'react';
import './PetCard.scss';
import { Card } from 'react-bootstrap';

type PetCardProps = {
  key: number,
  imgSrc?: any,
  title: string,
  text: string,
}

class PetCard extends React.Component<PetCardProps> {

  render() {
    return (
      <Card id="pet-card">
        <Card.Img variant="top" src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg" />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>
            {this.props.text}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default PetCard;
