import { EstateTransactionResponse } from '../../../types/estate-transaction.response';
import { City } from '../../../types/city-codes.response';

export interface ResasRepository {
  // クエリパラメータを受け取り、RESAS-APIとの通信を実装する
  getEstateTransaction(
    year: number,
    prefCode: number,
    cityCode: string | number,
    displayType: number,
  ): Promise<EstateTransactionResponse>;

  getCityCodes(prefCode: number | string): Promise<City[]>;
}
