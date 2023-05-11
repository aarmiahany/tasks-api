import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { APP_ERRORS } from '../constants/errors.enum';

// Custom validation for monogodb id
@Injectable()
export class TaskIdValidationPipe implements PipeTransform {
  private readonly logger = new Logger(TaskIdValidationPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log('Pipes: Validating request param Id');
    if (!isValidObjectId(value)) {
      throw new BadRequestException(APP_ERRORS.INVALID_ID);
    }
    return value;
  }
}