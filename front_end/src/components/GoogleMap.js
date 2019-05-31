import React, { Component, useState } from 'react'
import {GoogleMap,withGoogleMap,withScriptjs, Marker, InfoWindow, google} from 'react-google-maps'

export default function Google_Map(props) {
    const Map = () => {
        let [selectedPark, setSelectedPark] = useState(null);
        return (
            <GoogleMap 
                defaultZoom = {15}
                defaultCenter = {{lat: props.lat, lng: props.lng}}
            >
                <Marker
                    position = {{lat: props.lat, lng: props.lng}}
                    icon = {{
                        url: '/logo.png',
                        scaledSize: new window.google.maps.Size(100,40)
                    }}
                    onClick = {() => {setSelectedPark(1)}}
                    onCloseClick = {() => setSelectedPark(null)}
                />
                    {selectedPark && <InfoWindow
                        position = {{lat: props.lat, lng: props.lng}}
                        onCloseClick = {() => setSelectedPark(null)}
                    >
                    <div style = {{fontSize:'0.8rem', fontWeight:'bold'}}>{props.location}</div>
                    </InfoWindow>
                }
            </GoogleMap>
        )
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

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
