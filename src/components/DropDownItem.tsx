import {Roboto} from "~/infrastructure";
import {StyleSheet, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemeColors} from "~/core/theme/hooks";

interface IDropDownItemProps {
    value: string;
}

export function DropDownItem({value}: IDropDownItemProps) {
    const colors = useThemeColors();

    return (
        <View style={styles.itemContainer}>
            <Roboto.Label.Large text={value} color={colors.onSurface}/>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: CommonSizes.padding.large,
        paddingHorizontal: CommonSizes.padding.medium
    }
});
