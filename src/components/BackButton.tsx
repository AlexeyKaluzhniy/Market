import ArrowBackIcon from "../../resources/icons/arrow_back.svg";
import {TouchableOpacity} from "react-native";
import React from "react";
import {IHeaderLeftButton} from "~/infrastructure/dto/common/IHeaderLeftButton";

export function BackButton({onPress}: IHeaderLeftButton) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ArrowBackIcon/>
        </TouchableOpacity>
    );
}
