import { StyleSheet } from "react-native";

const ClientProductDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  productImage: {
    width: "100%",
    height: "45%"
  },
  productDetail: {
    position: "absolute",
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  productInfo: {
    padding: 30,
    flex: 1
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginTop: 15
  },
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "bold"
  },
  content: {
    fontSize: 13,
    marginTop: 5
  },
  productActions: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    height: 70,
    paddingHorizontal: 20
  },
  actionLess: {
    backgroundColor: "#3A3A3A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  actionText: {
    color: "white",
    fontSize: 15
  },
  quantity: {
    backgroundColor: "#3A3A3A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center"
  },
  actionAdd: {
    backgroundColor: "#3A3A3A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  buttonAdd: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center"
  },
  back: {
    position: "absolute",
    top: 40,
    left: 10
  },
  backImage: {
    height: 40,
    width: 40
  }
});

export default ClientProductDetailStyles;
