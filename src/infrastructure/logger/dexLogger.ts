// noinspection ES6PreferShortImport
import Config from "react-native-config";
import {Logger, LogLevel} from "./types/logger";
import {ILogWriter} from "./dexLogger/ILogWriter";
import {ILogEntry} from "./dexLogger/LogEntry";
import {HttpLogWriter} from "./dexLogger/HttpLogWriter";
import {LogEntryType} from "./dexLogger/LogEntryType";
import {Logger as DexLoggerImpl} from "./dexLogger/Logger";

class ConsoleWriter implements ILogWriter {
  write(item: ILogEntry): void {
    if (item.Type == LogEntryType.Warning || item.Type == LogEntryType.Exception || item.Type == LogEntryType.Critical) {
      console.log(item.Msg, item.Info);
    }
  }
}

function createDexLoggerWriter(category?: string) {
  const writers: ILogWriter[] = [];
  const predicate = Config.ENVIRONMENT == "production"
    ? (entry: ILogEntry): boolean =>
      entry.Type == LogEntryType.Critical
      || entry.Type == LogEntryType.Exception
      || entry.Type == LogEntryType.Warning
    : (): boolean => true;

  if (Config.DEX_LOGGER_URL?.startsWith("http")) {
    const httpLogWriter = new HttpLogWriter(
      Config.DEX_LOGGER_URL,
      fetch,
      (error): void => console.log(error), predicate,
    );
    writers.push(httpLogWriter);
    writers.push(new ConsoleWriter());
  }

  const categories = category
    ? ["FC_Spartak.Mobile", `FC_Spartak.Mobile.${category}`]
    : ["FC_Spartak.Mobile"];

  return new DexLoggerImpl(writers, categories);
}

export class DexLogger implements Logger {
  private minLoggingLevel = LogLevel.verbose;
  private dexLoggerInstance: DexLoggerImpl;

  constructor(logLevel: LogLevel = LogLevel.verbose, category?: string) {
    this.minLoggingLevel = logLevel;

    this.dexLoggerInstance = createDexLoggerWriter(category);
  }

  private logInternal(logLevel: LogLevel, message: string, ...info: any[]): void {
    if (this.minLoggingLevel <= logLevel) {
      switch (logLevel) {
        case LogLevel.verbose:
          this.dexLoggerInstance.suppress(message, {info});
          break;
        case LogLevel.debug:
          this.dexLoggerInstance.log(message, {info});
          break;
        case LogLevel.info:
          this.dexLoggerInstance.info(message, {info});
          break;
        case LogLevel.warning:
          this.dexLoggerInstance.warning(message, {info});
          break;
        case LogLevel.error:
          const error = new Error(message);
          this.dexLoggerInstance.exception(error, message, {info});
          break;
        default:
          break;
      }
    }
  }

  setMinLoggingLevel(logLevel: LogLevel): void {
    this.minLoggingLevel = logLevel;
  }

  logWithLevel(logLevel: LogLevel, message: string, ...info: any[]): void {
    this.logInternal(logLevel, message, ...info);
  }

  verb(message: string, ...info: any[]): void {
    this.logInternal(LogLevel.verbose, message, ...info);
  }

  debug(message: string, ...info: any[]): void {
    this.logInternal(LogLevel.debug, message, ...info);
  }

  info(message: string, ...info: any[]): void {
    this.logInternal(LogLevel.info, message, ...info);
  }

  warn(message: string, ...info: any[]): void {
    this.logInternal(LogLevel.warning, message, ...info);
  }

  error(message: string, ...info: any[]): void {
    this.logInternal(LogLevel.error, message, ...info);
  }

  // own logger method
  addReference(reference: string) {
    this.dexLoggerInstance.addReference(reference);
  }

  clearReferences() {
    this.dexLoggerInstance.clearReferences();
  }
}


