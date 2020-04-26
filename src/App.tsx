import React from 'react';
import './App.scss';
import AppUtilityBoxes from './components/AppUtilityBoxes/AppUtilityBoxes';
import Header from './components/Header/Header';
import PetCardList from './components/PetCardList/PetCardList';
import { selectedMode, searchData } from './models/types';
import MyAd from './components/MyAd/MyAd';
import EmailModal from './components/Modals/EmailModal/EmailModal';

class App extends React.Component<{}, {
  selectedMode: selectedMode, searchData: searchData,
  fetchPets: boolean, quickSearch: string, openEmailModal: boolean
}> {

  private id: any = null

  constructor(props: any) {
    super(props);
    this.state = {
      selectedMode: 'lost',
      searchData: {
        animal: undefined,
        breed: undefined,
        imgSrc: undefined,
        coordinates: undefined,
      },
      fetchPets: true,
      quickSearch: '',
      openEmailModal: false
    };
    this.changeSelectedMode = this.changeSelectedMode.bind(this);
    this.lostSelected = this.lostSelected.bind(this);
    this.foundSelected = this.foundSelected.bind(this);
    this.myAdSelected = this.myAdSelected.bind(this);
    this.setSearchData = this.setSearchData.bind(this);
    this.fetchPets = this.fetchPets.bind(this);
    this.setQuickSearch = this.setQuickSearch.bind(this);
    this.dontFetchPets = this.dontFetchPets.bind(this);
    this.closeEmailModal = this.closeEmailModal.bind(this);
  }

  public componentDidMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    if (params.get('id')) {
      this.id = params.get('id');
      this.setState({ ...this.state, openEmailModal: true });
    }
  }

  public closeEmailModal() {
    this.setState({ ...this.state, openEmailModal: false });
  }

  public setQuickSearch(quickSearch: string) {
    this.setState({ ...this.state, quickSearch, fetchPets: true })
  }

  public changeSelectedMode(selectedMode: selectedMode): void {
    this.setState({ ...this.state, selectedMode, fetchPets: true });
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
    this.setState({ ...this.state, searchData, fetchPets: true });
  }

  public fetchPets() {
    this.setState({ ...this.state, fetchPets: true });
  }

  public dontFetchPets() {
    this.setState({ ...this.state, fetchPets: false });
  }

  render() {
    let page;
    if (this.state.selectedMode === 'myad') {
      page = <MyAd></MyAd>
    } else {
      page = <AppUtilityBoxes searchDataFromParent={this.state.searchData} selectedMode={this.state.selectedMode}
        myAdSelected={this.myAdSelected} setSearchData={this.setSearchData}
        fetchPets={this.fetchPets} setQuickSearch={this.setQuickSearch}></AppUtilityBoxes>
    }
    return (
      <div>
        <EmailModal isSet={this.state.openEmailModal} closeModal={this.closeEmailModal} id={this.id}></EmailModal>
        <Header selectedMode={this.state.selectedMode} foundSelected={this.foundSelected} lostSelected={this.lostSelected} myAdSelected={this.myAdSelected}></Header>
        {page}
        <PetCardList selectedMode={this.state.selectedMode} filters={this.state.searchData}
          quickSearch={this.state.quickSearch} fetchPets={this.state.fetchPets} dontFetchPets={this.dontFetchPets}></PetCardList>
      </div>
    );
  }
}

export default App;
