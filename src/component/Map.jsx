// import styles from "./Map.module.css";import React from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { useCities } from "../contexts/CitiesContext";
import { useState, useEffect } from "react";
import { map } from "leaflet";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [searchParams] = useSearchParams();

  let mapLat = searchParams.get("lat");
  let mapLng = searchParams.get("lng");
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div
      style={{ height: "93.5vh", width: "100%" }}
      className="text-center rounded-md"
    >
      {!geolocationPosition && (
        <Button
          onClick={getPosition}
          className="absolute bottom-[4rem] left-1/2 z-[1000]  -translate-x-1/2 bg-[var(--color-brand--2)] px-4 py-2 text-[1.4rem] font-bold text-[var(--color-dark--1)] shadow-[0_0.4rem_1.2rem_rgba(36,42,46,0.15)]"
        >
          {isLoadingPosition ? "loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={6} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}$lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
