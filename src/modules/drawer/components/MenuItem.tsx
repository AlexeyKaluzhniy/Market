import {Roboto} from "~/infrastructure";
import {StyleSheet, TouchableOpacity} from "react-native";
import {FunctionComponent, SVGAttributes} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemeColors} from "~/core/theme/hooks";

interface IProps {
    Icon: FunctionComponent<SVGAttributes<SVGElement>>;
    title: TFuncKeyApp;
    onPress: () => void;
}

export function MenuItem({Icon, title, onPress}: IProps) {
    const colors = useThemeColors();

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon color={colors.outline}/>
            <Roboto.Label.Large labelKey={title} style={styles.title} color={colors.onSurface}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: CommonSizes.padding.large,
        ...CommonStyles.row
    },
    title: {
        marginLeft: CommonSizes.margin.medium
    }
});
