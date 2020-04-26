import React from 'react';
import { Button } from 'react-bootstrap';
import PetCard from '../PetCardList/PetCard/PetCard';
import './MyAd.scss';
import Maps from '../Maps/Maps';

type myAdProps = {
}

class MyAd extends React.Component<myAdProps, {}> {

    render() {
        let map: any;
        if (localStorage.getItem('lat')) {
            map = <Maps lat={localStorage.getItem('lat')} lng={localStorage.getItem('lng')}></Maps>
        }

        return (
            <div id="box">
                <div className="text">
                    Welcome to your pet page!
                </div>
                <PetCard key={999} imgSrc={localStorage.getItem('imgSrc')}
                    name={localStorage.getItem('petName')} type="My Pet" email={localStorage.getItem('email')}
                    animal={localStorage.getItem('animal')} breed={localStorage.getItem('breed')}
                >
                </PetCard>
                <div className="buttons">
                    <Button id="header-button">Edit</Button>
                    <Button id="header-button">Delete</Button>
                </div>
                {map}
                <div className="text">
                    Using AI and pet recognition technolgy, we have found the closest matches to your pet among the animals people have found and seen.
                    We also suggest looking yourself on the "Lost" tab and filtering by sightings. Refresh to get the newest data.
                </div>
            </div>
        );
    }
}

export default MyAd;