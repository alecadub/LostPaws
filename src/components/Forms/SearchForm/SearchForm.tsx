import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { searchData } from '../../../models/types';
import './SearchForm.scss';
import Maps from '../../Maps/Maps';

type searchFormProps = {
    closeModal: () => void,
}

class SearchForm extends React.Component<searchFormProps, { valid: boolean }> {

    constructor(props: searchFormProps) {
        super(props);
        this.state = { valid: true };
    }

    public handleSubmit(event: any): void {
        event.preventDefault();
        let searchData: searchData = {}

        if (event.target[0]) {
            searchData = { ...searchData, animal: event.target[0].value }
        }
        if (event.target[1]) {
            searchData = { ...searchData, breed: event.target[1].value }
        }
        if (event.target[2]) {
            let imgSrc: string = this.getPictureUrl(event.target[2].value);
            searchData = { ...searchData, imgSrc: imgSrc }
        }

        if (searchData.animal || searchData.breed || searchData.imgSrc) {
            this.setState({ valid: true });
            this.props.closeModal();
        } else {
            this.setState({ valid: false });
        }

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
                <Maps></Maps>
                {errorMessage}
                <Button id="submit-button" variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default SearchForm;