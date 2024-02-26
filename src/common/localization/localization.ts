import {setDateLocale} from "./dateFormatter";
// eslint-disable-next-line no-restricted-imports
import i18n from "i18next";
import {getI18n, initReactI18next, TFuncKey} from "react-i18next";
import {findBestAvailableLanguage} from "react-native-localize";
import {I18nManager} from "react-native";
import type en from "./translations/en.json";
import type ru from "./translations/ru.json";

export const languages = [
  {languageTag: "en", isRTL: false, name: "English"},
  {languageTag: "ru", isRTL: false, name: "Русский"},
] as const;

export const fallbackLng = languages[0].languageTag;

export type Languages = typeof languages[number];
export const languagesTags = languages.map(el => el.languageTag);
export const languagesNames = languages.map(el => el.name);
const getLanguageByTag = (tag?: string) => languages.find(el => el.languageTag == tag);

export type LanguageResource = typeof en | typeof ru;
export type TFuncKeyApp<TPrefix = undefined> = TFuncKey<"translation", TPrefix, LanguageResource>;

const translationGetters: {[key: string]: (() => typeof en & typeof ru) | undefined} = {
  en: (): typeof en => require("./translations/en.json"),
  ru: (): typeof ru => require("./translations/ru.json"),
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {},
    fallbackLng,
    interpolation: {escapeValue: false},
    react: {useSuspense: false},
  });

export const getLanguage = () => getLanguageByTag(getInterfaceLanguage()?.languageTag) || languages[0];
export const getInterfaceLanguage = () => findBestAvailableLanguage(languagesTags);

export async function setLanguage(inputLanguage?: Languages): Promise<void> {
  const language = inputLanguage || getLanguage();
  i18n.addResourceBundle(
    language.languageTag,
    "translation",
    translationGetters[language.languageTag]?.()['translation'],
    true,
    false,
  );

  I18nManager.forceRTL(language.isRTL);
  setDateLocale(language.languageTag);
  await i18n.changeLanguage(language.languageTag);
}

export const i18next = getI18n();
