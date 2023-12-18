import { EstateQueryDto } from '../dto/estate-query.dto';

export interface ResasRepository {
  findAll(query: EstateQueryDto): Promise<string>;
}
