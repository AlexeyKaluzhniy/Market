import {CommonStyles} from "~/core/theme/commonStyles";
import CheckBox from "@react-native-community/checkbox";
import {LightThemeColors} from "~/core/theme/colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";

interface ICheckBoxProps {
    city: string;
    isChecked: boolean;
    citiesChosen: string[];
    setCitiesChosen: (citiesChosen: string[]) => void;
}

export function CheckBoxButton({city, isChecked, setCitiesChosen, citiesChosen}: ICheckBoxProps) {
    const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);

    const setCityChosen = () => {
        setToggleCheckBox(prevState => !prevState);
        setCitiesChosen([...citiesChosen, city]);
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
