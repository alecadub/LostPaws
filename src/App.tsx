import React from 'react';
import './App.scss';
import AppUtilityBoxes from './components/AppUtilityBoxes/AppUtilityBoxes';
import Header from './components/Header/Header';
import PetCardList from './components/PetCardList/PetCardList';
import { selectedMode, searchData } from './models/types';

class App extends React.Component<{}, { selectedMode: selectedMode, searchData: searchData, fetchPets: boolean }> {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedMode: 'lost',
      searchData: {
        animal: undefined,
        breed: undefined,
        imgSrc: undefined,
        coordinates: undefined
      },
      fetchPets: true
    };
    this.changeSelectedMode = this.changeSelectedMode.bind(this);
    this.lostSelected = this.lostSelected.bind(this);
    this.foundSelected = this.foundSelected.bind(this);
    this.setSearchData = this.setSearchData.bind(this);
    this.fetchPets = this.fetchPets.bind(this);
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

  public setSearchData(searchData: searchData) {
    this.setState({ ...this.state, searchData });
  }

  public fetchPets(){
    this.setState({ ...this.state, fetchPets: true });
  }

  render() {
    return (
      <div>
        <Header selectedMode={this.state.selectedMode} foundSelected={this.foundSelected} lostSelected={this.lostSelected}></Header>
        <AppUtilityBoxes selectedMode={this.state.selectedMode} setSearchData={this.setSearchData} fetchPets={this.fetchPets}></AppUtilityBoxes>
        <PetCardList selectedMode={this.state.selectedMode} filters={this.state.searchData}></PetCardList>
      </div>
    );
  }
}

export default App;
