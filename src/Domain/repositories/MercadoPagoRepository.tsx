import { IdentificationType } from "../entities/IdentificationType";

export interface MercadoPagoRepository {
  getIdentificationTypes(): Promise<IdentificationType[]>;
}
