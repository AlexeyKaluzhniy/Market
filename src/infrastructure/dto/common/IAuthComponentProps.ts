import {ObjectSchema} from "yup";
import {Normalize} from "react-i18next";

interface AuthSchema {
    email: string;
    password: string;
    repeatPassword?: string;
}

interface ForgotPasswordSchema {
    email: string;
}

interface NewPasswordSchema {
    password: string;
    repeatPassword: string;
}

export interface AuthLocalization {
    authentication: {
        sendSms: string;
        registerTab: string;
        loginTab: string;
        savePassword: string;
        confirm: string;
    };
}

export interface IAuthComponentProps {
    submitButtonTitle: Normalize<AuthLocalization>;
    isLogin?: boolean;
    phoneField?: boolean;
    passwordField?: boolean;
    repeatPasswordField?: boolean;
    isRegister?: boolean;
    schema: ObjectSchema<AuthSchema | ForgotPasswordSchema | NewPasswordSchema>;
    onSubmit: any;
}
