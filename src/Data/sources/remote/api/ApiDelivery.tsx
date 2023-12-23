import axios from "axios";

const ApiDelivery = axios.create({
  baseURL: "http://192.168.0.6:3000/api",
  headers: {
    "Content-ype": "application/json"
  }
});

export { ApiDelivery };
