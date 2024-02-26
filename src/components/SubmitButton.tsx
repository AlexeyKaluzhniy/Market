import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {DarkThemeColors, LightThemeColors} from "../core/theme/colors";

interface IProps {
    submitButtonTitle: string;
    onSubmit: () => void;
}

export function SubmitButton({submitButtonTitle, onSubmit}: IProps)  {

    return (<TouchableOpacity
        style={styles.submitButtonActive}
        onPress={onSubmit}
        activeOpacity={0.7}
    >
        <Text style={styles.submitButtonText}>{submitButtonTitle}</Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    submitButtonActive: {
        alignItems: 'center',
        paddingVertical: 18,
        backgroundColor: LightThemeColors.main,
        borderRadius: 28,
        marginTop: 20,
    },
    submitButtonInactive: {
      backgroundColor: LightThemeColors.secondaryText
    },
    submitButtonText: {
        color: DarkThemeColors.text,
    },
});
