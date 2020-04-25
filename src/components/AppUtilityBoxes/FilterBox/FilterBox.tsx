import React from 'react';
import './FilterBox.scss';
import { Toast } from 'react-bootstrap';

type filterBoxProps = {
    name?: string,
    type: string,
    setSearchTypeToNull: (filter: string) => void
}

class FilterBox extends React.Component<filterBoxProps> {

    render() {
        let name: any
        if (this.props.name) {
            name = <span>= {this.props.name}</span>
        }

        return (
            <Toast id="filter-box" onClose={() => this.props.setSearchTypeToNull(this.props.type)}>
                <Toast.Header>
                    <small>Filter ON: {this.props.type} {name}</small>
                </Toast.Header>
            </Toast>
        );
    }
}

export default FilterBox;