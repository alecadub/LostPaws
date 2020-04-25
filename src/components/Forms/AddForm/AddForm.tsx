import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddForm.scss';
import { selectedMode, coordinates } from '../../../models/types';
import { FaDog, FaEye } from 'react-icons/fa';
import Maps from '../../Maps/Maps';

type addFormProps = {
    closeModal: () => void,
    selectedMode: selectedMode,
    fetchPets: () => void
}

type addFormsType = 'lost' | 'found' | 'sighted';

class AddForm extends React.Component<addFormProps, { valid: boolean, addPetSelectedMode: addFormsType }> {

    private coordinates: coordinates | null = null;
    private email: string | null = null;
    private animal: string | null = null;
    private breed: string | null = null;
    private name: string | null = null;

    constructor(props: addFormProps) {
        super(props);
        this.state = { valid: true, addPetSelectedMode: 'found' };
        this.handleSightedClick = this.handleSightedClick.bind(this);
        this.handleFoundClick = this.handleFoundClick.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setAnimal = this.setAnimal.bind(this);
        this.setName = this.setName.bind(this);
    }

    public setCoordinates(coordinates: coordinates) {
        this.coordinates = coordinates;
    }

    public setEmail(event: any) {
        this.email = event.target.value;
    }

    public setAnimal(event: any) {
        this.animal = event.target.value;
    }

    public setBreed(event: any) {
        this.breed = event.target.value;
    }

    public setName(event: any) {
        console.log(event.target.value)
        this.name = event.target.value;
    }

    public handleFoundClick(): void {
        this.setState({ ...this.state, addPetSelectedMode: 'found' });
    }

    public handleSightedClick(): void {
        this.setState({ ...this.state, addPetSelectedMode: 'sighted' });
    }

    public handleSubmit(event: any, type: addFormsType): void {
        let dataToPost: any = {};
        event.preventDefault();

        if (this.email) {
            dataToPost['email'] = this.email;
        }

        if (this.breed) {
            dataToPost['breed'] = this.breed;
        }

        if (this.animal) {
            dataToPost['animal'] = this.animal;
        }

        if (this.coordinates) {
            dataToPost['coordinates'] = this.coordinates;
        }

        if (this.name) {
            dataToPost['name'] = this.name;
        }

        if (dataToPost) {
            dataToPost['type'] = type;
            console.log(dataToPost);
            this.postPetData(dataToPost);
            this.props.fetchPets();
            this.props.closeModal();
        }
    }

    public postPetData(data: any) {
        console.log(data);
        //TODO: Post data
    }

    public getPictureUrl(picture: any): string {
        //TODO: Handle picture url 
        return '';
    }

    public getAddFoundPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event, 'found')}>
                <Form.Row>
                    <Form.Group controlId="validationEmailAdress">
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="ex: lostpaws@gmail.com"
                            onChange={(event: any) => { this.setEmail(event) }}
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
                            onChange={(event: any) => { this.setAnimal(event) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationAnimal">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex: Beagle (optional)"
                            onChange={(event: any) => { this.setBreed(event) }}
                        />
                    </Form.Group>
                </Form.Row>
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getLostPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event, 'lost')}>
                <Form.Row>
                    <Form.Group controlId="validationName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="ex: Big Cookie"
                            onChange={(event: any) => { this.setName(event) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationEmailAdress">
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="ex: lostpaws@gmail.com"
                            onChange={(event: any) => { this.setEmail(event) }}
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
                            onChange={(event: any) => { this.setAnimal(event) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationBreed">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex: Beagle (optional)"
                            onChange={(event: any) => { this.setBreed(event) }}
                        />
                    </Form.Group>
                </Form.Row>
                <Maps returnCoordinates={this.setCoordinates}></Maps>
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getSightedPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event, 'sighted')}>
                <Maps returnCoordinates={this.setCoordinates}></Maps>
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