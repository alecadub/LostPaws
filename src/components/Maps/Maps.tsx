import AlgoliaPlaces from 'algolia-places-react';
import { LeafletMouseEvent } from 'leaflet';
import React, { createRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './Maps.scss';

type mapsProps = {
    returnCoordinates?: () => void
}

type algoliaQuery = {
    suggestion: {
        latlng: {
            lat: number,
            lng: number
        }
    }
}

class Maps extends React.Component<mapsProps, { lat: number, lng: number, zoom: number }> {

    private map: any;

    constructor(props: mapsProps) {
        super(props);
        this.state = { lat: 45.5017, lng: -73.5673, zoom: 12 };
        this.map = createRef();
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    public componentDidMount() {
        setTimeout(() => {
            this.map.current.leafletElement.invalidateSize(false)
        }, 300); // Adjust timeout to tab transition
    }

    public handleMapClick(event: LeafletMouseEvent): void {
        this.setState({ ...this.state, lat: event.latlng.lat, lng: event.latlng.lng });
    }

    public handleAlgoliaQuery(event: algoliaQuery): void {
        this.setState({ ...this.state, lat: event.suggestion.latlng.lat, lng: event.suggestion.latlng.lng });
    }

    render() {

        const position: any = [this.state.lat, this.state.lng];
        return (
            <div>
                <div >
                    <Map
                        ref={this.map}
                        center={position}
                        zoom={this.state.zoom}
                        onclick={(event: LeafletMouseEvent) => this.handleMapClick(event)}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Pet found here!
                        </Popup>
                        </Marker>
                    </Map>
                </div>
                <AlgoliaPlaces
                    id="algolia"
                    placeholder='Write here to help you navigate the map ! (optional)'
                    options={{
                        appId: 'plMBNOJMIOCV',
                        apiKey: '97a259e33ac0a45b696f7f181fd0428e',
                        countries: ['ca'],
                    }}
                    onChange={(event: algoliaQuery) => this.handleAlgoliaQuery(event)}
                />
            </div>
        );
    }
}

export default Maps;
