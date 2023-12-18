import { EstateQueryDto } from '../dto/estate-query.dto';

export interface ResasRepository {
  // クエリパラメータを受け取り、RESAS-APIとの通信を実装する
  findAll(query: EstateQueryDto): Promise<string>;
}
