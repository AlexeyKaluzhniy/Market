import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {DarkThemeColors} from "../core/theme/colors";
import {CommonSizes} from "../core/theme/commonSizes";

interface IPropsButton {
    buttonTitle: string;
}

export function CustomButtonAuth({buttonTitle}: IPropsButton) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 18,
        backgroundColor: '#DF3A76',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20
    },
    buttonText: {
        color: DarkThemeColors.text,
        fontSize: CommonSizes.font.medium
    }
});
