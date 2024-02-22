import {i18next} from "~/common/localization/localization";
import {LocalizedTextDto} from "~/infrastructure/dto/common/LocalizedTextDto";
import {LanguageEnum} from "~/infrastructure/dto/common/LanguageEnum";

export function getLocalizedValue(value?: string | number | LocalizedTextDto | null): string | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value == "string" || typeof value == "number") {
    return value.toString();
  }

  const language = i18next.language[0].toUpperCase() + i18next.language.slice(1);

  const localizationValue = value as LocalizedTextDto;
  const hasLanguage = Object.getOwnPropertyNames(value).includes(language);

  if (hasLanguage) {
    return localizationValue[language as LanguageEnum];
  } else {
    const fallbackLanguage = LanguageEnum.Ru.toString()[0].toUpperCase() + LanguageEnum.Ru.toString().slice(1);
    const fallbackValue = localizationValue[fallbackLanguage as LanguageEnum];

    if (fallbackValue) {
      return localizationValue[fallbackLanguage as LanguageEnum];
    } else {
      const keys = Object.keys(value);

      return keys.length ? localizationValue[keys[0] as LanguageEnum] : undefined;
    }
  }
}
