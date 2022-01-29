import React from "react";
import { styled } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { showDataOnMap } from "./util";

const Map = ({ country, countries, casesType, center, zoom }) => {
  //console.log(country);
  console.log(casesType);
  console.log(countries);
  function SetView({ coords }) {
    const map = useMap();
    // console.log(map);
    map.setView(coords, 3);

    return null;
  }

  return (
    <MapOuter className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} draggable={true} animate={true}>
          <Popup>{country}</Popup>
        </Marker>
        <SetView coords={center} />
        {/* Loop through countries and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </MapOuter>
  );
};

export default Map;

const MapOuter = styled("div")`
  height: 500px;
  background-color: white;
  padding: 1rem;
  margin-top: 16px;
  border-radius: 20px;
  box-shadow: 0 0 9px -4px rgba(0, 0, 0, 0.5);

  @media (max-width: 990px) {
    margin-bottom: 16px;
  }

  .leaflet-container {
    height: 100%;
  }

  .info-flag {
    width: 100%;
    height: 80px;
    border-radius: 8px;
  }

  .info-name {
    font-size: 20px;
    font-weight: bold;
    color: #555;
  }

  .info-confirmed,
  .info-recovered,
  .info-deaths {
    font-size: 16px;
    margin-top: 5px;
  }
`;
