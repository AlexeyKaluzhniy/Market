import EditIcon from "../../../resources/icons/edit.svg";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";

export function EditButton() {
    return (
        <TouchableOpacity style={styles.editIcon}>
            <EditIcon/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    editIcon: {
        marginRight: CommonSizes.margin.extraLarge
    }
});
