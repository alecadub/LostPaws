import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddForm.scss';
import { selectedMode } from '../../../models/types';

type addFormProps = {
    closeModal: () => void,
    selectedMode: selectedMode
}

type addLostData = {
    email: string
}

class AddForm extends React.Component<addFormProps, { valid: boolean }> {

    constructor(props: addFormProps) {
        super(props);
        this.state = { valid: true };
    }

    public handleSubmit(event: any): void {
        event.preventDefault();


    }

    public getPictureUrl(picture: any): string {
        //TODO: Handle picture url 
        return '';
    }

    render() {
        let emailMessage: string;
        if (this.props.selectedMode === 'lost') {
            emailMessage = 'Someone will contact you if they found your pet!'
        } else {
            emailMessage = 'Owner will contact you if the pet is in our system!'
        }


        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event)}>
                <Form.Row>
                    <Form.Group controlId="validationEmailAdress">
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="ex: lostpaws@gmail.com"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            {emailMessage}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Button id="submit-button" variant="success" type="submit">Submit form</Button>
            </Form>
        );
    }
}

export default AddForm;