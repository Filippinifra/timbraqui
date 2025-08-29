import { useEffect, useState } from "react";

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false, userSettings = {}) => {
  const settings = {
    ...defaultSettings,
    ...userSettings,
  };

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [, setError] = useState<string>("");

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError("No navigator");
      return;
    }

    if (watch) {
      const watcher = navigator.geolocation.watchPosition(
        ({ coords }) =>
          setPosition({
            lat: coords.latitude,
            lng: coords.longitude,
          }),
        () => {
          setError("Watch position error");
        },
        settings
      );
      return () => navigator.geolocation.clearWatch(watcher);
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      () => setError("Current position error")
    );
  }, [settings.enableHighAccuracy, settings.timeout, settings.maximumAge]);

  return position;
};
