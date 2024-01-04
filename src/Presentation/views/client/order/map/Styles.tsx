import { StyleSheet } from "react-native";

const ClientOrderMapStyles = StyleSheet.create({
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
    width: "100%",
    marginTop: 15
  },
  info: {
    backgroundColor: "white",
    width: "100%",
    height: "37%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 30,
    alignItems: "center"
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
  divider: {
    height: 1,
    backgroundColor: "#E2E2E2",
    width: "100%",
    marginTop: 15
  },
  infoClient: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15
  },
  imageClient: {
    width: 60,
    height: 60,
    borderRadius: 15
  },
  nameClient: {
    fontWeight: "bold",
    fontSize: 17,
    flex: 1,
    marginLeft: 10
  },
  imagePhone: {
    width: 35,
    height: 35,
    borderRadius: 15
  },
  markerImage: {
    width: 50,
    height: 50
  },
  backContainer: {
    position: "absolute",
    top: 50,
    left: 20
  },
  back: {
    width: 30,
    height: 30
  }
});

export default ClientOrderMapStyles;
