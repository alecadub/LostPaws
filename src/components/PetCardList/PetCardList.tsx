import React from 'react';
import PetCard from './PetCard/PetCard';
import './PetCardList.scss';
import { searchData, selectedMode } from '../../models/types';
import axios from 'axios';

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
        axios.get('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=lost')
            .then((resp: any) => {
                this.props.dontFetchPets();
                this.setState({ ...this.state, pets: resp.data.result });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    public getAllFoundSightedPets() {
        axios.get('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=found')
            .then((resp: any) => {
                this.props.dontFetchPets();
                this.setState({ ...this.state, pets: resp.data.result });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }


    render() {
        let tempPets: any;
        if (this.props.selectedMode === 'lost' && this.props.fetchPets) {
            this.getAllLostPets();
        }
        if (this.props.selectedMode === 'found' && this.props.fetchPets) {
            console.log('test');
            this.getAllFoundSightedPets();
        }

        if (this.props.selectedMode === 'myad' && this.props.fetchPets) {
            this.props.dontFetchPets();
        }

        let pets: any = this.state.pets ? this.state.pets : this.mockNumberOfCards();

        if (tempPets) {
            pets = tempPets;
        }

        return (
            <div id="cards">
                {pets.map((result: any, i: any) => {
                    return (
                        <PetCard key={i} imgSrc={result.imageUrl}
                            name={result.name} type={this.props.selectedMode} email={result.email}
                            animal={result.animal} breed={result.breed}
                            lat={result.lat} lng={result.lng}>
                        </PetCard>
                    )
                })}
            </div>
        );
    }
}

export default PetCardList;