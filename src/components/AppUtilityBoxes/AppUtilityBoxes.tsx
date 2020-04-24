import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { selectedMode } from '../../models/types';
import AddModal from '../Modals/AddModal/AddModal';
import SearchModal from '../Modals/SearchModal/SearchModal';
import './AppUtilityBoxes.scss';


type appUtilityBoxesProps = {
    selectedMode: selectedMode
}

type textEvent = {
    target: {
        value: string,
    }
}

class AppUtilityBoxes extends React.Component<appUtilityBoxesProps, { value: string, openSearchModal: boolean, openFoundModal: boolean }> {

    constructor(props: appUtilityBoxesProps) {
        super(props);
        this.state = { value: '', openSearchModal: false, openFoundModal: false };
        this.handleChange = this.handleChange.bind(this);
        this.openSearchModal = this.openSearchModal.bind(this);
        this.closeSearchModal = this.closeSearchModal.bind(this);
        this.openFoundModal = this.openFoundModal.bind(this);
        this.closeFoundModal = this.closeFoundModal.bind(this);
    }

    public handleChange(event: textEvent): void {
        this.setState({ ...this.state, value: event.target.value });
    }

    public openSearchModal(): void {
        this.setState({ ...this.state, openSearchModal: true })
    }

    public closeSearchModal(): void {
        this.setState({ ...this.state, openSearchModal: false })
    }

    public openFoundModal(): void {
        this.setState({ ...this.state, openFoundModal: true })
    }

    public closeFoundModal(): void {
        this.setState({ ...this.state, openFoundModal: false })
    }

    render() {
        return (
            <div id="func-buttons">
                <SearchModal selectedMode={this.props.selectedMode} isSet={this.state.openSearchModal} closeModal={this.closeSearchModal}></SearchModal>
                <AddModal selectedMode={this.props.selectedMode} isSet={this.state.openFoundModal} closeModal={this.closeFoundModal}></AddModal>
                <Button id="add-button" variant="success" onClick={this.openFoundModal}><FaPlus /></Button>
                <Button id="search-button" variant="info" onClick={this.openSearchModal}><FaSearch /></Button>
                <input id="search-bar" placeholder="Quick search" value={this.state.value} onChange={this.handleChange} />
            </div>
        );
    }
}

export default AppUtilityBoxes;
