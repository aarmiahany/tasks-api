import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { APP_ERRORS } from '../constants/errors.enum';

@Injectable()
export class TaskValidationPipe implements PipeTransform {
  // init log prop
  private readonly logger = new Logger(TaskValidationPipe.name);

  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log('Pipes: Validating request payload');
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(APP_ERRORS.INVALID_PAYLOAD_DATA);
    }
    return value;
  }
}