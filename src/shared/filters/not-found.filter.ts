import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorConstant, HTTP_ERR_MSGS } from '../constants/error.constant';
import { LoggerConstant } from '../constants/logger.constant';
import { ErrorResponseDto } from '../dtos/error-response.dto';
import { ErrorDto } from '../dtos/error.dto';
import { FilterType } from '../types/FilterType';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  constructor(private readonly filterParam: FilterType) {}

  catch(exception: any, host: ArgumentsHost) {
    const { logger, asyncRequestContext } = this.filterParam;
    const status = HttpStatus.NOT_FOUND;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error: ErrorDto = { code: ErrorConstant[exception.name] };

    logger.error(
      LoggerConstant.notFound,
      undefined,
      asyncRequestContext.getRequestIdStore(),
    );

    response.status(status).json({
      errors: [error],
      message: HTTP_ERR_MSGS[status],
    } as ErrorResponseDto);
  }
}
