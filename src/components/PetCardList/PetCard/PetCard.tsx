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
    let cardImg: any;
    if (this.props.imgSrc) {
      cardImg = <Card.Img variant="top"
        src={this.props.imgSrc} />
    } else {
      cardImg = <Card.Img variant="top"
        src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg" />
    }
    return (
      <Card id="pet-card">
        {cardImg}
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
