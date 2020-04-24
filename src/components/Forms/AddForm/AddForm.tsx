import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddForm.scss';
import { selectedMode } from '../../../models/types';
import { FaDog, FaEye } from 'react-icons/fa';
import Maps from '../../Maps/Maps';

type addFormProps = {
    closeModal: () => void,
    selectedMode: selectedMode
}

type addData = {
    email: string
}

type addPetSelectedModed = 'found' | 'sighted';

class AddForm extends React.Component<addFormProps, { valid: boolean, addPetSelectedMode: addPetSelectedModed }> {

    constructor(props: addFormProps) {
        super(props);
        this.state = { valid: true, addPetSelectedMode: 'found' };
        this.handleSightedClick = this.handleSightedClick.bind(this);
        this.handleFoundClick = this.handleFoundClick.bind(this);
    }

    public handleFoundClick(): void {
        this.setState({ ...this.state, addPetSelectedMode: 'found' })
    }

    public handleSightedClick(): void {
        this.setState({ ...this.state, addPetSelectedMode: 'sighted' })
    }

    public handleSubmit(event: any): void {
        event.preventDefault();
        this.props.closeModal();
    }

    public getPictureUrl(picture: any): string {
        //TODO: Handle picture url 
        return '';
    }

    public getAddFoundPetForm(): any {
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
                            Owner will contact you if the pet is in our system!
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="validationAnimal">
                        <Form.Label>Type of Animal</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="ex: dog (required)"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationAnimal">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex: Beagle (optional)"
                        />
                    </Form.Group>
                </Form.Row>
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getLostPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event)}>
                <Form.Row>
                    <Form.Group controlId="validationName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="ex: Big Cookie"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationEmailAdress">
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="ex: lostpaws@gmail.com"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Someone will contact you if they found your pet!
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="validationAnimal">
                        <Form.Label>Type of Animal</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="ex: dog (required)"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationAnimal">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex: Beagle (optional)"
                        />
                    </Form.Group>
                </Form.Row>
                <Maps></Maps>
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getSightedPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event)}>
                <Maps></Maps>
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getSightedSelectedButtons(): any {
        return (
            <div id="div-buttons">
                <Button id="button" variant="outline-primary" onClick={this.handleFoundClick}><FaDog id="icons" />Found</Button>
                <Button variant="primary"><FaEye id="icons" />Sighted</Button>
            </div>
        );
    }

    public getFoundSelectedButtons(): any {
        return (
            <div id="div-buttons">
                <Button id="button" variant="primary" ><FaDog id="icons" />Found</Button>
                <Button variant="outline-primary" onClick={this.handleSightedClick}><FaEye id="icons" />Sighted</Button>
            </div>
        );
    }

    render() {
        let buttons: any;
        let form: any;

        if (this.props.selectedMode === 'lost') {
            form = this.getLostPetForm()
        } else {
            if (this.state.addPetSelectedMode === 'found') {
                buttons = this.getFoundSelectedButtons();
                form = this.getAddFoundPetForm();
            } else {
                buttons = this.getSightedSelectedButtons();
                form = this.getSightedPetForm();
            }
        }

        return (
            <div>
                {buttons}
                {form}
            </div>

        );
    }
}

export default AddForm;