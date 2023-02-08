import { Controller } from '@nestjs/common';
import { SERVICE_NAME } from '../../constants/common';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '@deuna/node-logger-lib';
import { NotificationService } from './notification.service';
import { ErrorCustomizer } from '../../utils/customize-error';

@ApiTags(SERVICE_NAME)
@Controller('transaction')
export class NotificationController {
  constructor(
    private readonly customSercice: NotificationService,
    private logger: Logger,
    private errorCustomizer: ErrorCustomizer,
  ) {}
}
