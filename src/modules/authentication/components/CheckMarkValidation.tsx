import {StyleSheet, View} from "react-native";
import CheckMarkIcon from "../../../../resources/icons/confirmSmall.svg";
import {TFuncKeyApp} from "~/common/localization/localization";
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useThemeColors} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useMemo} from "react";

interface IPropsCheckMarkValidation {
    text: TFuncKeyApp;
    isValid: boolean;
}

export function CheckMarkValidation({text, isValid}: IPropsCheckMarkValidation) {
    const colors = useThemeColors();

    const checkColor = useMemo(() => {
        return isValid ? colors.main : colors.outline;
    }, [isValid]);

    const iconContainerStyle = useMemo(() => {
        return {
            backgroundColor: isValid ? colors.primaryFixed : colors.outlineVariant
        };
    }, [isValid]);

    return (
        <View style={[CommonStyles.rowCenter, styles.container]}>
            <View style={[styles.iconContainer, iconContainerStyle]}>
                <CheckMarkIcon color={checkColor} style={styles.icon}/>
            </View>
            <Roboto.Label.Large labelKey={text} color={checkColor}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: CommonSizes.margin.extraSmallPlus,
        paddingLeft: CommonSizes.margin.extraSmallPlus
    },
    iconContainer: {
        paddingHorizontal: CommonSizes.padding.extraSmallPlus - 0.5,
        paddingVertical: CommonSizes.padding.extraSmallPlus,
        borderRadius: CommonSizes.borderRadius.medium,
        marginRight: CommonSizes.margin.small
    },
    icon: {
        width: CommonSizes.margin.small + 1,
        height: CommonSizes.margin.small
    }
});
