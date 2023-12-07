import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

export const checkById = async (
  id: string,
  repository: Repository<any>,
  message: string,
) => {
  if (!isUUID(id)) {
    throw new BadRequestException(`Invalid parameter: ${id}. id must be uuid.`);
  }
  const recordExists = await repository.exist({
    where: { id },
  });

  if (!recordExists) {
    throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
};
