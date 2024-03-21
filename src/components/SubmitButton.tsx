import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useMemo} from "react";
import {Roboto} from "~/infrastructure/typography";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemeColors} from "~/core/theme/hooks";

interface IProps {
    submitButtonTitle: TFuncKeyApp;
    onSubmit: () => void;
    disabled: boolean;
}

export function SubmitButton({submitButtonTitle, onSubmit, disabled}: IProps) {
    const colors = useThemeColors();

    const buttonStyle = useMemo(() => ({backgroundColor: disabled ? colors.outline : colors.main}),
        [colors.main, colors.outline, disabled]);

    const textColor = useMemo(() => disabled ? colors.outlineVariant : colors.onPrimary,
        [colors.onPrimary, colors.outlineVariant, disabled]);

    return (
        <TouchableOpacity
            style={[styles.submitButton, buttonStyle]}
            onPress={onSubmit}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <Roboto.Label.Large color={textColor} labelKey={submitButtonTitle}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'center',
        paddingVertical: CommonSizes.padding.largePlus,
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginTop: CommonSizes.margin.extraLarge,
    },
});
