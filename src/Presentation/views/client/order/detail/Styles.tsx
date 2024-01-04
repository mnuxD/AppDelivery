import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const ClientOrderDetailStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  products: {
    width: "100%",
    height: "50%"
  },
  info: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center"
  },
  infoText: {
    flex: 1
  },
  infoTitle: {
    color: "black"
  },
  infoDescription: {
    fontSize: 13,
    color: "gray"
  },
  infoImage: {
    width: 25,
    height: 25
  },
  deliveries: {
    fontWeight: "bold",
    marginTop: 15,
    color: MyColors.primary
  },
  totalInfo: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  total: {
    fontWeight: "bold",
    fontSize: 17
  },
  button: {
    width: "50%"
  },
  dropdown: {
    marginTop: 15
  }
});

export default ClientOrderDetailStyles;
