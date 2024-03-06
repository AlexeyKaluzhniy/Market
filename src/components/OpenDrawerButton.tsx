import {TouchableOpacity} from "react-native";
import MenuIcon from "../../resources/icons/menu.svg";
import React from "react";
import {IHeaderLeftButton} from "~/infrastructure/dto/common/IHeaderLeftButton";

export function OpenDrawerButton({onPress}: IHeaderLeftButton) {
    return (
        <TouchableOpacity onPress={onPress}>
            <MenuIcon/>
        </TouchableOpacity>
    );
}
