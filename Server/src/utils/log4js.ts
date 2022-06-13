import * as path from 'path';
import * as log4js from 'log4js';
import * as util from 'util';
import moment from 'moment';
import * as stackTrace from 'stacktrace-js';
import chalk from 'chalk';
import config from '../config/log4js';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';

    // 日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = util.inspect(value, false, 3, true);
      }
      messageList.push(value);
    });

    // 日志组成部分
    const messageOutput: string = messageList.join(' ');
    const positionOutput: string = position ? ` [${position}]` : '';
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
    const moduleOutput: string = moduleName ? `[${moduleName}] ` : '[LoggerService] ';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = chalk.grey(levelOutput);
        break;
    }

    return `${chalk.green(typeOutput)}${dateOutput}  ${chalk.yellow(moduleOutput,)}${levelOutput}${positionOutput}`;
  };
});

// 注入配置
log4js.configure(config);

// 实例化
const logger = log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args: any) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args: any) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args: any) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args: any) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args: any) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args: any) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args: any) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args: any) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args: any) {
    const loggerCustom = log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: stackTrace.StackFrame[] = stackTrace.getSync();
    const stackInfo: stackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): `;
  }
}
