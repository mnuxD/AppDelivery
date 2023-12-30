import { StyleSheet } from "react-native";

const AdminProductUpdateStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "contain"
  },
  form: {
    backgroundColor: "white",
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0
  },
  buttonContainer: {
    marginTop: 30
  },
  categoryInfo: {
    marginTop: 30,
    alignItems: "center"
  },
  imageCategory: {
    width: 50,
    height: 50
  },
  textCategory: {
    color: "gray",
    fontSize: 17,
    fontWeight: "bold"
  }
});

export default AdminProductUpdateStyles;
