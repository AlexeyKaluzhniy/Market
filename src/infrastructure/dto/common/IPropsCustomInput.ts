import {FunctionComponent, SVGAttributes} from "react";

export interface IPropsCustomInput {
    placeholder: string;
    name: string;
    setValue: any;
    passwordInput?: boolean;
    Icon?: FunctionComponent<SVGAttributes<SVGElement>>;
}
