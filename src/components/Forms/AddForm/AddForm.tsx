import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { FaDog, FaEye } from 'react-icons/fa';
import { coordinates, selectedMode } from '../../../models/types';
import Maps from '../../Maps/Maps';
import ImageForm from '../ImageForm/ImageForm';
import './AddForm.scss';

type addFormProps = {
    closeModal: () => void,
    selectedMode: selectedMode,
    fetchPets: () => void,
    myAdSelected: () => void
}

type addFormsType = 'lost' | 'found' | 'sighted';

class AddForm extends React.Component<addFormProps, { valid: boolean, addPetSelectedMode: addFormsType }> {

    private coordinates: coordinates | null = null;
    private email: string | null = null;
    private animal: string | null = null;
    private breed: string | null = null;
    private name: string | null = null;
    private imgSrc: string | null = null;
    private recaptcha: any | null = null;

    constructor(props: addFormProps) {
        super(props);
        this.state = { valid: true, addPetSelectedMode: 'found' };
        this.handleSightedClick = this.handleSightedClick.bind(this);
        this.handleFoundClick = this.handleFoundClick.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setAnimal = this.setAnimal.bind(this);
        this.setName = this.setName.bind(this);
        this.setImgSrc = this.setImgSrc.bind(this);
        this.setRecaptcha = this.setRecaptcha.bind(this);
    }

    public setCoordinates(coordinates: coordinates) {
        this.coordinates = coordinates;
    }

    public setRecaptcha(recaptcha: any) {
        this.recaptcha = recaptcha;
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
        this.name = event.target.value;
    }

    public setImgSrc(imgSrc: any) {
        this.imgSrc = imgSrc;
    }

    public handleFoundClick(): void {
        this.setState({ ...this.state, addPetSelectedMode: 'found' });
    }

    public handleSightedClick(): void {
        this.setState({ ...this.state, addPetSelectedMode: 'sighted' });
    }

    public handleSubmit(event: any, type: addFormsType): void {
        event.preventDefault();
        let canPost: boolean = false;
        let switchToMyAd: boolean = false;

        //Check if user can post
        if (type === 'lost' && this.name && this.animal && this.email
            && this.imgSrc && this.breed && this.coordinates && this.recaptcha) {
            canPost = true;
            switchToMyAd = true;
            localStorage.setItem('myAd', 'true');
            localStorage.setItem('petName', this.name);
            localStorage.setItem('animal', this.animal);
            localStorage.setItem('email', this.email);
            localStorage.setItem('imgSrc', this.imgSrc);
            localStorage.setItem('breed', this.breed);
            localStorage.setItem('lat', this.coordinates.lat.toString());
            localStorage.setItem('lng', this.coordinates.lng.toString());
        } else if (type === 'found' && this.animal && this.email && this.imgSrc) {
            canPost = true;
        } else if (type === 'sighted' && this.imgSrc && this.coordinates) {
            canPost = true;
        }

        if (canPost) {
            this.postPetData(type);
            if (switchToMyAd) {
                this.props.myAdSelected();
            }
        }

    }

    public postPetData(type: addFormsType) {
        if (type === 'lost') {
            this.postLostPet();
        } else if (type === 'found') {
            this.postFoundPet();
        } else if (type === 'sighted') {
            this.postSightedPet();
        }
    }

    public postLostPet() {
        axios.post('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=lost', {
            name: this.name ? this.name : '',
            email: this.email ? this.email : '',
            animal: this.animal ? this.animal : '',
            breed: this.breed ? this.breed : '',
            lat: this.coordinates ? this.coordinates.lat.toString() : '',
            lng: this.coordinates ? this.coordinates.lng.toString() : '',
            imageUrl: this.imgSrc ? this.imgSrc : ''
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'localhost:3000'
            }
        })
            .then((response: any) => {
                console.log(response);
                this.props.fetchPets();
                this.props.closeModal();
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public postFoundPet() {
        axios.post('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=found', {
            email: this.email ? this.email : '',
            animal: this.animal ? this.animal : '',
            breed: this.breed ? this.breed : '',
            imageUrl: this.imgSrc ? this.imgSrc : ''
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'localhost:3000'
            }
        })
            .then((response: any) => {
                console.log(response);
                this.props.fetchPets();
                this.props.closeModal();
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public postSightedPet() {
        axios.post('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=sighted', {
            lat: this.coordinates ? this.coordinates.lat.toString() : '',
            lng: this.coordinates ? this.coordinates.lng.toString() : '',
            imageUrl: this.imgSrc ? this.imgSrc : ''
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'localhost:3000'
            }
        })
            .then((response: any) => {
                console.log(response);
                this.props.fetchPets();
                this.props.closeModal();
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public getAddFoundPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event, 'found')}>
                <Form.Row>
                    <Form.Group controlId="validationEmailAdress">
                        <div id="warning">
                            Note that "Found" means you have the pet in your possession, and "Sighted" means you only have a picture of it.
                        </div>
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
                            placeholder="ex: dog"
                            onChange={(event: any) => { this.setAnimal(event) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group><br />
                    <Form.Group controlId="validationAnimal">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ex: Beagle (optional)"
                            onChange={(event: any) => { this.setBreed(event) }}
                        />
                    </Form.Group>
                </Form.Row>
                <ImageForm setImgSrc={this.setImgSrc}></ImageForm>
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getLostPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event, 'lost')}>
                <Form.Row>
                    <Form.Group controlId="validationName">
                        <Form.Label>Pet's Name(s)</Form.Label>
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
                            placeholder="ex: dog"
                            onChange={(event: any) => { this.setAnimal(event) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationBreed">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="ex: Beagle"
                            onChange={(event: any) => { this.setBreed(event) }}
                        />
                    </Form.Group>
                </Form.Row>
                <div id="text-center">
                    Click on the map to let us <br />know where your pet was last seen ! (required)
                </div>
                <Maps returnCoordinates={this.setCoordinates}></Maps>
                <ImageForm setImgSrc={this.setImgSrc}></ImageForm>
                <ReCAPTCHA
                    sitekey="6LfRs-4UAAAAAJ5xG3ioZD-se2mAxGaYSojbRmBR"
                    onChange={(event: any) => this.setRecaptcha(event)}
                />
                <Button id="submit-button" variant="success" type="submit">Submit</Button>
            </Form>
        );
    }

    public getSightedPetForm(): any {
        return (
            <Form noValidate validated={this.state.valid} onSubmit={(event: any) => this.handleSubmit(event, 'sighted')}>
                <Maps returnCoordinates={this.setCoordinates}></Maps>
                <ImageForm setImgSrc={this.setImgSrc}></ImageForm>
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