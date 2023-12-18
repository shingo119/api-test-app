import { EstateTransactionResponse } from '../../../types/estate-transaction.response';

export interface ResasRepository {
  // クエリパラメータを受け取り、RESAS-APIとの通信を実装する
  findAll(
    year: number,
    prefCode: number,
    cityCode: string | number,
    displayType: number,
  ): Promise<EstateTransactionResponse>;
}
