import React from 'react';
import PetCard from './PetCard/PetCard';
import './PetCardList.scss';
import { searchData, selectedMode } from '../../models/types';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { FaRegSadCry } from 'react-icons/fa';

type petCardListProps = {
    filters: searchData,
    selectedMode: selectedMode,
    quickSearch: string,
    fetchPets: boolean,
    dontFetchPets: () => void
}

class PetCardList extends React.Component<petCardListProps, { loading: boolean, pets: any }> {


    constructor(props: petCardListProps) {
        super(props);
        this.state = { loading: false, pets: null };
        this.setLoading = this.setLoading.bind(this);
        this.getAllLostPets = this.getAllLostPets.bind(this);
        this.getAllFoundSightedPets = this.getAllFoundSightedPets.bind(this);
    }

    public componentDidMount() {
        this.getAllLostPets();
    }

    public mockNumberOfCards(): number[] {
        let mockCards: any[] = [];
        for (let i: number = 0; i < 20; i++) {
            mockCards.push({});
        }
        return mockCards;
    }

    public setLoading(loading: boolean) {
        this.setState({ loading });
    }

    public getAllLostPets() {
        let link: any = 'https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=lost' + this.getFilteredString();
        axios.get(link)
            .then((resp: any) => {
                this.props.dontFetchPets();
                this.setState({ ...this.state, pets: resp.data.result });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    public getAllFoundSightedPets() {
        let link: any = 'https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=retrieved' + this.getFilteredString();
        axios.get(link)
            .then((resp: any) => {
                this.props.dontFetchPets();
                this.setState({ ...this.state, pets: resp.data.result });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    public getSimilarPets() {
        let link: any = 'https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=retrieved' + this.getFilteredStringFromStorage();
        axios.get(link)
            .then((resp: any) => {
                this.props.dontFetchPets();
                this.setState({ ...this.state, pets: resp.data.result });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    public getFilteredString() {
        let filteredString: string = '';
        filteredString = this.props.filters.animal ?
            filteredString.concat('&animal=' + this.props.filters.animal) : filteredString;

        filteredString = this.props.filters.breed ?
            filteredString.concat('&breed=' + this.props.filters.breed) : filteredString;

        filteredString = this.props.filters.imgSrc ?
            filteredString.concat('&imageSrc=' + this.props.filters.imgSrc) : filteredString;

        filteredString = this.props.filters.coordinates ?
            filteredString.concat('&lat=' + this.props.filters.coordinates.lat) : filteredString;

        filteredString = this.props.filters.coordinates ?
            filteredString.concat('&lng=' + this.props.filters.coordinates.lng) : filteredString;

        return filteredString;
    }

    public getFilteredStringFromStorage() {
        let filteredString: string = '';
        filteredString = localStorage.getItem('animal') ?
            filteredString.concat('&animal=' + localStorage.getItem('animal')) : filteredString;
        return filteredString;
    }

    public getFilteredPetsFromQuickSearch() {
        let pets: any[] = this.state.pets.filter((result: any, i: any) => {
            for (var key in result) {
                if (result[key].toLowerCase().includes(this.props.quickSearch.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
        this.props.dontFetchPets();
        this.setState({ ...this.state, pets })
    }


    render() {
        let content: any;

        if (this.props.selectedMode === 'lost' && this.props.fetchPets && !this.props.quickSearch) {
            this.getAllLostPets();
        }
        if (this.props.selectedMode === 'found' && this.props.fetchPets && !this.props.quickSearch) {
            this.getAllFoundSightedPets();
        }

        if (this.props.selectedMode === 'myad' && this.props.fetchPets && !this.props.quickSearch) {
            this.getSimilarPets();
        }

        if (this.props.quickSearch && this.props.fetchPets) {
            this.getFilteredPetsFromQuickSearch();
        }

        if (this.props.fetchPets || !this.state.pets) {
            content = (
                <div>
                    <Spinner animation="border" variant="primary" />
                </div>
            )
        } else {
            if (Object.keys(this.state.pets).length === 0) {
                content = (
                    <div id="no-content">
                        <FaRegSadCry id="cry-icons" /><span id="purple-text">No current content match your pet</span><FaRegSadCry id="cry-icons" />
                    </div>
                );
            } else {
                content = (
                    <div id="cards">
                        {this.state.pets.map((result: any, i: any) => {
                            return (
                                <PetCard key={i} imgSrc={result.imageUrl}
                                    name={result.name} type={this.props.selectedMode} email={result.email}
                                    animal={result.animal} breed={result.breed}
                                    lat={result.lat} lng={result.lng}>
                                </PetCard>
                            )
                        })}
                    </div>
                )
            }
        }

        return (
            <div id="cards">
                {content}
            </div>
        );
    }
}

export default PetCardList;