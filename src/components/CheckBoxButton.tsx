import {CommonStyles} from "~/core/theme/commonStyles";
import CheckBox from "@react-native-community/checkbox";
import {LightThemeColors} from "~/core/theme/colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useAppDispatch} from "~/core/store/store";
import {actions} from "~/core/store/filter/filterSlice";

interface ICheckBoxProps {
    city: string;
    isChecked: boolean;
}

export function CheckBoxButton({city, isChecked}: ICheckBoxProps) {
    const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);
    const dispatch = useAppDispatch();

    const setCityChosen = () => {
        if (!toggleCheckBox) {
            dispatch(actions.selectCity(city));
        } else {
            dispatch(actions.deselectCity(city));
        }
        setToggleCheckBox(prevState => !prevState);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={setCityChosen}>
            <CheckBox
                disabled={false}
                tintColors={{true: LightThemeColors.main}}
                value={toggleCheckBox}
            />
            <Roboto.Body.Large text={city} style={styles.text}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        paddingVertical: CommonSizes.padding.medium
    },
    text: {
        marginLeft: CommonSizes.margin.extraLarge
    }
});
