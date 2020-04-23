import React from 'react';
import './App.scss';
import AppUtilityBoxes from './components/AppUtilityBoxes/AppUtilityBoxes';
import Header from './components/Header/Header';
import PetCard from './components/PetCard/PetCard';
import { selectedMode } from './models/types';

class App extends React.Component<{}, { selectedMode: selectedMode }> {

  constructor(props: any) {
    super(props);
    this.state = { selectedMode: 'lost' };
    this.changeSelectedMode = this.changeSelectedMode.bind(this);
    this.lostSelected = this.lostSelected.bind(this);
    this.foundSelected = this.foundSelected.bind(this);
  }

  public changeSelectedMode(selectedMode: selectedMode): void {
    this.setState({ selectedMode });
  }

  public lostSelected(): void {
    this.changeSelectedMode('lost');
  }

  public foundSelected(): void {
    this.changeSelectedMode('found');
  }

  public mockNumberOfCards(): number[] {
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
        <Header selectedMode={this.state.selectedMode} foundSelected={this.foundSelected} lostSelected={this.lostSelected}></Header>
        <AppUtilityBoxes selectedMode={this.state.selectedMode}></AppUtilityBoxes>
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
