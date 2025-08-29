import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Marker } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children?: React.ReactNode;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  children,
}) => {
  const customIcon = L.icon({
    iconUrl:
      "https://images.ctfassets.net/3prze68gbwl1/assetglossary-17su9wok1ui0z7w/c4c4bdcdf0d0f86447d3efc450d1d081/map-marker.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};
