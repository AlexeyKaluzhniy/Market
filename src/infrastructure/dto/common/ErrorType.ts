import {Dto} from "~/infrastructure";

export type ErrorType = {
  status: number;
  data?: Dto.Common.ErrorData;
} | {
  status: "FETCH_ERROR";
  data?: undefined;
  error: string;
} | {
  status: "PARSING_ERROR";
  originalStatus: number;
  data?: undefined;
  error: string;
} | {
  status: "CUSTOM_ERROR";
  data?: undefined;
  error: string;
};
