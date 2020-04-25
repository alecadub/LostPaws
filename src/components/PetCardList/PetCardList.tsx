import React from 'react';
import PetCard from './PetCard/PetCard';
import './PetCardList.scss';
import { searchData, selectedMode } from '../../models/types';

type petCardListProps = {
    filters: searchData,
    selectedMode: selectedMode
}

class PetCardList extends React.Component<petCardListProps> {

    public mockNumberOfCards(): number[] {
        let mockCards: number[] = [];
        for (let i: number = 0; i < 30; i++) {
            mockCards.push(1);
        }
        return mockCards;
    }

    render() {
        console.log(this.props);
        let cards = this.mockNumberOfCards(); //TODO: Get real pets from props
        

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