import "react-native-gesture-handler";
import {initializeApp} from "./src/app";
import { NativeModules } from "react-native";
import {isDev} from "./src/core/theme/commonConsts";
import {isIos} from "react-native-modalize/lib/utils/devices";

if (isDev) {
  const DevMenu = require("react-native-dev-menu");
  if (isIos) {
      DevMenu.addItem("iOS debugging: Enable", () => NativeModules.DevSettings.setIsDebuggingRemotely(true));
      DevMenu.addItem("iOS debugging: Disable", () => NativeModules.DevSettings.setIsDebuggingRemotely(false));
  }
}
//
// // noinspection JSUnresolvedVariable
// if (global.HermesInternal) {
//   if (typeof Intl === "undefined") {
//     require("intl")
//     require("intl/locale-data/jsonp/ru")
//     require("intl/locale-data/jsonp/en")
//   }
//   require('@formatjs/intl-locale').default;
//   require('@formatjs/intl-locale/polyfill').default;
//
//   require("@formatjs/intl-pluralrules/polyfill").default;
//   require("@formatjs/intl-pluralrules/locale-data/ru").default;
//   require("@formatjs/intl-pluralrules/locale-data/en").default;
// }

initializeApp();
