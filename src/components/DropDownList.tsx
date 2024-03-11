import {StyleSheet} from "react-native";
import {useState} from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import DropDownListIcon from "../../resources/icons/drop_down.svg";
import {Dropdown} from "react-native-element-dropdown";
import {DropDownItem} from "~/components/DropDownItem";

interface IDropDownList {
    values: { value: string }[];
    onRightSide?: boolean;
}

export function DropDownList({values, onRightSide}: IDropDownList) {
    const [valueShown, setValueShown] = useState<string>(values[0].value);

    const leftMargin = {
        marginLeft: onRightSide ? -85 : 0,
    };

    return (
        <Dropdown
            data={values}
            valueField={'value'}
            labelField={'value'}
            onChange={({value}) => setValueShown(value)}
            style={styles.dropdown}
            value={valueShown}
            renderRightIcon={() => <DropDownListIcon/>}
            renderItem={({value}) => <DropDownItem value={value}/>}
            containerStyle={[styles.container, leftMargin]}
            selectedTextStyle={styles.selectedText}
            activeColor={LightThemeColors.surfaceContainer}
            autoScroll={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        maxHeight: 264,
        backgroundColor: LightThemeColors.surfaceContainer,
        borderRadius: CommonSizes.borderRadius.extraSmall,
        elevation: 3,
        paddingVertical: CommonSizes.padding.extraSmallPlus,
    },
    selectedText: {
        fontSize: 14,
        color: LightThemeColors.text
    },
    dropdown: {
        width: 110
    }
});
