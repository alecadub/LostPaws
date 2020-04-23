import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import './Header.scss';
import { selectedMode } from '../../models/types';


type headerProps = {
  selectedMode: selectedMode,
  lostSelected: () => void,
  foundSelected: () => void
}
class Header extends React.Component<headerProps> {


  render() {
    let lostButton;
    let foundButton;
    if (this.props.selectedMode === 'lost') {
      lostButton = <Button id="header-button" variant="primary" onClick={this.props.lostSelected}>Lost</Button>;
      foundButton = <Button id="header-button" variant="outline-primary" onClick={this.props.foundSelected}>Found</Button>;
    } else {
      lostButton = <Button id="header-button" variant="outline-primary" onClick={this.props.lostSelected}>Lost</Button>;
      foundButton = <Button id="header-button" variant="primary" onClick={this.props.foundSelected}>Found</Button>;
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><span id="logo-title">LostPaws</span></Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        {lostButton}
        {foundButton}
      </Navbar>
    );
  }
}

export default Header;
