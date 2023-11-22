import { LoggerService } from '@nestjs/common';
import { parse } from 'path';

export class Logger implements LoggerService {
  constructor() {}

  private getCaller(): string {
    const error = new Error('-');

    const matches = error.stack.matchAll(/at .*[/\\](.+?\.(?:js|ts):\d+):/g);

    const currentFilename = parse(__filename).name;

    for (const match of matches) {
      const filename = match[1];

      if (!filename.includes(currentFilename)) {
        return filename;
      }
    }

    return '';
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    const COLORIZE_LOG = '\u001B[32m';
    const COLORIZE_RESET = '\u001B[0m';

    const baseFormat = {
      level: 'INFO',
      location: this.getCaller(),
      message,
      time: new Date().toISOString(),
    };

    const formats = Object.keys(baseFormat).map((transformableField) => {
      const transformableValue = baseFormat[transformableField];

      return `${transformableField}: ${COLORIZE_LOG}${transformableValue}${COLORIZE_RESET}`;
    });

    console.log(formats.join(', '));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}
