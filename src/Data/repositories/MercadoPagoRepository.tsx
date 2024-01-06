import { IdentificationType } from "../../Domain/entities/IdentificationType";
import { MercadoPagoRepository } from "../../Domain/repositories/MercadoPagoRepository";
import { ApiMercadoPago } from "../sources/remote/api/ApiMercadoPago";

export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {
  async getIdentificationTypes(): Promise<IdentificationType[]> {
    const response = await ApiMercadoPago.get<IdentificationType[]>(
      "/identification_types"
    );

    return response.data;
  }
}
