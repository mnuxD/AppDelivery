import React, { useEffect } from "react";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import useViewModel from "./ViewModel";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { OrderListItem } from "./Item";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator";

interface Props {
  status: string;
}
const OrderListRoute = ({ status }: Props) => {
  const {
    user,
    ordersPayed,
    ordersDelivery,
    ordersDispatched,
    ordersOnTheWay,
    getOrders
  } = useViewModel();
  const navigation =
    useNavigation<
      StackNavigationProp<ClientOrderStackParamList, "ClientOrderListScreen">
    >();

  useEffect(() => {
    getOrders(user?.id!, status);
  }, [user]);

  return (
    <View>
      <FlatList
        data={
          status === "PAGADO"
            ? ordersPayed
            : status === "DESPACHADO"
            ? ordersDispatched
            : status === "EN CAMINO"
            ? ordersOnTheWay
            : status === "ENTREGADO"
            ? ordersDelivery
            : []
        }
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <OrderListItem order={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "first":
      return <OrderListRoute status="PAGADO" />;
    case "second":
      return <OrderListRoute status="DESPACHADO" />;
    case "third":
      return <OrderListRoute status="EN CAMINO" />;
    case "fourth":
      return <OrderListRoute status="ENTREGADO" />;
    default:
      return <OrderListRoute status="DESPACHADO" />;
  }
};

export const ClientOrderListScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "PAGADO" },
    { key: "second", title: "DESPACHADO" },
    { key: "third", title: "EN CAMINO" },
    { key: "fourth", title: "ENTREGADO" }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#C2C2C2" }}
          activeColor="black"
          inactiveColor="gray"
          scrollEnabled={true}
          style={{
            backgroundColor: "white",
            height: 70,
            justifyContent: "flex-end"
          }}
        />
      )}
    />
  );
};
