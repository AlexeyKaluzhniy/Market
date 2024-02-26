import {SvgProps} from "react-native-svg";
import React from "react";

export interface IPropsCustomInput {
    placeholder: string;
    name: string;
    setValue: any;
    passwordInput: boolean;
    Icon: React.FC<SvgProps>;
}
