import React, { useEffect } from "react";
import { FlatList, Text, ToastAndroid, View } from "react-native";
import useViewModel from "./ViewModel";
import { AddressListItem } from "./Item";
import { RoundedButton } from "../../../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressListScreen"> {}

export const ClientAddressListScreen = ({ navigation, route }: Props) => {
  const {
    address,
    checked,
    responseMessage,
    getAddress,
    changeRadioValue,
    createOrder
  } = useViewModel();

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={address}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AddressListItem
            address={item}
            checked={checked}
            changeRadioValue={() => changeRadioValue(item)}
          />
        )}
      />
      <View style={{ width: "100%", padding: 30 }}>
        {/* <RoundedButton text="CONTINUAR" onPress={createOrder} /> */}
        <RoundedButton
          text="CONTINUAR"
          onPress={() => navigation.navigate("ClientPaymentFormScreen")}
        />
      </View>
    </View>
  );
};
