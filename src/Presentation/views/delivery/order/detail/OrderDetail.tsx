import React, { useEffect } from "react";
import { FlatList, Image, Text, ToastAndroid, View } from "react-native";
import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";
import { OrderDetailItem } from "./Item";
import { DateFormatter } from "../../../../utils/DateFormatter";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";

interface Props
  extends StackScreenProps<
    DeliveryOrderStackParamList,
    "DeliveryOrderDetailScreen"
  > {}

export const DeliveryOrderDetailScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const { total, responseMessage, getTotal, updateToOnTheWayOrder } =
    useViewModel(order);

  useEffect(() => {
    if (total == 0.0) getTotal();
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

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Repartidor Asignado</Text>
            <Text style={styles.infoDescription}>
              {order.delivery?.name} {order.delivery?.lastname}
            </Text>
          </View>
          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/my_user.png")}
          />
        </View>

        <View style={styles.totalInfo}>
          <Text style={styles.total}>TOTAL: S./{total}</Text>
          {order.status === "DESPACHADO" && (
            <View style={styles.button}>
              <RoundedButton
                text="INICIAR ENTREGA"
                onPress={() => {
                  updateToOnTheWayOrder();
                }}
              />
            </View>
          )}
          {order.status === "EN CAMINO" && (
            <View style={styles.button}>
              <RoundedButton
                text="IR A LA RUTA"
                onPress={() => {
                  navigation.navigate("DeliveryOrderMapScreen", {
                    order: order
                  });
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
