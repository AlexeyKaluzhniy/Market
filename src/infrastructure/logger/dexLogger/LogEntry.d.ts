import {Guid} from "./guid";
import {LogEntryType} from "./LogEntryType";

export interface ILogEntry {
  Type: LogEntryType;
  Msg: string;
  Utc: Date;
  Info: object;
  LogId: Guid;
  Categories: string[];
  MemberName: string;
  FileName: string;
  LineNumber: number;
  References: Guid[];
}
