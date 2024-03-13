import {CommonStyles} from "~/core/theme/commonStyles";
import CheckBox from "@react-native-community/checkbox";
import {ThemeColors} from "~/core/theme/colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useAppDispatch} from "~/core/store/store";
import {actions} from "~/core/store/filter/filterSlice";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

interface ICheckBoxProps {
    city: string;
    isChecked: boolean;
}

export function CheckBoxButton({city, isChecked}: ICheckBoxProps) {
    const dispatch = useAppDispatch();
    const colors = useThemeColors();
    const styles = useThemedStyles(stylesG);

    const setCityChosen = () => {
        if (!isChecked) {
            dispatch(actions.selectCity(city));
        } else {
            dispatch(actions.deselectCity(city));
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={setCityChosen}>
            <CheckBox
                disabled={false}
                tintColors={{true: colors.main}}
                value={isChecked}
            />
            <Roboto.Body.Large text={city} style={styles.text}/>
        </TouchableOpacity>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        paddingVertical: CommonSizes.padding.medium
    },
    text: {
        marginLeft: CommonSizes.margin.extraLarge,
        color: colors.onSurface
    }
});
