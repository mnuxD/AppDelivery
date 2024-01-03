import { StyleSheet } from "react-native";

const ClientAddressMapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  imageLocation: {
    position: "absolute",
    width: 65,
    height: 65
  },
  refPoint: {
    position: "absolute",
    backgroundColor: "#D4D4D4",
    width: "70%",
    paddingVertical: 4,
    paddingHorizontal: 10,
    top: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  refPointText: {
    textAlign: "center"
  },
  buttonRefPoint: {
    position: "absolute",
    bottom: 40,
    width: "70%"
  }
});

export default ClientAddressMapStyles;
