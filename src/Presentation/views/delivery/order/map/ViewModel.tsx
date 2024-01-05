import React, { useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Camera } from "react-native-maps";
import { Order } from "../../../../../Domain/entities/Order";
import { OrderContext } from "../../../../context/OrderContext";
import socket from "../../../../utils/SocketIO";

const DeliveryOrderMapViewModel = (order: Order) => {
  const [messagePermissions, setMessagePermissions] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
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
  let positionSuscription: Location.LocationSubscription;

  const { updateToDelivered } = useContext(OrderContext);

  const updateToDeliveredOrder = async () => {
    const result = await updateToDelivered(order);
    setResponseMessage(result.message);
  };

  useEffect(() => {
    //Llamado de socket
    socket.connect();
    socket.on("connect", () => {
      console.log("---------- SOCKET IO CONNECTION ------------------");
    });

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

    positionSuscription?.remove(); //Eliminar los listeners para no sobrecargar la app
    positionSuscription = await Location.watchPositionAsync(
      {
        // accuracy: Location.Accuracy.BestForNavigation //Actualiza a cada rato
        accuracy: Location.Accuracy.Balanced //Actualiza no tantas veces
      },
      (location) => {
        console.log("POSITION", location?.coords);
        socket.emit("position", {
          id_order: order.id!,
          lat: location?.coords.latitude,
          lng: location?.coords.longitude
        });
        setOrigin(location?.coords); // ir actualizando la posicion de origen, osea del repartidor, pero esto hace que se actualize la ruta
        setPosition(location?.coords); // ir actualizando la posicion del repartidor, es decir de su figura en el mapa
        const newCamera: Camera = {
          center: {
            latitude: location?.coords.latitude!,
            longitude: location?.coords.longitude!
          },
          heading: 0,
          pitch: 0,
          altitude: 0
        };
        mapRef.current?.animateCamera(newCamera, { duration: 2000 });
      }
    );
  };

  const stopForegroundUpdate = () => {
    positionSuscription?.remove();
    setPosition(undefined);
  };

  return {
    messagePermissions,
    responseMessage,
    position,
    mapRef,
    origin,
    destination,
    socket,
    ...refPoint,
    onRegionChangeComplete,
    updateToDeliveredOrder,
    stopForegroundUpdate
  };
};

export default DeliveryOrderMapViewModel;
