import { StyleSheet } from "react-native";

const ClientPaymentFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    gap: 30
  },
  form: {
    marginTop: 10
  },
  button: {
    width: "100%",
    padding: 20
  },
  dropdown: {
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    flex: 1
  }
});

export default ClientPaymentFormStyles;
