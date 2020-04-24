import React from 'react';
import { Modal } from 'react-bootstrap';
import { selectedMode } from '../../../models/types';
import AddForm from '../../Forms/AddForm/AddForm';
import './AddModal.scss';

type addModalProps = {
    selectedMode: selectedMode,
    isSet: boolean,
    closeModal: () => void
}

class AddModal extends React.Component<addModalProps> {

    render() {
        let welcomeMessage;

        if (this.props.selectedMode === 'lost') {
            welcomeMessage = 'Add a lost pet!'
        } else {
            welcomeMessage = 'Add a found or sighted pet!'
        }
        return (
            <Modal show={this.props.isSet} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{welcomeMessage}</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddForm closeModal={this.props.closeModal} selectedMode={this.props.selectedMode}></AddForm></Modal.Body>
            </Modal>
        );
    }
}

export default AddModal;