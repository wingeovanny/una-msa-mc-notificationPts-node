import { ErrorCodes, ErrorObjectType } from '@deuna/node-shared-lib';
import { Injectable } from '@nestjs/common';
import { SERVICE_NAME } from '../../constants/common';

const errors: ErrorObjectType[] = [
  {
    code: ErrorCodes.USER_DOES_NOT_EXIST_CODE, // Dudas sobre que codigo se deberia enviar
    reason: '',
    source: SERVICE_NAME,
    details: '',
  },
];
@Injectable()
export class NotificationService {}
