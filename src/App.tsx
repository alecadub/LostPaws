import React from 'react';
import './App.scss';
import AppUtilityBoxes from './components/AppUtilityBoxes/AppUtilityBoxes';
import Header from './components/Header/Header';
import PetCard from './components/PetCard/PetCard';
class App extends React.Component {

  public mockNumberOfCards() {
    let mockCards: number[] = [];
    for (let i: number = 0; i < 30; i++) {
      mockCards.push(1);
    }
    return mockCards;
  }

  render() {
    let cards = this.mockNumberOfCards();


    return (
      <div>
        <Header></Header>
        <AppUtilityBoxes></AppUtilityBoxes>
        <div id="cards">
          {cards.map((result, i) => {
            return <PetCard key={i} title="The Dog" text="The most beautiful thing in the world."></PetCard>
          })}
        </div>
      </div>
    );
  }
}

export default App;
