import React from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useMediaQuery } from '@mui/material';
import L from 'leaflet';

function GetIcon(_iconSize){
    return L.icon({
        iconUrl:require("../static/Icons/satellite.png"),
        iconSize:_iconSize
    })
}
function MyMap({mapCenter}) {
    const matches = useMediaQuery('(max-width:450px)');
return(
    <div>
        <MapContainer
        style={{width:matches?350:1100, height:matches?350:500,}}
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={5}>
            <TileLayer 
            attribution='&amp;copy <a> href="http://osm.org/copyright">OpenStretMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[mapCenter.lat, mapCenter.lng]} icon={GetIcon(50)}>
                <Popup>The ISS is currently here!</Popup>
            </Marker>
      
        </MapContainer>
    </div>
)
};

export default MyMap