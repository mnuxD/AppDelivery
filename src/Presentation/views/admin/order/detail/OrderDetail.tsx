import React, { useEffect } from "react";
import { FlatList, Image, Text, ToastAndroid, View } from "react-native";
import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import DropDownPicker from "react-native-dropdown-picker";
import { OrderDetailItem } from "./Item";
import { DateFormatter } from "../../../../utils/DateFormatter";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";

interface Props
  extends StackScreenProps<
    AdminOrderStackParamList,
    "AdminOrderDetailScreen"
  > {}

export const AdminOrderDetailScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const {
    total,
    deliveryUsers,
    open,
    value,
    items,
    responseMessage,
    getTotal,
    getDelivery,
    setOpen,
    setValue,
    setItems,
    dispatchOrder
  } = useViewModel(order);

  useEffect(() => {
    if (total == 0.0) getTotal();
    getDelivery();
  }, []);

  useEffect(() => {
    if (responseMessage) ToastAndroid.show(responseMessage, ToastAndroid.LONG);
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.products}>
        <FlatList
          data={order.products}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => <OrderDetailItem product={item} />}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Fecha del pedido</Text>
            <Text style={styles.infoDescription}>
              {DateFormatter(order.timestamp!)}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/reloj.png")}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Cliente y Teléfono</Text>
            <Text style={styles.infoDescription}>
              {order.client?.name} {order.client?.lastname} -{" "}
              {order.client?.phone}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/user.png")}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Dirección de entrega</Text>
            <Text style={styles.infoDescription}>
              {order.address?.address} - {order.address?.neighborhood}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/location.png")}
          />
        </View>

        <Text style={styles.deliveries}>
          {order.status === "PAGADO"
            ? "REPARTIDORES DISPONIBLES"
            : `REPARTIDOR ASIGNADO: ${order.delivery?.name}`}
        </Text>
        {order.status === "PAGADO" && (
          <View style={styles.dropdown}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        )}

        <View style={styles.totalInfo}>
          <Text style={styles.total}>TOTAL: S./{total}</Text>
          {order.status === "PAGADO" && (
            <View style={styles.button}>
              <RoundedButton
                text="DESPACHAR ORDEN"
                onPress={() => {
                  dispatchOrder();
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
