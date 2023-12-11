import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isUUID(value)) {
      throw new BadRequestException(
        `Invalid parameter: ${value}. id must be uuid.`,
      );
    }

    return value;
  }
}
