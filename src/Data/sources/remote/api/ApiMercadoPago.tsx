import axios from "axios";

const ApiMercadoPago = axios.create({
  baseURL: "https://api.mercadopago.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer TEST-3170059675329164-010511-59e057df8eb745a0653b4640ff6c5670-1242016249"
  }
});

export { ApiMercadoPago };
