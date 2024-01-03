import React, { useEffect } from "react";
import { Image, Text, ToastAndroid, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./Styles";
import stylesMap from "./StylesMap";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressMapScreen"> {}

export const ClientAddressMapScreen = ({ navigation, route }: Props) => {
  const {
    messagePermissions,
    position,
    mapRef,
    name,
    latitude,
    longitude,
    onRegionChangeComplete
  } = useViewModel(
    route.params?.initialLatitude!,
    route.params?.initialLongitude!
  );

  useEffect(() => {
    if (messagePermissions)
      ToastAndroid.show(messagePermissions, ToastAndroid.LONG);
  }, [messagePermissions]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={stylesMap}
        style={{ height: "100%", width: "100%" }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={(region) =>
          onRegionChangeComplete(region.latitude, region.longitude)
        }
      />
      <Image
        source={require("../../../../../../assets/location_home.png")}
        style={styles.imageLocation}
      />
      <View style={styles.refPoint}>
        <Text style={styles.refPointText}>{name}</Text>
      </View>
      <View style={styles.buttonRefPoint}>
        <RoundedButton
          text="SELECCIONAR PUNTO"
          onPress={() => {
            navigation.navigate({
              name: "ClientAddressCreateScreen",
              merge: true,
              params: { refPoint: name, latitude, longitude }
            });
          }}
        />
      </View>
    </View>
  );
};
