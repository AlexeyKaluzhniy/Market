import {FunctionComponent, SVGAttributes} from "react";

export interface IPropsCustomInput {
    placeholder: string;
    name: string;
    setValue: (name: string, text: string) => void;
    passwordInput?: boolean;
    numberInput?: boolean;
    Icon?: FunctionComponent<SVGAttributes<SVGElement>>;
    maxLength?: number;
    value?: string;
}
