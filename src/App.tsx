import React from 'react';
import './App.scss';
import AppUtilityBoxes from './components/AppUtilityBoxes/AppUtilityBoxes';
import Header from './components/Header/Header';
import PetCardList from './components/PetCardList/PetCardList';
import { selectedMode, searchData } from './models/types';
import MyAd from './components/MyAd/MyAd';

class App extends React.Component<{}, { selectedMode: selectedMode, searchData: searchData, fetchPets: boolean, quickSearch: string }> {

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
      fetchPets: true,
      quickSearch: ''
    };
    this.changeSelectedMode = this.changeSelectedMode.bind(this);
    this.lostSelected = this.lostSelected.bind(this);
    this.foundSelected = this.foundSelected.bind(this);
    this.myAdSelected = this.myAdSelected.bind(this);
    this.setSearchData = this.setSearchData.bind(this);
    this.fetchPets = this.fetchPets.bind(this);
    this.setQuickSearch = this.setQuickSearch.bind(this);
  }

  public setQuickSearch(quickSearch: string) {
    this.setState({ ...this.state, quickSearch })
  }

  public changeSelectedMode(selectedMode: selectedMode): void {
    this.setState({ ...this.state, selectedMode });
  }

  public lostSelected(): void {
    this.changeSelectedMode('lost');
  }

  public foundSelected(): void {
    this.changeSelectedMode('found');
  }

  public myAdSelected(): void {
    this.changeSelectedMode('myad');
  }

  public setSearchData(searchData: searchData) {
    this.setState({ ...this.state, searchData });
  }

  public fetchPets() {
    this.setState({ ...this.state, fetchPets: true });
  }

  render() {
    let page;
    if (this.state.selectedMode === 'myad') {
      page = <MyAd></MyAd>
    } else {
      page = <AppUtilityBoxes selectedMode={this.state.selectedMode} setSearchData={this.setSearchData}
      fetchPets={this.fetchPets} setQuickSearch={this.setQuickSearch}></AppUtilityBoxes>
    }
    return (
      <div>
        <Header selectedMode={this.state.selectedMode} foundSelected={this.foundSelected} lostSelected={this.lostSelected} myAdSelected={this.myAdSelected}></Header>
        {page}
        <PetCardList selectedMode={this.state.selectedMode} filters={this.state.searchData} quickSearch={this.state.quickSearch}></PetCardList>
      </div>
    );
  }
}

export default App;
