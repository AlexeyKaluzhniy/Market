import {LanguageEnum} from "./LanguageEnum";

export type LocalizedTextDto = {
  [T in LanguageEnum]: string;
};
