import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import './Header.scss';

class Header extends React.Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><span id="logo-title">LostPaws</span></Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Button id="header-button" variant="outline-primary">Lost</Button>
        <Button id="header-button" variant="outline-primary">Found</Button>
      </Navbar>
    );
  }
}

export default Header;
