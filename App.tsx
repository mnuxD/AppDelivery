import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./src/Presentation/navigator/MainStackNavigator";
import { useEffect } from "react";

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
