import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiCode } from '../enums/apiCode.enum';
import { Logger } from '../../utils/log4js';

// 约定好的返回格式
interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = `
          -------------------出参----------------------
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip}
            User: ${JSON.stringify(req.user)}
            Response data: ${JSON.stringify(data.data)}
          -------------------出参----------------------`;
        Logger.access(logFormat);
        return {
          code: ApiCode.SUCCESS,
          message: 'success',
          data,
        };
      }),
    );
  }
}
