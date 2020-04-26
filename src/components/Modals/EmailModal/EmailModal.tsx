import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './EmailModal.scss';
import axios from 'axios';

type EmailModalProps = {
    isSet: boolean,
    closeModal: () => void,
    id: string
}

class EmailModal extends React.Component<EmailModalProps, { show: boolean, valid: boolean }> {

    private email: string | null = null;
    private errorMsg: string | null = null;

    constructor(props: any) {
        super(props);
        this.state = {
            show: true,
            valid: true
        };
        this.closeModal = this.closeModal.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPetById = this.getPetById.bind(this);
    }

    public setEmail(event: any) {
        this.email = event.target.value;
    }

    public closeModal() {
        this.setState({ show: false });
    }

    public handleSubmit(event: any) {
        event.preventDefault();
        if (this.email) {
            this.getPetById();

        }
    }

    public getPetById() {
        let link: any = 'https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=lost&id=' + this.props.id
        axios.get(link)
            .then((resp: any) => {
                if (resp.data.email === this.email) {
                    this.errorMsg = null;
                    this.setState({ ...this.state, show: false });
                    localStorage.setItem('myAd', 'true');
                    localStorage.setItem('petName', resp.data.name);
                    localStorage.setItem('animal', resp.data.animal);
                    localStorage.setItem('email', resp.data.email);
                    localStorage.setItem('imgSrc', resp.data.imageUrl);
                    localStorage.setItem('breed', resp.data.breed);
                    localStorage.setItem('lat', resp.data.lat);
                    localStorage.setItem('lng', resp.data.lng);
                    this.setState({ ...this.state, show: false });
                    this.props.closeModal();
                } else {
                    this.errorMsg = 'The email is valid, but doesn\'t match the email associated with the pet.';
                    this.setState({ ...this.state, show: true });
                }
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    render() {

        return (
            <Modal show={this.props.isSet} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event)}>
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="ex: lostpaws@gmail.com"
                            onChange={(event: any) => { this.setEmail(event) }}
                        />
                        <p id="red">
                            {this.errorMsg}
                        </p>
                        <Button id="submit-button" variant="success" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EmailModal;