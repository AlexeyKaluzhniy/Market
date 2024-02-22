import {LiteralUnion} from "react-hook-form/dist/types/utils";
import {RegisterOptions} from "react-hook-form/dist/types/validator";
import {Ref} from "react-hook-form/dist/types/fields";
import {MultipleFieldErrors} from "react-hook-form/dist/types/errors";
import {TFuncKeyApp} from "~/common/localization/localization";

export interface IValidationError {
  type: LiteralUnion<keyof RegisterOptions, string>;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: TFuncKeyApp | string;
}
