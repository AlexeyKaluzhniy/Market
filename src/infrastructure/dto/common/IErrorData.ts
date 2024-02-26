import {ServerErrorTypes} from "./ServerErrorTypes";

export interface IErrorData {
  error_description?: string;
  message?: string;
  error?: string;
  errors?: any;
  Data: Record<string, string> & {Reason: string; Type: string};
  Message: string;
  StackTrace: string | null;
  Type: ServerErrorTypes;
}
