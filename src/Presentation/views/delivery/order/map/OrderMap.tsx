import React, { useEffect } from "react";
import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "./Styles";
import stylesMap from "./StylesMap";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";
import { GOOGLE_MAPS_API_KEY } from "@env";

interface Props
  extends StackScreenProps<
    DeliveryOrderStackParamList,
    "DeliveryOrderMapScreen"
  > {}

export const DeliveryOrderMapScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;

  const {
    messagePermissions,
    responseMessage,
    position,
    origin,
    destination,
    socket,
    mapRef,
    updateToDeliveredOrder,
    stopForegroundUpdate
  } = useViewModel(order);

  useEffect(() => {
    if (messagePermissions)
      ToastAndroid.show(messagePermissions, ToastAndroid.LONG);
  }, [messagePermissions]);

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);

  useEffect(() => {
    const unsuscribe = navigation.addListener("beforeRemove", () => {
      console.log("EVENTO: Remove");
      stopForegroundUpdate();
      socket.disconnect();
    });

    return unsuscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={stylesMap}
        style={{ height: "64%", width: "100%", position: "absolute", top: 0 }}
        provider={PROVIDER_GOOGLE}
        zoomControlEnabled={true}
      >
        {position && (
          <Marker coordinate={position}>
            <Image
              style={styles.markerImage}
              source={require("../../../../../../assets/delivery.png")}
            />
          </Marker>
        )}
        {order.address && (
          <Marker
            coordinate={{
              latitude: order.address.lat,
              longitude: order.address.lng
            }}
          >
            <Image
              style={styles.markerImage}
              source={require("../../../../../../assets/home.png")}
            />
          </Marker>
        )}
        {origin.latitude !== 0.0 && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={10}
            strokeColor="orange"
          />
        )}
      </MapView>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Barrio:</Text>
            <Text style={styles.infoDescription}>
              {order.address?.neighborhood}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/location.png")}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Dirección:</Text>
            <Text style={styles.infoDescription}>{order.address?.address}</Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/location_home.png")}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.infoClient}>
          <Image
            style={styles.imageClient}
            source={{ uri: order.client?.image }}
          />
          <Text style={styles.nameClient}>
            {order.client?.name} {order.client?.lastname}
          </Text>
          <Image
            style={styles.imagePhone}
            source={require("../../../../../../assets/phone.png")}
          />
        </View>

        <View style={styles.buttonRefPoint}>
          <RoundedButton
            text="ENTREGAR PEDIDO"
            onPress={() => {
              updateToDeliveredOrder();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.pop()}
      >
        <Image
          style={styles.back}
          source={require("../../../../../../assets/back.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
