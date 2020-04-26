import React from 'react';
import PetCard from './PetCard/PetCard';
import './PetCardList.scss';
import { searchData, selectedMode } from '../../models/types';

type petCardListProps = {
    filters: searchData,
    selectedMode: selectedMode,
    quickSearch: string
}

class PetCardList extends React.Component<petCardListProps, { loading: boolean }> {

    constructor(props: petCardListProps) {
        super(props);
        this.state = { loading: false };
        this.getFormData = this.getFormData.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    public mockNumberOfCards(): number[] {
        let mockCards: number[] = [];
        for (let i: number = 0; i < 30; i++) {
            mockCards.push(1);
        }
        return mockCards;
    }

    public setLoading(loading: boolean) {
        this.setState({ loading });
    }

    public getFormData(): FormData {
        const data = new FormData();

        if (this.props.filters.animal) {
            data.append('animal', this.props.filters.animal);
        } else {
            data.append('animal', '');
        }
        if (this.props.filters.breed) {
            data.append('breed', this.props.filters.breed);
        } else {
            data.append('breed', '');
        }
        if (this.props.filters.coordinates) {
            data.append('lat', this.props.filters.coordinates.lat.toString());
            data.append('lng', this.props.filters.coordinates.lng.toString());
        } else {
            data.append('lat', '');
            data.append('lng', '');
        }
        return data;
    }

    public async getCards(data: FormData) {
        this.setLoading(true);
        const request = await fetch('test', { //TODO: Change with good URL.
            method: 'POST',
            body: data
        })
        this.setLoading(false);
        return await request.json();
    }

    public async getAllCards() {
        this.setLoading(true);
        const request = await fetch('https://naxb0qignf.execute-api.us-east-1.amazonaws.com/dev?type=lost', {
            method: 'GET'
        });
        console.log(request);
        this.setLoading(false);
        return await request.json();

    }

    render() {
        // let formData: FormData = this.getFormData();
        // let petData = this.getCards(formData);
        console.log(this.props);

        let cards = this.mockNumberOfCards();


        return (
            <div id="cards">
                {cards.map((result, i) => {
                    return <PetCard key={i} title="The Dog" text="The most beautiful thing in the world."></PetCard>
                })}
            </div>
        );
    }
}

export default PetCardList;