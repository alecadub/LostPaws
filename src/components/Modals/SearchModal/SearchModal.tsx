import React from 'react';
import { Modal } from 'react-bootstrap';
import { selectedMode } from '../../../models/types';
import './SearchModal.scss';
import SearchForm from '../../Forms/SearchForm/SearchForm';

type searchModalProps = {
    selectedMode: selectedMode,
    isSet: boolean,
    closeModal: () => void
}

class SearchModal extends React.Component<searchModalProps> {

    render() {
        let welcomeMessage;

        if (this.props.selectedMode === 'lost') {
            welcomeMessage = 'Search a lost pet!'
        } else {
            welcomeMessage = 'Search a found pet!'
        }
        return (
            <Modal show={this.props.isSet} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{welcomeMessage}</Modal.Title>
                </Modal.Header>
                <Modal.Body><SearchForm closeModal={this.props.closeModal}></SearchForm></Modal.Body>
            </Modal>
        );
    }
}

export default SearchModal;