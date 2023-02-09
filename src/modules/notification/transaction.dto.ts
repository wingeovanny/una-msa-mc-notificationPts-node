import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  idTransaction: string;
  @ApiProperty()
  detailTransaction: string;
  @ApiProperty()
  sourceAccount: string;
  @ApiProperty()
  destinationAcount: string;
  @ApiProperty()
  reason: string;
  @ApiProperty()
  originTransacction: string;
}
