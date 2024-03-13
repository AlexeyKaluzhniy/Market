import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {ThemeColors} from "~/core/theme/colors";
import {Roboto} from "~/infrastructure/typography";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemedStyles} from "~/core/theme/hooks";

interface IProps {
    submitButtonTitle: TFuncKeyApp;
    onSubmit: () => void;
}

export function SubmitButton({submitButtonTitle, onSubmit}: IProps) {
    const styles = useThemedStyles(stylesG);

    return (<TouchableOpacity
        style={styles.submitButtonActive}
        onPress={onSubmit}
        activeOpacity={0.7}
    >
        <Roboto.Label.Large style={styles.submitButtonText} labelKey={submitButtonTitle}/>
    </TouchableOpacity>);
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    submitButtonActive: {
        alignItems: 'center',
        paddingVertical: CommonSizes.padding.largePlus,
        backgroundColor: colors.main,
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginTop: CommonSizes.margin.extraLarge,
    },
    submitButtonText: {
        color: colors.onPrimary,
    },
});
