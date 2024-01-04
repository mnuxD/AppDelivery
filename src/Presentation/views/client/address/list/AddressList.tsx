import React, { useEffect } from "react";
import { FlatList, Text, ToastAndroid, View } from "react-native";
import useViewModel from "./ViewModel";
import { AddressListItem } from "./Item";
import { RoundedButton } from "../../../../components/RoundedButton";

export const ClientAddressListScreen = () => {
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
        <RoundedButton text="CONTINUAR" onPress={createOrder} />
      </View>
    </View>
  );
};
