import React, { useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Camera } from "react-native-maps";
import { Order } from "../../../../../Domain/entities/Order";
import { OrderContext } from "../../../../context/OrderContext";
import socket from "../../../../utils/SocketIO";

const ClientOrderMapViewModel = (order: Order) => {
  const [messagePermissions, setMessagePermissions] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [position, setPosition] = useState({ latitude: 0.0, longitude: 0.0 });
  const [origin, setOrigin] = useState({
    latitude: 0.0,
    longitude: 0.0
  });
  const [destination, setDestination] = useState({
    latitude: order.address?.lat!,
    longitude: order.address?.lng!
  });
  const [refPoint, setRefPoint] = useState({
    name: "",
    latitude: 0.0,
    longitude: 0.0
  });
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("________ SOCKET IO CONNECTION_________");
    });
    socket.on(`position/${order.id}`, (data: any) => {
      console.log("data", data);
      setOrigin({ latitude: data.lat, longitude: data.lng }); // esto hace que se actualice el punto de origen, es decir que se vaya modificando la ruta
      setPosition({ latitude: data.lat, longitude: data.lng }); // esto hace que se actualice la figura del repartidor
      const newCamera: Camera = {
        center: {
          latitude: data.lat,
          longitude: data.lng
        },
        heading: 0,
        pitch: 0,
        altitude: 0
      };
      mapRef.current?.animateCamera(newCamera, { duration: 2000 }); // duracion 1 para no mostrar la animacion
    });
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted) {
        startForegroundUpdate();
      }
    };
    requestPermissions();
  }, []);

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      setMessagePermissions("Permiso de ubicación denegado");
      return;
    }

    const location = await Location.getLastKnownPositionAsync(); //obtener la unbicacion que tengo una sola vez
    setOrigin({
      latitude: location?.coords.latitude!,
      longitude: location?.coords.longitude!
    });
    const newCamera: Camera = {
      center: {
        latitude: location?.coords.latitude!,
        longitude: location?.coords.longitude!
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
    responseMessage,
    position,
    mapRef,
    origin,
    destination,
    socket,
    ...refPoint
  };
};

export default ClientOrderMapViewModel;
