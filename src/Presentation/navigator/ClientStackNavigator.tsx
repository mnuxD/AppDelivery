import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
export type ClientStackParamList = {
  ClientCategoryListScreen: undefined;
  ClientProductListScreen: { idCategory: string };
};
const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="ClientCategoryListScreen"
        component={ClientCategoryListScreen}
        options={{
          headerShown: true,
          title: "Categorías"
        }}
      />
      <Stack.Screen
        name="ClientProductListScreen"
        component={ClientProductListScreen}
        options={{
          headerShown: true,
          title: "Productos"
        }}
      />
    </Stack.Navigator>
  );
};
