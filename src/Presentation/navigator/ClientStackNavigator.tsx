import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { Product } from "../../Domain/entities/Product";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { Image, TouchableOpacity } from "react-native";
import { ClientShoppingBagScreen } from "../views/client/shoppingBag/ShoppingBag";
import { ClientAddressListScreen } from "../views/client/address/list/AddressList";
import { ClientAddressCreateScreen } from "../views/client/address/create/AddressCreate";
import { ClientAddressMapScreen } from "../views/client/address/map/AddressMap";
import { ClientPaymentFormScreen } from "../views/client/payment/form/PaymentForm";
export type ClientStackParamList = {
  ClientCategoryListScreen: undefined;
  ClientProductListScreen: { idCategory: string };
  ClientProductDetailScreen: { product: Product };
  ClientShoppingBagScreen: undefined;
  ClientAddressListScreen: undefined;
  ClientAddressCreateScreen:
    | { refPoint: string; latitude: number; longitude: number }
    | undefined;
  ClientAddressMapScreen:
    | { initialLatitude: number; initialLongitude: number }
    | undefined;
  ClientPaymentFormScreen: undefined;
};
const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
  return (
    <ShoppingBagState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="ClientCategoryListScreen"
          component={ClientCategoryListScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Categorías",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="ClientProductListScreen"
          component={ClientProductListScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Productos",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="ClientProductDetailScreen"
          component={ClientProductDetailScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ClientShoppingBagScreen"
          component={ClientShoppingBagScreen}
          options={{
            headerShown: true,
            title: "Mi orden"
          }}
        />
        <Stack.Screen
          name="ClientAddressListScreen"
          component={ClientAddressListScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Mis Direcciones",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientAddressCreateScreen")}
              >
                <Image
                  source={require("../../../assets/add.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="ClientAddressCreateScreen"
          component={ClientAddressCreateScreen}
          options={{
            headerShown: true,
            title: "Nueva Dirección"
          }}
        />
        <Stack.Screen
          name="ClientAddressMapScreen"
          component={ClientAddressMapScreen}
          options={{
            headerShown: true,
            title: "Ubica tu dirección en el mapa"
          }}
        />
        <Stack.Screen
          name="ClientPaymentFormScreen"
          component={ClientPaymentFormScreen}
          options={{
            headerShown: true,
            title: "Formulario de pago"
          }}
        />
      </Stack.Navigator>
    </ShoppingBagState>
  );
};

const ShoppingBagState = ({ children }: any) => {
  return <ShoppingBagProvider>{children}</ShoppingBagProvider>;
};
