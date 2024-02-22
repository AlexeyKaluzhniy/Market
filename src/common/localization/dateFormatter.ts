import dayjs from "dayjs";
// eslint-disable-next-line import/no-unassigned-import
import "dayjs/locale/en";
// eslint-disable-next-line import/no-unassigned-import
import "dayjs/locale/ru";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from 'dayjs/plugin/utc';
import relativeTime from "dayjs/plugin/relativeTime";
import {getI18n} from "react-i18next";
import {ICalendarSpec} from "~/types";

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

export enum DateFormat {
  dayMonthShortYear = "DD.MM.YYYY",
  dayShortMonthYear = "DD MMM YYYY",
  dayMonthWeekdayShort = "DD MMMM, dd",
  dayMonthWeekdayFull = "DD MMMM, dddd",
  monthFullAndDay = "MMMM, DD",
  dayAndMonth = "DD MMMM",
  dateAndTime = "DD.MM HH:mm",
  dayAndMonthShort = "DD.MM",
  time = "HH:mm",
  year = "YYYY",
  shortMonth = "MMM",
  dayNumber = "DD",
  shortMonthYear = "MMM YYYY",
  dayMonthYear = "DD MMMM YYYY",
  full = "YYYY-MM-DD HH:mm:ss",
  yearDateTime = "YYYY.MM.DD HH:mm",
  yearMonthDay = "YYYY.MM.DD",
}

const calendarFormat: ICalendarSpec = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  lastDay: "[Yesterday]",
  nextWeek: "dddd",
  lastWeek: "[Last] dddd",
  sameElse: DateFormat.dayMonthShortYear,
};

export function dateFromString(obj: string | Date): Date {
  if (obj instanceof Date) {
    return obj;
  }

  return new Date(obj);
}

export function dateFromUnknown(obj: string | Date | null | number | undefined): Date | null {
  if (obj == null) {
    return null;
  }
  if (obj instanceof Date) {
    return obj;
  }

  return new Date(obj);
}

export function dateFromFormat(date: Date | number | null | undefined | string, format: DateFormat): string {
  let result = "";

  const formattedDate: Date | null = dateFromUnknown(date);
  if (formattedDate) {
    result = dayjs(formattedDate).format(format);
  }

  return result;
}

export function calendarDate(date: Date | null | number | undefined | string, withFormat?: boolean): string {
  let result = "";

  const formattedDate: Date | null = dateFromUnknown(date);
  if (formattedDate) {
    result = withFormat ? dayjs(formattedDate).calendar(null, calendarFormat) : dayjs(formattedDate).calendar();
  }

  return result;
}

export function relativeDateFrom(date: Date | null | number | undefined | string): string {
  let result = "";

  const formattedDate: Date | null = dateFromUnknown(date);
  if (formattedDate) {
    const dateInJs = dayjs(formattedDate);

    if (dayjs().subtract(1, "d").isBefore(date)) {
      result = dateInJs.fromNow();
    } else if (dayjs().subtract(2, "d").isBefore(date)) {
      result = dateInJs.format(`[${getI18n().t("date.yesterdayAt")}] HH:mm`);
    } else {
      result = dateInJs.format(getI18n().t("date.calendarFormat"));
    }
  }

  return result;
}

export function setDateLocale(locale: string): void {
  dayjs.locale(locale);
}

export function getUnixDate(date: Date | null | number | undefined | string): number {
  return dayjs(date).unix() * 1000;
}

export function getInitialDate(date: Date | null | number | undefined | string, defaultDate?: Date): Date {
  if (date != null) {
    return dayjs(date).toDate();
  } else {
    return defaultDate || new Date();
  }
}
