import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { searchData, selectedMode } from '../../models/types';
import AddModal from '../Modals/AddModal/AddModal';
import SearchModal from '../Modals/SearchModal/SearchModal';
import './AppUtilityBoxes.scss';
import FilterBox from './FilterBox/FilterBox';

type appUtilityBoxesProps = {
    selectedMode: selectedMode,
    setSearchData: (searchData: searchData) => void,
    fetchPets: () => void
}

type textEvent = {
    target: {
        value: string,
    }
}

class AppUtilityBoxes extends React.Component<appUtilityBoxesProps, { value: string, openSearchModal: boolean, openFoundModal: boolean }> {

    private searchData: searchData = {
        animal: undefined,
        breed: undefined,
        imgSrc: undefined,
        coordinates: undefined
    };

    constructor(props: appUtilityBoxesProps) {
        super(props);
        this.state = { value: '', openSearchModal: false, openFoundModal: false };
        this.handleChange = this.handleChange.bind(this);
        this.openSearchModal = this.openSearchModal.bind(this);
        this.closeSearchModal = this.closeSearchModal.bind(this);
        this.openFoundModal = this.openFoundModal.bind(this);
        this.closeFoundModal = this.closeFoundModal.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
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

    public setFilter(searchData: searchData): void {
        this.searchData = searchData;
        this.props.setSearchData(searchData);
    }

    //TODO: Change to loops
    public closeFilter(type: string): void {
        if (type === 'Animal') {
            this.searchData.animal = undefined;
        } else if (type === 'Image') {
            this.searchData.imgSrc = undefined;
        } else if (type === 'Breed') {
            this.searchData.breed = undefined;
        } else if (type === 'Location') {
            this.searchData.coordinates = undefined
        }
        this.setFilter(this.searchData);
    }

    //TODO: Change to loops
    public getFilterBoxes(): any {
        let filterAnimal: any, filterImgSrc: any, filterBreed: any, filterCoordinates: any;
        if (this.searchData.animal) {
            filterAnimal = <FilterBox name={this.searchData.animal} type='Animal' setSearchTypeToNull={this.closeFilter}></FilterBox>
        }
        if (this.searchData.imgSrc) {
            filterImgSrc = <FilterBox type='Image' setSearchTypeToNull={this.closeFilter}></FilterBox>
        }
        if (this.searchData.breed) {
            filterBreed = <FilterBox name={this.searchData.breed} type='Breed' setSearchTypeToNull={this.closeFilter}></FilterBox>
        }
        if (this.searchData.coordinates) {
            filterCoordinates = <FilterBox type="Location" setSearchTypeToNull={this.closeFilter}></FilterBox>
        }
        return (
            <div id="div-filter">
                {filterAnimal}
                {filterImgSrc}
                {filterBreed}
                {filterCoordinates}
            </div>
        );
    }

    render() {
        let filterBoxes = this.getFilterBoxes();
        return (
            <div id="func-buttons">
                <SearchModal selectedMode={this.props.selectedMode} isSet={this.state.openSearchModal}
                    closeModal={this.closeSearchModal} setSearchData={this.setFilter}></SearchModal>
                <AddModal selectedMode={this.props.selectedMode} isSet={this.state.openFoundModal}
                    closeModal={this.closeFoundModal} fetchPets={this.props.fetchPets}></AddModal>
                {filterBoxes}
                <Button id="add-button" variant="success" onClick={this.openFoundModal}><FaPlus /></Button>
                <Button id="search-button" variant="info" onClick={this.openSearchModal}><FaSearch /></Button>
                <input id="search-bar" placeholder="Quick search" value={this.state.value} onChange={this.handleChange} />
            </div>
        );
    }
}

export default AppUtilityBoxes;
