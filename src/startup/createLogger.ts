import Config from "react-native-config";
import {MultiLogger} from "~/infrastructure/logger/multiLogger";
import {LogLevel} from "~/infrastructure/logger/types/logger";
import {AppEnvironment} from "~/types/react-native-config.types";
import {ConsoleLogger} from "~/infrastructure/logger/consoleLogger";
import {Colors} from "~/core/theme/colors";

export function createLogger(loggerInstance: MultiLogger, overrideLogLevel?: LogLevel, category?: string) {
    let consoleLogLevel: LogLevel;
    let seqLogLevel: LogLevel;
    switch (Config.ENVIRONMENT) {
        case AppEnvironment.development:
            consoleLogLevel = LogLevel.verbose;
            seqLogLevel = LogLevel.verbose;
            break;
        case AppEnvironment.test:
            consoleLogLevel = LogLevel.info;
            seqLogLevel = LogLevel.info;
            break;
        case AppEnvironment.staging:
            consoleLogLevel = LogLevel.info;
            seqLogLevel = LogLevel.info;
            break;
        case AppEnvironment.production:
            consoleLogLevel = LogLevel.warning;
            seqLogLevel = LogLevel.warning;
            break;
        default:
            consoleLogLevel = LogLevel.verbose;
            seqLogLevel = LogLevel.verbose;
    }

    consoleLogLevel = overrideLogLevel ?? consoleLogLevel;
    seqLogLevel = overrideLogLevel ?? seqLogLevel;

    // do not show console logs in production
    if (__DEV__) {
        const consoleInstance = new ConsoleLogger(consoleLogLevel, category);
        consoleInstance.setMinLoggingLevel(consoleLogLevel);
        const verboseStyle = `color: #666; font-size: 10px; margin: -2px; margin-left: 2px`;
        consoleInstance.setConsoleStyle(LogLevel.verbose, verboseStyle);
        consoleInstance.setConsoleStyle(LogLevel.debug, `color: ${Colors.dark}`);
        consoleInstance.setConsoleStyle(LogLevel.info, `color: ${Colors.primaryDark}; font-weight: 600`);
        loggerInstance.addLogger(consoleInstance);
    } else {
        // Для сборки приложения для одного дерева
        // seqLogLevel = LogLevel.verbose;
        //
        // const seqLogger = createSeqLogger({
        //     url: "", // todo: get url
        //     minevel: seqLogLevel,
        //     constantlyPassingParams: {
        //         "SessionId": guid(),
        //         "AppName": `MobileClient-com.market-${Platform.OS}`,
        //         "_kubernetes_namespace_name": "mobile-client-club-dev",
        //     },
        //     onFlushError: error => console.log("seq logger flush error", error, error.stack, error.message),
        //     onFlushSuccess: () => console.log("seq logger flush completed"),
        //
        // });
        //
        // loggerInstance.addLogger(seqLogger);
    }

    return loggerInstance;
}
