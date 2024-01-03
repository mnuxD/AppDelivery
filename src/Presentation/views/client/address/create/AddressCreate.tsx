import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./Styles";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressCreateScreen"> {}

export const ClientAddressCreateScreen = ({ navigation, route }: Props) => {
  const {
    address,
    neighborhood,
    refPoint,
    responseMessage,
    loading,
    onChange,
    onChangeRefPoint,
    createAddress
  } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);

  useEffect(() => {
    if (route.params)
      onChangeRefPoint(
        route.params.refPoint,
        route.params.latitude,
        route.params.longitude
      );
  }, [route.params]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("../../../../../../assets/map.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.form}>
        <CustomTextInput
          placeholder="Dirección"
          image={require("../../../../../../assets/location_home.png")}
          value={address}
          onChangeText={onChange}
          property="address"
        />
        <CustomTextInput
          placeholder="Barrio"
          image={require("../../../../../../assets/neighborhood.png")}
          value={neighborhood}
          onChangeText={onChange}
          property="neighborhood"
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ClientAddressMapScreen", {
              initialLatitude: route.params?.latitude!,
              initialLongitude: route.params?.longitude!
            })
          }
        >
          <CustomTextInput
            placeholder="Punto de Referencia"
            image={require("../../../../../../assets/ref_point.png")}
            value={refPoint}
            onChangeText={onChange}
            property="refPoint"
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text="CREAR DIRECCIÓN"
          onPress={() => {
            createAddress();
          }}
        />
      </View>

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
