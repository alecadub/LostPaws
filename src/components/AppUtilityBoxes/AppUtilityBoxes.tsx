import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import './AppUtilityBoxes.scss';

type AppUtilityBoxesProps = {
    selectedMode?: string
}

type textEvent = {
    target: {
        value: string,
    }
}

class AppUtilityBoxes extends React.Component<AppUtilityBoxesProps, {value: string}> {
    constructor(props: AppUtilityBoxesProps) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(event: textEvent) {
        this.setState({ value: event.target.value });
    }


    render() {
        return (
            <div id="func-buttons">
                <Button id="add-button" variant="success"><FaPlus /></Button>
                <Button id="search-button" variant="info"><FaSearch /></Button>
                <input id="search-bar" placeholder="quick search" value={this.state.value} onChange={this.handleChange} />
            </div>
        );
    }
}

export default AppUtilityBoxes;
