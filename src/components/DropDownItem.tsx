import {Roboto} from "~/infrastructure";
import {StyleSheet, TouchableOpacity} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IDropDownItemProps {
    onPress: (value: string) => void;
    value: string;
}

export function DropDownItem({onPress, value}: IDropDownItemProps) {
    return (
        <TouchableOpacity onPress={() => onPress(value)} style={styles.itemContainer}>
            <Roboto.Label.Large text={value}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: CommonSizes.padding.large,
        paddingHorizontal: CommonSizes.padding.medium
    }
});
