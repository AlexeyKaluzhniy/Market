import {LogLevel} from "~/infrastructure/logger/types/logger";
import {createLogger} from "~/startup/createLogger";
import {MultiLogger} from "~/infrastructure/logger/multiLogger";
import {LogCategories, logger} from "~/infrastructure/logger";

const loggers: Record<LogCategories, MultiLogger> = {} as any;

export function getOrCreateLogger(category?: LogCategories) {
  if (category) {
    const existingLogger = loggers[category];
    if (!existingLogger) {
      const logSettings: Record<string, LogLevel> = {
        [LogCategories.Queries]: __DEV__ ? LogLevel.debug : LogLevel.error,
        [LogCategories.Analytics]: __DEV__ ? LogLevel.debug : LogLevel.error,
        [LogCategories.Notification]: __DEV__ ? LogLevel.debug : LogLevel.error,
        [LogCategories.DynamicLink]: __DEV__ ? LogLevel.debug : LogLevel.error,
      };
      let overrideLogLevel = LogLevel.error;
      if (logSettings) {
        overrideLogLevel = logSettings[category] ?? LogLevel.error;
      }

      loggers[category] = createLogger(new MultiLogger(), overrideLogLevel, category);
    }

    return loggers[category];
  } else {
    return logger;
  }
}

export function configureLogger() {
  createLogger(logger, __DEV__ ? LogLevel.verbose : undefined);
}
