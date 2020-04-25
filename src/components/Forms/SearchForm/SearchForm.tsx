import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { searchData, coordinates } from '../../../models/types';
import './SearchForm.scss';
import Maps from '../../Maps/Maps';

type searchFormProps = {
    closeModal: () => void,
    setSearchData: (searchData: searchData) => void,
}

class SearchForm extends React.Component<searchFormProps, { valid: boolean }> {

    private coordinates: coordinates | null = null;

    constructor(props: searchFormProps) {
        super(props);
        this.state = { valid: true };
        this.setCoordinates = this.setCoordinates.bind(this);
    }

    public handleSubmit(event: any): void {
        event.preventDefault();

        let searchData: searchData = {}

        //TODO: Change to loops
        if (event.target[0]) {
            searchData = { ...searchData, animal: event.target[0].value }
        }
        if (event.target[1]) {
            searchData = { ...searchData, breed: event.target[1].value }
        }

        if (this.coordinates) {
            searchData = { ...searchData, coordinates: this.coordinates }
        }

        if (searchData.animal || searchData.breed || searchData.coordinates) {
            this.setState({ valid: true });
            this.props.setSearchData(searchData);
            this.props.closeModal();
        } else {
            this.setState({ valid: false });
        }

    }

    public setCoordinates(coordinates: coordinates) {
        this.coordinates = coordinates;
    }

    public getPictureUrl(picture: any): string {
        //TODO: Handle picture url 
        return '';
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
                {errorMessage}
                <Button id="submit-button" variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default SearchForm;