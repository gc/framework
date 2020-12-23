"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
/**
 * The logger levels for the [[ILogger]].
 */
var LogLevel;
(function (LogLevel) {
    /**
     * The lowest log level, used when calling [[ILogger.trace]].
     */
    LogLevel[LogLevel["Trace"] = 10] = "Trace";
    /**
     * The debug level, used when calling [[ILogger.debug]].
     */
    LogLevel[LogLevel["Debug"] = 20] = "Debug";
    /**
     * The info level, used when calling [[ILogger.info]].
     */
    LogLevel[LogLevel["Info"] = 30] = "Info";
    /**
     * The warning level, used when calling [[ILogger.warn]].
     */
    LogLevel[LogLevel["Warn"] = 40] = "Warn";
    /**
     * The error level, used when calling [[ILogger.error]].
     */
    LogLevel[LogLevel["Error"] = 50] = "Error";
    /**
     * The critical level, used when calling [[ILogger.fatal]].
     */
    LogLevel[LogLevel["Fatal"] = 60] = "Fatal";
    /**
     * An unknown or uncategorized level.
     */
    LogLevel[LogLevel["None"] = 100] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=ILogger.js.map