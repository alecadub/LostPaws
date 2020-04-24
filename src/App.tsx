import React from 'react';
import './App.scss';
import AppUtilityBoxes from './components/AppUtilityBoxes/AppUtilityBoxes';
import Header from './components/Header/Header';
import PetCardList from './components/PetCardList/PetCardList';
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

  render() {
    return (
      <div>
        <Header selectedMode={this.state.selectedMode} foundSelected={this.foundSelected} lostSelected={this.lostSelected}></Header>
        <AppUtilityBoxes selectedMode={this.state.selectedMode}></AppUtilityBoxes>
        <PetCardList></PetCardList>
      </div>
    );
  }
}

export default App;
