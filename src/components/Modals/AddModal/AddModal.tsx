import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { selectedMode } from '../../../models/types';
import './AddModal.scss';

type addModalProps = {
    selectedMode: selectedMode,
    isSet: boolean,
    closeModal: () => void
}

class AddModal extends React.Component<addModalProps> {

    render() {
        let welcomeMessage, form;

        if (this.props.selectedMode === 'lost') {
            welcomeMessage = 'Add a lost pet!'
            // add form
        } else {
            welcomeMessage = 'Add a found pet!'
            // add form
        }
        return (
            <Modal show={this.props.isSet} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{welcomeMessage}</Modal.Title>
                </Modal.Header>
                <Modal.Body>TODO: add search forms here</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={this.props.closeModal}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddModal;