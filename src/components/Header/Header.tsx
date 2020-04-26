import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import './Header.scss';
import { selectedMode } from '../../models/types';


type headerProps = {
  selectedMode: selectedMode,
  lostSelected: () => void,
  foundSelected: () => void,
  myAdSelected: () => void
}
class Header extends React.Component<headerProps> {


  render() {
    let lostButton: any;
    let foundButton: any;
    let myAdButton: any;

    if (localStorage.getItem('myAd') === 'true') {
      if (this.props.selectedMode === 'myad') {
        myAdButton = <Button id="header-button" variant="primary" onClick={this.props.myAdSelected}>MyAd</Button>;
        lostButton = <Button id="header-button" variant="outline-primary" onClick={this.props.lostSelected}>Lost</Button>;
        foundButton = <Button id="header-button" variant="outline-primary" onClick={this.props.foundSelected}>Found</Button>;
      } else {
        myAdButton = <Button id="header-button" variant="outline-primary" onClick={this.props.myAdSelected}>MyAd</Button>;
      }
    }

    if (this.props.selectedMode === 'lost') {
      lostButton = <Button id="header-button" variant="primary" onClick={this.props.lostSelected}>Lost</Button>;
      foundButton = <Button id="header-button" variant="outline-primary" onClick={this.props.foundSelected}>Found</Button>;
    } else if (this.props.selectedMode === 'found') {
      lostButton = <Button id="header-button" variant="outline-primary" onClick={this.props.lostSelected}>Lost</Button>;
      foundButton = <Button id="header-button" variant="primary" onClick={this.props.foundSelected}>Found</Button>;
    }

    return (
      <Navbar bg="secondary" variant="dark">
        <div className="box">
          <div className="iconbox">
            <img
              id="logo"
              alt=""
              src="https://i.ibb.co/3d0gFCd/Logo.png"
              width="30"
              height="30"
            />
            <Navbar.Brand><span id="logo-title">Lost Paws</span></Navbar.Brand>
          </div>
          <div className="buttonbox">
            {lostButton}
            {foundButton}
            {myAdButton}
          </div>
        </div>
      </Navbar>
    );
  }
}

export default Header;
