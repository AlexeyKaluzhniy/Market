import {Roboto} from "~/infrastructure";
import {StyleSheet, TouchableOpacity} from "react-native";
import {FunctionComponent, SVGAttributes} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TFuncKeyApp} from "~/common/localization/localization";

interface IProps {
    Icon: FunctionComponent<SVGAttributes<SVGElement>>;
    title: TFuncKeyApp;
    onPress: () => void;
}

export function MenuItem({Icon, title, onPress}: IProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon/>
            <Roboto.Label.Large labelKey={title} style={styles.title}/>
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
