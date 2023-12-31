import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { Product } from "../../Domain/entities/Product";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { Image, TouchableOpacity } from "react-native";
import { ClientShoppingBagScreen } from "../views/client/shoppingBag/ShoppingBag";
export type ClientStackParamList = {
  ClientCategoryListScreen: undefined;
  ClientProductListScreen: { idCategory: string };
  ClientProductDetailScreen: { product: Product };
  ClientShoppingBagScreen: undefined;
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
      </Stack.Navigator>
    </ShoppingBagState>
  );
};

const ShoppingBagState = ({ children }: any) => {
  return <ShoppingBagProvider>{children}</ShoppingBagProvider>;
};
