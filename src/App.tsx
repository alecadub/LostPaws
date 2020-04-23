import React from 'react';
import { Button } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header/Header';
import PetCard from './components/PetCard/PetCard';
import { FaPlus, FaSearch } from 'react-icons/fa';
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
        <div id="func-buttons">
          <Button id="add-button" variant="success"><FaPlus /></Button>
          <Button id="search-button" variant="info"><FaSearch /></Button>
        </div>
        <div id="cards">
          {cards.map(() => {
            return <PetCard title="The Dog" text="The most beautiful thing in the world."></PetCard>
          })}
        </div>
      </div>
    );
  }
}

export default App;
