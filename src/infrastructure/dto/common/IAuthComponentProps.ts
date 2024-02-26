import {ObjectSchema} from "yup";

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

export interface IAuthComponentProps {
    submitButtonTitle: string;
    isLogin?: boolean;
    phoneField?: boolean;
    passwordField?: boolean;
    repeatPasswordField?: boolean;
    isRegister?: boolean;
    schema: ObjectSchema<AuthSchema | ForgotPasswordSchema | NewPasswordSchema>;
    onSubmit: any;
}
