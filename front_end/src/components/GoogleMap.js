import React, { Component, useState } from 'react'
import {GoogleMap,withGoogleMap,withScriptjs, Marker, InfoWindow, google} from 'react-google-maps'
import {Location} from '../data/Config'

const Map = () => {
    let [selectedPark, setSelectedPark] = useState(null);
    return (
        <GoogleMap 
            defaultZoom = {15}
            defaultCenter = {{lat: Location.latitude, lng: Location.longitude}}
        >
            <Marker
                position = {{lat: Location.latitude, lng: Location.longitude}}
                onClick = {() => setSelectedPark({lat: Location.latitude, lng: Location.longitude})}
                icon = {{
                    url: '/logo.png',
                    scaledSize: new window.google.maps.Size(100,40)
                }}
            />

            {selectedPark && 
                <InfoWindow
                    position = {{lat: selectedPark.lat, lng: selectedPark.lng}}
                    onCloseClick = {() => setSelectedPark(null)}
                >
                <div>ABC</div>
                </InfoWindow>
            }
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export class Google_Map extends Component {
    render() {
        return (
            <div style = {{width:'100%', height: '100%'}}>
                <WrappedMap
                    googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=AIzaSyC3ssDOfkmlRb3T6hahusMzQd16YMrVoxA&libraries=places`}
                    loadingElement = {<div style = {{height:'100%'}}/>}
                    containerElement = {<div style = {{height: '100%'}}/>}
                    mapElement = {<div style = {{height:'100%'}}/>}
                />
            </div>
        )
    }
}

export default Google_Map
