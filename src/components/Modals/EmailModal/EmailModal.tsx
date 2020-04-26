import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './SearchModal.scss';

type searchModalProps = {
    isSet: boolean,
    closeModal: () => void,
}

class SearchModal extends React.Component<searchModalProps, { show: boolean, valid: boolean }> {

    private email: string | null = null;

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            valid: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

    public setEmail(event: any) {
        this.email = event.target.value;
    }

    public closeModal() {
        this.setState({ show: true })
    }

    public handleSubmit(event: any) {
        event.preventDefault();
    }

    render() {

        return (
            <Modal show={this.props.isSet} onHide={() => this.closeModal()}>
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
                        <Button id="submit-button" variant="success" type="submit">Submit</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        );
    }
}

export default SearchModal;