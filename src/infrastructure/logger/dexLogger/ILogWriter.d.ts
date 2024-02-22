import {ILogEntry} from "./LogEntry";

export interface ILogWriter {
  write(item: ILogEntry): void;
}
