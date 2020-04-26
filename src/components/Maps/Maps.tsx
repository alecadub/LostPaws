import AlgoliaPlaces from 'algolia-places-react';
import { LeafletMouseEvent } from 'leaflet';
import React, { createRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './Maps.scss';
import { coordinates } from '../../models/types';

type mapsProps = {
    returnCoordinates?: (coordinates: coordinates) => void,
    lat?: string | null,
    lng?: string | null
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
    private marker: any;

    constructor(props: mapsProps) {
        super(props);
        this.state = { lat: 45.5017, lng: -73.5673, zoom: 12 };
        this.map = createRef();
        this.marker = createRef();
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleAlgoliaQuery = this.handleAlgoliaQuery.bind(this);
    }

    public componentDidMount() {
        setTimeout(() => {
            this.map.current.leafletElement.invalidateSize(false)
            this.marker.current.leafletElement.openPopup();
        }, 300); // Adjust timeout to tab transition
    }

    public handleMapClick(event: LeafletMouseEvent): void {
        this.setState({ ...this.state, lat: event.latlng.lat, lng: event.latlng.lng });
        this.returnCoordinatesToForm(event.latlng.lat, event.latlng.lng);
    }

    public handleAlgoliaQuery(event: algoliaQuery): void {
        this.setState({ ...this.state, lat: event.suggestion.latlng.lat, lng: event.suggestion.latlng.lng });
        this.returnCoordinatesToForm(event.suggestion.latlng.lat, event.suggestion.latlng.lng)
    }

    private returnCoordinatesToForm(lat: number, lng: number) {
        let coordinates: coordinates = {
            lat,
            lng
        }
        if (this.props.returnCoordinates) {
            this.props.returnCoordinates(coordinates);
        }
    }

    public getStaticMap(position: any) {
        return (
            <div>
                <div >
                    <Map
                        ref={this.map}
                        center={position}
                        zoom={this.state.zoom}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position} ref={this.marker}>
                            <Popup >
                                Pet found here!
                            </Popup>
                        </Marker>
                    </Map>
                </div>
                <AlgoliaPlaces
                    id="algolia"
                    placeholder='Not Implemented'
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

    public getFormMap() {
        return (
            <div>
                <div >
                    <Map
                        ref={this.map}
                        center={[this.state.lat, this.state.lng]}
                        zoom={this.state.zoom}
                        onclick={(event: LeafletMouseEvent) => this.handleMapClick(event)}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[this.state.lat, this.state.lng]} ref={this.marker}>
                            <Popup >
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

    render() {
        let map: any;
        let position: any;
        if (this.props.lat && this.props.lng) {
            position = [+this.props.lat, +this.props.lng];
            map = this.getStaticMap(position);
        } else {
            map = this.getFormMap();
        }
        return (
            <div>
                {map}
            </div>
        );
    }
}

export default Maps;
