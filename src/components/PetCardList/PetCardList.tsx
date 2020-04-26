import React from 'react';
import PetCard from './PetCard/PetCard';
import './PetCardList.scss';
import { searchData, selectedMode } from '../../models/types';
import axios from 'axios';

type petCardListProps = {
    filters: searchData,
    selectedMode: selectedMode,
    quickSearch: string
}

class PetCardList extends React.Component<petCardListProps, { loading: boolean, pets: any, selectedMode: selectedMode }> {


    constructor(props: petCardListProps) {
        super(props);
        this.state = { loading: false, pets: null, selectedMode: 'lost' };
        this.setLoading = this.setLoading.bind(this);
        this.getAllLostPets = this.getAllLostPets.bind(this);
        this.getAllFoundSightedPets = this.getAllFoundSightedPets.bind(this);
        this.setSelectedMode = this.setSelectedMode.bind(this);
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
                console.log(resp.data.result);
                this.setState({ ...this.state, pets: resp.data.result, selectedMode: 'lost' });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    public getAllFoundSightedPets() {
        axios.get('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev/retrieved')
            .then((resp: any) => {
                console.log(resp);
                this.setState({ ...this.state, pets: resp.data.result, selectedMode: 'found' });
            })
            .catch((resp: any) => {
                console.error(resp);
            })
    }

    public setSelectedMode(selectedMode: selectedMode) {
        this.setState({ ...this.state, selectedMode });
    }

    render() {
        let tempPets: any;

        if (this.props.selectedMode === 'lost' && this.state.selectedMode !== 'lost') {
            console.log('test');
            this.getAllLostPets();
        }
        if (this.props.selectedMode === 'found' && this.state.selectedMode !== 'found') {
            // this.getAllFoundSightedPets();
            tempPets = this.mockNumberOfCards();
        }

        if (this.props.selectedMode === 'myad' && this.state.selectedMode !== 'myad') {
            this.setSelectedMode('myad');
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