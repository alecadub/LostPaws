import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { GoLocation } from "react-icons/go";
import Maps from '../../Maps/Maps';
import './PetCard.scss';

type PetCardProps = {
  key: number,
  imgSrc?: any | null,
  name?: string | null,
  email?: string | null,
  animal?: string | null,
  breed?: string | null,
  lat?: string | null,
  lng?: string | null,
  type: string
}

class PetCard extends React.Component<PetCardProps, { show: boolean }> {

  constructor(props: PetCardProps) {
    super(props);
    this.state = { show: false };
    this.setModalState = this.setModalState.bind(this);
  }

  public setModalState(show: boolean) {
    this.setState({ show })
  }

  render() {
    let cardImg: any;
    let realType: string = this.props.email ? this.props.type : 'Sighted';
    let location: any;

    if (realType === 'myad') {
      realType = 'SIMILAR';
    }

    if (this.props.imgSrc) {
      cardImg = <Card.Img variant="top" id="image-card"
        src={this.props.imgSrc} />
    } else {
      cardImg = <Card.Img variant="top" id="image-card"
        src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg" />
    }

    if (this.props.lat && this.props.lng) {
      location = <Button id="location-button" variant="primary" onClick={(event: any) => this.setModalState(true)}><GoLocation />Location</Button>;
    }

    return (
      <div>
        <Modal show={this.state.show} onHide={() => this.setModalState(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Location</Modal.Title>
          </Modal.Header>
          <Modal.Body><Maps lat={this.props.lat} lng={this.props.lng}></Maps></Modal.Body>
        </Modal>
        <Card id="pet-card">
          {cardImg}
          <Card.Body>
            <Card.Title>{realType.toUpperCase()}: {this.props.name}</Card.Title>
            <Card.Text>
              {this.props.email ? <span>Email: {this.props.email}<br /></span> : null}
              {this.props.animal ? <span>Animal: {this.props.animal}<br /></span> : null}
              {this.props.breed ? <span>Breed: {this.props.breed}<br /></span> : null}
              {location}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

    );
  }
}

export default PetCard;
