import {ObjectSchema} from "yup";
import {TFuncKeyApp} from "~/common/localization/localization";
import {ILogin, IRegister} from "~/core/store/api/auth/authModels";

interface AuthSchema {
    phoneNumber: string;
    password: string;
    repeatPassword?: string;
    isConditionUsageAndConfidentialPoliticsAgree?: boolean;
}

interface ForgotPasswordSchema {
    phoneNumber: string;
}

interface NewPasswordSchema {
    password: string;
    repeatPassword: string;
}

export interface IAuthComponentProps {
    submitButtonTitle: TFuncKeyApp;
    isLogin?: boolean;
    phoneField?: boolean;
    passwordField?: boolean;
    repeatPasswordField?: boolean;
    isRegister?: boolean;
    schema: ObjectSchema<AuthSchema | ForgotPasswordSchema | NewPasswordSchema>;
    onSubmit: (arg: IRegister | ILogin | NewPasswordSchema | ForgotPasswordSchema) => void;
}
