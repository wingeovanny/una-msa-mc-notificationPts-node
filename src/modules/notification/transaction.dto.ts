import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ description: 'data with format json' })
  data: Record<string, unknown>;
}
