import EditIcon from "../../../resources/icons/edit.svg";
import {TouchableOpacity} from "react-native";
import React from "react";

export function EditButton() {
    return (
        <TouchableOpacity>
            <EditIcon/>
        </TouchableOpacity>
    );
}
