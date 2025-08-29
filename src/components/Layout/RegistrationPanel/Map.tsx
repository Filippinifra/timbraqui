import { Icon } from "@/components/Dumb/Icon";
import { usePosition } from "@/hooks/usePosition";
import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { CustomMarker } from "./Marker";

export const milanLatLng = { lat: 45.46427, lng: 9.18951 };

const Map: FC<{
  value?: { lat: number; lng: number };
  onChange: ({ lat, lng }: { lat: number; lng: number }) => void;
}> = ({ onChange, value }) => {
  const pos = usePosition();
  const [position, setPosition] = useState(
    value?.lat && value?.lng
      ? { lat: value.lat, lng: value.lng }
      : pos?.lat && pos?.lng
      ? { lat: pos.lat, lng: pos.lng }
      : { lat: 45.46427, lng: 9.18951 }
  );

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e: any) {
        onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    useEffect(() => {
      if (
        pos &&
        JSON.stringify(value) ===
          JSON.stringify({ lat: milanLatLng.lat, lng: milanLatLng.lng })
      ) {
        onChange({ lat: pos.lat, lng: pos.lng });
      }
    }, [pos]);

    useEffect(() => {
      if (
        (value?.lat !== position.lat || value?.lng !== position.lng) &&
        value
      ) {
        setPosition({ lat: value.lat, lng: value.lng });
        map.setView({ lat: value.lat, lng: value.lng });
      }
    }, [value]);

    return (
      position && (
        <CustomMarker position={{ lat: position.lat, lng: position.lng }} />
      )
    );
  };

  return position ? (
    <div style={{ position: "relative" }}>
      {pos && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10000000000,
            cursor: "pointer",
          }}
          onClick={() => {
            onChange({ lat: pos.lat, lng: pos.lng });
          }}
        >
          <Icon name="Locate" />
        </div>
      )}
      <MapContainer
        center={
          value?.lat && value?.lng
            ? [value.lat, value.lng]
            : [milanLatLng.lat, milanLatLng.lng]
        }
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 300, zIndex: 1 }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  ) : null;
};

export default Map;
