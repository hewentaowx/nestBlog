import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ApiCode } from '../enums/apiCode.enum';
export class ApiExceptionFilter extends HttpException {
  private errMsg: string;
  private errCode: ApiCode;

  constructor(errMsg: string, errCode: ApiCode, statusCode: HttpStatus = 200) {
    super(errMsg, statusCode);
    this.errMsg = errMsg;
    this.errCode = errCode;
  }

  gerErrCode(): ApiCode {
    return this.errCode;
  }

  getErrMessage(): string {
    return this.errMsg;
  }
}

export interface ExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentsHost): any;
}
