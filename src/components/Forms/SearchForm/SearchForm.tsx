import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { searchData, coordinates } from '../../../models/types';
import './SearchForm.scss';
import Maps from '../../Maps/Maps';
import ImageForm from '../ImageForm/ImageForm';

type searchFormProps = {
    closeModal: () => void,
    setSearchData: (searchData: searchData) => void,
}

class SearchForm extends React.Component<searchFormProps, { valid: boolean }> {

    private coordinates: coordinates | null = null;
    private imgSrc: string | null = null;

    constructor(props: searchFormProps) {
        super(props);
        this.state = { valid: true };
        this.setCoordinates = this.setCoordinates.bind(this);
        this.setImgSrc = this.setImgSrc.bind(this);
    }

    public setCoordinates(coordinates: coordinates) {
        this.coordinates = coordinates;
    }

    public async setImgSrc(picture: any) {
        const files = picture;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'apu_preset');
        const res = await fetch('https://api.cloudinary.com/v1_1/apu-cloud/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json();
        this.imgSrc = file.secure_url;
    }

    public handleSubmit(event: any): void {
        event.preventDefault();

        let searchData: searchData = {}

        if (event.target[0]) {
            searchData = { ...searchData, animal: event.target[0].value };
        }

        if (event.target[1]) {
            searchData = { ...searchData, breed: event.target[1].value };
        }

        if (this.coordinates) {
            searchData = { ...searchData, coordinates: this.coordinates };
        }

        if (this.imgSrc) {
            searchData = { ...searchData, imgSrc: this.imgSrc };
        }

        if (searchData.animal || searchData.breed || searchData.coordinates) {
            this.setState({ valid: true });
            this.props.setSearchData(searchData);
            this.props.closeModal();
        } else {
            this.setState({ valid: false });
        }

    }

    render() {
        let errorMessage: any = '';

        if (!this.state.valid) {
            errorMessage = <span id="error-message">Fill a field or enter an image to start your search ! <br />(1 minimum)</span>;
        }

        return (
            <Form onSubmit={(event: any) => this.handleSubmit(event)}>
                <Form.Group controlId="animal">
                    <Form.Label>Type of animal</Form.Label>
                    <Form.Control type="text" placeholder="Enter type of animal (optional)" />
                </Form.Group>
                <Form.Group controlId="breed">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control type="text" placeholder="Enter breed of animal (optional)" />
                </Form.Group>
                <Maps returnCoordinates={this.setCoordinates}></Maps>
                <ImageForm setImgSrc={this.setImgSrc}></ImageForm>
                {errorMessage}
                <Button id="submit-button" variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default SearchForm;