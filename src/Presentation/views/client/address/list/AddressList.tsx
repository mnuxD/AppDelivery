import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import useViewModel from "./ViewModel";
import { AddressListItem } from "./Item";

export const ClientAddressListScreen = () => {
  const { address, checked, getAddress, changeRadioValue } = useViewModel();

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
    </View>
  );
};
