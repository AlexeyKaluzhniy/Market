import {Roboto} from "~/infrastructure";
import {StyleSheet, TouchableOpacity} from "react-native";
import {FunctionComponent, SVGAttributes} from "react";
import {Normalize} from "react-i18next";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IProps {
    Icon: FunctionComponent<SVGAttributes<SVGElement>>;
    title: Normalize<{
        drawer: {
            settings: string;
            about: string;
            logOut: string;
        };
    }>;
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
