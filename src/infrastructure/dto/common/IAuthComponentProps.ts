import {ObjectSchema} from "yup";
import {TFuncKeyApp} from "~/common/localization/localization";

interface AuthSchema {
    phone: string;
    password: string;
    repeatPassword?: string;
    isConditionUsageAndConfidentialPoliticsAgree?: boolean;
}

interface ForgotPasswordSchema {
    phone: string;
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
    onSubmit: any;
}
