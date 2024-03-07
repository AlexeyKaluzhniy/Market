import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Roboto} from "~/infrastructure";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {DropDownItem} from "~/components/DropDownItem";
import DropDownListIcon from "../../resources/icons/drop_down.svg";
import {CommonStyles} from "~/core/theme/commonStyles";

interface IDropDownList {
    values: string[];
    onRightSide?: boolean;
    isVisible: boolean;
    setVisible: (value: boolean) => void;
}

export function DropDownList({values, onRightSide, isVisible, setVisible}: IDropDownList) {
    const [valueShown, setValueShown] = useState(values[0]);

    const handleSelectValue = (value: string) => {
        setValueShown(value);
        setVisible(!isVisible);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(!isVisible)} style={CommonStyles.rowCenter}>
                <Roboto.Label.Large text={valueShown}/>
                <DropDownListIcon style={styles.icon}/>
            </TouchableOpacity>
            {isVisible &&
                <ScrollView style={[styles.container, {right: onRightSide ? 0 : undefined}]}>
                    {values.map((value) => <DropDownItem value={value} onPress={handleSelectValue}/>)}
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: CommonSizes.margin.extraLargePlus,
        width: 200,
        maxHeight: 264,
        backgroundColor: LightThemeColors.surfaceContainer,
        borderRadius: CommonSizes.borderRadius.extraSmall,
        elevation: 3,
        paddingVertical: CommonSizes.padding.extraSmallPlus,
    },
    icon: {
        marginLeft: CommonSizes.margin.small
    }
});
