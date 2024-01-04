import React from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateFormatter } from "../../../../utils/DateFormatter";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";

interface Props {
  order: Order;
  navigation: StackNavigationProp<
    AdminOrderStackParamList,
    "AdminOrderListScreen",
    undefined
  >;
}

export const OrderListItem = ({ order, navigation }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AdminOrderDetailScreen", { order: order });
      }}
    >
      <View style={styles.container}>
        <Text style={styles.order}>Order #{order.id}</Text>
        <Text style={{ ...styles.info, marginTop: 10 }}>
          Fecha del pedido: {DateFormatter(order.timestamp!)}
        </Text>
        <Text style={styles.info}>
          Cliente: {order.client?.name} {order.client?.lastname}
        </Text>
        <Text style={styles.info}>Dirección: {order.address?.address}</Text>
        <Text style={styles.info}>Barrio: {order.address?.neighborhood}</Text>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  order: {
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    marginTop: 10
  },
  divider: {
    marginTop: 10,
    height: 1,
    width: "100%",
    backgroundColor: "gray"
  },
  info: {
    fontSize: 13
  }
});
