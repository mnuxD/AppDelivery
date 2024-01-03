import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Camera } from "react-native-maps";

const ClientAddressMapViewModel = (
  initialLatitude: number | undefined,
  initialLongitude: number | undefined
) => {
  const [messagePermissions, setMessagePermissions] = useState("");
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const [refPoint, setRefPoint] = useState({
    name: "",
    latitude: 0.0,
    longitude: 0.0
  });
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted) {
        startForegroundUpdate();
      }
    };
    requestPermissions();
  }, []);

  const onRegionChangeComplete = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const place = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      let city;
      let street;
      let streetNumber;
      place.find((p) => {
        city = p.city;
        street = p.street;
        streetNumber = p.streetNumber;
        setRefPoint({
          name: `${street}, ${streetNumber}, ${city}`,
          latitude,
          longitude
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      setMessagePermissions("Permiso de ubicación denegado");
      return;
    }
    const location = await Location.getLastKnownPositionAsync(); //obtener la unbicacion que tengo una sola vez
    setPosition(location?.coords);
    const newCamera: Camera = {
      center: {
        latitude: initialLatitude || location?.coords.latitude!,
        longitude: initialLongitude || location?.coords.longitude!
      },
      zoom: 18,
      heading: 0,
      pitch: 0,
      altitude: 0
    };
    mapRef.current?.animateCamera(newCamera, { duration: 1 }); // duracion 1 para no mostrar la animacion
  };

  return {
    messagePermissions,
    position,
    mapRef,
    ...refPoint,
    onRegionChangeComplete
  };
};

export default ClientAddressMapViewModel;
