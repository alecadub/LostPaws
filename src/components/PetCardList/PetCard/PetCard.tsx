import React from 'react';
import './PetCard.scss';
import { Card } from 'react-bootstrap';

type PetCardProps = {
  key: number ,
  imgSrc?: any | null,
  name?: string | null,
  email?: string | null,
  animal?: string | null,
  breed?: string | null,
  lat?: string | null,
  lng?: string | null,
  type: string
}

class PetCard extends React.Component<PetCardProps> {

  render() {
    let cardImg: any;
    if (this.props.imgSrc) {
      cardImg = <Card.Img variant="top" id="image-card"
        src={this.props.imgSrc} />
    } else {
      cardImg = <Card.Img variant="top" id="image-card"
        src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg" />
    }
    return (
      <Card id="pet-card">
        {cardImg}
        <Card.Body>
          <Card.Title>{this.props.type}:{this.props.name}</Card.Title>
          <Card.Text>
            {this.props.email}  <br />
            {this.props.animal} - {this.props.breed} <br />
            {this.props.lat} - {this.props.lng}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default PetCard;
