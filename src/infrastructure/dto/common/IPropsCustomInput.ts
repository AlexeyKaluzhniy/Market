import {FunctionComponent, SVGAttributes} from "react";

export interface IPropsCustomInput {
    placeholder: string;
    name: string;
    setValue: any;
    passwordInput?: boolean;
    numberInput?: boolean;
    Icon?: FunctionComponent<SVGAttributes<SVGElement>>;
    maxLength?: number;
    value?: string;
}
