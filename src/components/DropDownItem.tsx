import {Roboto} from "~/infrastructure";
import {StyleSheet, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IDropDownItemProps {
    value: string;
}

export function DropDownItem({value}: IDropDownItemProps) {
    return (
        <View style={styles.itemContainer}>
            <Roboto.Label.Large text={value}/>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: CommonSizes.padding.large,
        paddingHorizontal: CommonSizes.padding.medium
    }
});
