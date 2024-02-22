import {logger} from "./multiLogger";

enum LogCategories {
  Queries = "Queries",
  Analytics = "Analytics",
  Notification = "Notification",
  DynamicLink = "DynamicLink",
}

export {
  logger,
  LogCategories,
};
