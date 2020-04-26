import React from 'react';
import { Button } from 'react-bootstrap';
import PetCard from '../PetCardList/PetCard/PetCard';
import './MyAd.scss';

type myAdProps = {
}

class MyAd extends React.Component<myAdProps, {}> {

    render() {
        return (
            <div id="box">
                <div className="text">
                    Welcome to your pet page!
                </div>
                <PetCard key={999} type="myad"></PetCard>
                <div className="buttons">
                    <Button id="header-button">Edit</Button>
                    <Button id="header-button">Delete</Button>
                </div>
                <div className="text">
                    Using AI and pet recognition technolgy, we have found the closest matches to your pet among the animals people have found and seen.
                    We also suggest looking yourself on the "Lost" tab and filtering by sightings. Refresh to get the newest data.
                </div>
            </div>
        );
    }
}

export default MyAd;