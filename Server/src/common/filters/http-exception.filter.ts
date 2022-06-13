import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiExceptionFilter } from './api-exception.filter';
import { Logger } from '../../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    // 组装日志信息
    const logFormat = `
      -------------------错误日志----------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${exception.toString()}
      -------------------错误日志----------------------`;
    Logger.error(logFormat);

    // 设置错误信息
    if (exception instanceof ApiExceptionFilter) {
      response.status(status).json({
        code: (exception as ApiExceptionFilter).gerErrCode(),
        message: (exception as ApiExceptionFilter).getErrMessage(),
        data: {},
      });
    } else {
      response.status(status).json({
        code: -1,
        message: `${status} ${exception.toString()}`,
        data: {},
      });
    }
  }
}
