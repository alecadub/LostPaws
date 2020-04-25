import './MyAd.scss';
import { selectedMode } from '../../models/types';
import React from 'react';

type myAdProps = {
}

class MyAd extends React.Component<myAdProps, {  }> {

    constructor(props: myAdProps) {
        super(props);        
    }

    render() {
        let filterBoxes;
        return (
            <div id="your-pet">
                <p>THIS IS MY AD</p>
            </div>
        );
    }
}

export default MyAd;