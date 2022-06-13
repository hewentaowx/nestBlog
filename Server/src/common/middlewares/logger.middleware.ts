import { Request, Response } from 'express';
import { Logger } from '../../utils/log4js';

export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = `
    -------------------入参----------------------
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      Status code: ${code}
      Parmas: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
      Body: ${JSON.stringify(req.body)}
    -------------------入参----------------------`;
  // 根据状态码，进行日志类型区分 过滤掉访问swagger文档的请求
  if (!req.originalUrl.includes('doc')) {
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.log(logFormat);
    }
  }
}
