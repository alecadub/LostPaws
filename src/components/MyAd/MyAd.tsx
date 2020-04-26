import React from 'react';
import { Button } from 'react-bootstrap';
import PetCard from '../PetCardList/PetCard/PetCard';
import './MyAd.scss';

type myAdProps = {
}

class MyAd extends React.Component<myAdProps, {}> {

    render() {
        console.log(localStorage.getItem('imgSrc'));
        return (
            <div id="box">
                <h2 className="text">
                    Welcome to your pet page!
                </h2>
                <PetCard key={999} imgSrc={localStorage.getItem('imgSrc')}
                    name={localStorage.getItem('petName')} type="My Pet" email={localStorage.getItem('email')}
                    animal={localStorage.getItem('animal')} breed={localStorage.getItem('breed')}
                    lat={localStorage.getItem('lat')} lng={localStorage.getItem('lng')}
                >
                </PetCard>
                <div className="buttons">
                    <Button id="header-button">Edit</Button>
                    <Button id="header-button">Delete</Button>
                </div>
                <h3 className="text">
                    Using AI and pet recognition technolgy, we have found the closest matches to your pet.
                </h3>
            </div>
        );
    }
}

export default MyAd;