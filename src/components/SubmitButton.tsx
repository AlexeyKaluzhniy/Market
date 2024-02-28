import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {DarkThemeColors, LightThemeColors} from "~/core/theme/colors";
import {Normalize} from "react-i18next";
import {Roboto} from "~/infrastructure/typography";
import {AuthLocalization} from "~/infrastructure/dto/common/IAuthComponentProps";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IProps {
    submitButtonTitle: Normalize<AuthLocalization>;
    onSubmit: () => void;
}

export function SubmitButton({submitButtonTitle, onSubmit}: IProps) {

    return (<TouchableOpacity
        style={styles.submitButtonActive}
        onPress={onSubmit}
        activeOpacity={0.7}
    >
        <Roboto.Label.Large style={styles.submitButtonText} labelKey={submitButtonTitle}/>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    submitButtonActive: {
        alignItems: 'center',
        paddingVertical: CommonSizes.padding.largePlus,
        backgroundColor: LightThemeColors.main,
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginTop: CommonSizes.margin.extraLarge,
    },
    submitButtonText: {
        color: DarkThemeColors.text,
    },
});
